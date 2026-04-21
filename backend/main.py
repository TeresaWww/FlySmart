from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def homess():
    return {"message": "Backend is working"}
