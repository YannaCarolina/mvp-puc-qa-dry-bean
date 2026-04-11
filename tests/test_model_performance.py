from pathlib import Path

import joblib
import pandas as pd
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split

MODEL_PATH = Path(__file__).resolve().parents[1] / "backend" / "best_dry_bean_model.joblib"
DATASET_URL = "https://raw.githubusercontent.com/YannaCarolina/mvp-puc-qa-dry-bean/main/data/Dry_Bean_Dataset.xlsx"
MINIMUM_F1_MACRO = 0.90


def load_dataset():
    return pd.read_excel(DATASET_URL)


def test_model_performance():
    model = joblib.load(MODEL_PATH)
    df = load_dataset()

    X = df.drop(columns=["Bean ID", "Class"], errors="ignore")
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

        random_state=42,
        stratify=y
    )

    y_pred = model.predict(X_test)
    score = f1_score(y_test, y_pred, average="macro")

    assert score >= MINIMUM_F1_MACRO, (
        f"F1-score macro abaixo do esperado: {score:.4f}. "
        f"Threshold mínimo: {MINIMUM_F1_MACRO:.2f}"
    )


