from fastapi import FastAPI
from .database import db

app = FastAPI()

@app.get("/")
def root():
    return {"message": "CareerForge backend running"}
