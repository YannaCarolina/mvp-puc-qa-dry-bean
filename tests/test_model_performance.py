from io import BytesIO
from pathlib import Path
from zipfile import ZipFile

import joblib
import pandas as pd
import requests
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split

MODEL_PATH = Path(__file__).resolve().parents[1] / "backend" / "best_dry_bean_model.joblib"
DATASET_URL = "https://archive.ics.uci.edu/static/public/602/dry+bean+dataset.zip"
MINIMUM_F1_MACRO = 0.90


def load_dataset():
    response = requests.get(DATASET_URL, timeout=30)
    response.raise_for_status()

    with ZipFile(BytesIO(response.content)) as zip_file:
        with zip_file.open("DryBeanDataset/Dry_Bean_Dataset.xlsx") as dataset_file:
            return pd.read_excel(dataset_file)


def test_model_performance():
    model = joblib.load(MODEL_PATH)
    df = load_dataset()

    X = df.drop("Class", axis=1)
    y = df["Class"]

    _, X_test, _, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    y_pred = model.predict(X_test)
    score = f1_score(y_test, y_pred, average="macro")

    assert score >= MINIMUM_F1_MACRO, (
        f"F1-score macro abaixo do esperado: {score:.4f}. "
        f"Threshold mínimo: {MINIMUM_F1_MACRO:.2f}"
    )


