from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Dry Bean Classification API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = Path(__file__).resolve().parent / "best_dry_bean_model.joblib"
model = joblib.load(MODEL_PATH)


class BeanFeatures(BaseModel):
    Area: float
    Perimeter: float
    MajorAxisLength: float
    MinorAxisLength: float
    AspectRation: float
    Eccentricity: float
    ConvexArea: float
    EquivDiameter: float
    Extent: float
    Solidity: float
    roundness: float
    Compactness: float
    ShapeFactor1: float
    ShapeFactor2: float
    ShapeFactor3: float
    ShapeFactor4: float


@app.get("/")
def read_root():
    return {"message": "Dry Bean Classification API is running"}


@app.post("/predict")
def predict(bean: BeanFeatures):
    input_data = pd.DataFrame([bean.model_dump()])
    prediction = model.predict(input_data)[0]

    return {"predicted_class": prediction}
