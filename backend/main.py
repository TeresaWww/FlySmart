from fastapi import FastAPI
from pydantic import BaseModel


from fastapi.middleware.cors import CORSMiddleware

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


# -----------------------------
# Walking time function
# -----------------------------
def get_walking_time(gate):

    gate_map = {
        "S1": 8,
        "S12": 12,
        "N5": 10
    }

    return gate_map.get(gate, 10)


# -----------------------------
# Baggage time function
# -----------------------------
def get_baggage_time(has_baggage):

    if has_baggage:
        return 15

    return 0


# -----------------------------
# Predict endpoint
# -----------------------------
@app.post("/predict")
def predict(data: UserInput):

    # TEMP FAKE CUSTOMS TIME
    # (replace later with model)
    if data.is_domestic:
        customs_time = 0

    elif data.is_usa:
        customs_time = 20

    else:
        customs_time = 35

    walking_time = get_walking_time(data.gate)

    baggage_time = get_baggage_time(data.has_baggage)

    total_time = customs_time + walking_time + baggage_time

    return {
        "customs_time": customs_time,
        "walking_time": walking_time,
        "baggage_time": baggage_time,
        "total_exit_time": total_time
    }

# run uvicorn main:app --reload
