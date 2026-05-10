#run pip3 install joblib in terminal
#run pip3 install scikit-learn in terminal

import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware


BASE_DIR = Path(__file__).resolve().parent

model_usa = joblib.load(BASE_DIR / "model_usa.pkl")
model_non = joblib.load(BASE_DIR / "model_non_usa.pkl")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------
# Input schema
# -----------------------------
class UserInput(BaseModel):
    is_domestic: bool
    is_usa: bool
    is_trusted: bool
    gate: str
    has_baggage: bool
    transport: str
    client_time: str 



def get_walking_time(gate):

    gate_map = {
        "S1": 8,
        "S12": 12,
        "N5": 10
    }

    return gate_map.get(gate, 10)



def get_baggage_time(has_baggage):

    if has_baggage:
        return 15

    return 0


@app.post("/predict")
def predict(data: UserInput):
    
    dt = datetime.fromisoformat(data.client_time.replace("Z", ""))

    hour = dt.hour
    day_of_week = dt.weekday()
    is_weekend = 1 if day_of_week >= 5 else 0
    month = dt.month

    is_peak_hour = 1 if hour in [8, 10, 11, 12, 13, 19] else 0

    #precomputed from db
    
    BoothsUsed = 15.95
    FlightCount = 2.66
    TotalPassengerCount = 536.21
    UsaPassengerCount = 321.54
    GlobalEntryPassengerCount = 64.32

    passengers_per_flight = 199.18
    congestion_index = 33.18
    global_entry_ratio = 0.12
    usa_queue_pressure = 20.51


   
    features = [[
        hour,
        day_of_week,
        is_weekend,
        month,

        BoothsUsed,
        FlightCount,

        TotalPassengerCount,
        UsaPassengerCount,
        GlobalEntryPassengerCount,

        passengers_per_flight,
        congestion_index,
        global_entry_ratio,
        is_peak_hour,
        usa_queue_pressure
    ]]

   

    if data.is_domestic:
        customs_time = 0.0
    elif data.is_usa:
        customs_time = float(model_usa.predict(features)[0])
    else:
        customs_time = float(model_non.predict(features)[0])

    # Models predict total minutes in customs; queue portion is total minus fixed overhead.
    customs_queue_time = max(0.0, customs_time - 5.0)

    walking_time = get_walking_time(data.gate)
    baggage_time = get_baggage_time(data.has_baggage)

    total_time = float(customs_time + walking_time + baggage_time)

    return {
        "customs_time": customs_time,
        "customs_queue_time": customs_queue_time,
        "walking_time": walking_time,
        "baggage_time": baggage_time,
        "total_exit_time": total_time,
    }
