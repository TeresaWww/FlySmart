# run:
# pip3 install fastapi uvicorn pandas scikit-learn joblib

import joblib
import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware

# Load models
BASE_DIR = Path(__file__).resolve().parent

model_usa = joblib.load(BASE_DIR / "model_usa.pkl")
model_non = joblib.load(BASE_DIR / "model_non_usa.pkl")

# FastAPI setup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema

class UserInput(BaseModel):
    is_domestic: bool
    is_usa: bool
    is_trusted: bool
    gate: str
    has_baggage: bool
    transport: str = ""
    client_time: str
    # Seed fields must match `formSeed` in `src/lib/journeyEstimate.ts` for baggage parity.
    destination: str = ""
    travelers: int = 1
    intl_traveler_segment: str = "citizen"

# Walking time

def get_walking_time(gate: str):

    gate_map = {
        "S1": 8,
        "S12": 12,
        "N5": 10
    }

    return gate_map.get(gate, 10)

# Baggage time (same algorithm as `estimateCheckedBaggageLineMinutes` in journeyEstimate.ts)


def _form_seed_string(data: UserInput) -> str:
    flight_scope = "domestic" if data.is_domestic else "international"
    seg = data.intl_traveler_segment
    if seg not in ("citizen", "non_citizen"):
        seg = "citizen" if data.is_usa else "non_citizen"
    return (
        f"{data.gate}|{data.transport}|{data.destination}|{data.travelers}|"
        f"{flight_scope}|{seg}|{1 if data.is_trusted else 0}|{1 if data.has_baggage else 0}"
    )


def _form_seed(data: UserInput) -> int:
    s = _form_seed_string(data)
    h = 2166136261
    for ch in s:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def _spread(seed: int, salt: int, lo: int, hi: int) -> int:
    x = ((seed ^ salt) * 1597334677) & 0xFFFFFFFF
    return lo + (x % (hi - lo + 1))


def get_baggage_time(data: UserInput) -> int:
    if not data.has_baggage:
        return 0
    seed = _form_seed(data)
    if data.is_domestic:
        return 11 + _spread(seed, 41, 0, 9)
    return 19 + _spread(seed, 40, 0, 11)

# Predict endpoint

@app.post("/predict")
def predict(data: UserInput):

    # 1. Time features

    dt = datetime.fromisoformat(
        data.client_time.replace("Z", "")
    )

    hour = dt.hour
    day_of_week = dt.weekday()
    is_weekend = 1 if day_of_week >= 5 else 0
    month = dt.month

    is_peak_hour = 1 if hour in [8, 10, 11, 12, 13, 19] else 0

    # 2. Precomputed averages

    BoothsUsed = 15.95
    FlightCount = 2.66
    TotalPassengerCount = 536.21
    GlobalEntryPassengerCount = 64.32

    passengers_per_flight = 199.18
    congestion_index = 33.18
    global_entry_ratio = 0.12

    # 3. Build features

    if data.is_usa:

        # USA MODEL FEATURES

        UsaPassengerCount = 321.54
        usa_queue_pressure = 20.51

        features = pd.DataFrame([{
            "hour": hour,
            "day_of_week": day_of_week,
            "is_weekend": is_weekend,
            "month": month,

            "BoothsUsed": BoothsUsed,
            "FlightCount": FlightCount,

            "TotalPassengerCount": TotalPassengerCount,
            "UsaPassengerCount": UsaPassengerCount,
            "GlobalEntryPassengerCount": GlobalEntryPassengerCount,

            "passengers_per_flight": passengers_per_flight,
            "congestion_index": congestion_index,
            "global_entry_ratio": global_entry_ratio,
            "is_peak_hour": is_peak_hour,
            "usa_queue_pressure": usa_queue_pressure
        }])

    else:

        # NON-USA MODEL FEATURES

        NonUsaPassengerCount = 214.67
        non_usa_queue_pressure = 13.46

        features = pd.DataFrame([{
            "hour": hour,
            "day_of_week": day_of_week,
            "is_weekend": is_weekend,
            "month": month,

            "BoothsUsed": BoothsUsed,
            "FlightCount": FlightCount,

            "TotalPassengerCount": TotalPassengerCount,
            "NonUsaPassengerCount": NonUsaPassengerCount,
            "GlobalEntryPassengerCount": GlobalEntryPassengerCount,

            "passengers_per_flight": passengers_per_flight,
            "congestion_index": congestion_index,
            "global_entry_ratio": global_entry_ratio,
            "is_peak_hour": is_peak_hour,
            "non_usa_queue_pressure": non_usa_queue_pressure
        }])

    # 4. Prediction logic

    if data.is_domestic:

        customs_time = 0.0

    elif data.is_usa:

        customs_time = float(
            model_usa.predict(features)[0]
        )

    else:

        customs_time = float(
            model_non.predict(features)[0]
        )

    # 5. Other times

    # Queue portion of total customs time: USA citizen model uses −3 min overhead; non-USA uses −5.
    queue_overhead = 3.0 if data.is_usa else 5.0
    customs_queue_time = max(0.0, customs_time - queue_overhead)

    walking_time = get_walking_time(data.gate)

    baggage_time = float(get_baggage_time(data))

    total_time = float(
        customs_time
        + walking_time
        + baggage_time
    )

    # 6. Return response

    return {
        "customs_time": customs_time,
        "customs_queue_time": customs_queue_time,
        "walking_time": walking_time,
        "baggage_time": baggage_time,
        "total_exit_time": total_time,
        "is_peak_hour": bool(is_peak_hour),
    }