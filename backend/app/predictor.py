from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import joblib
import pandas as pd

MODEL_PATH = Path(os.getenv("MODEL_PATH", Path(__file__).resolve().parents[1] / "model" / "stunting_model.joblib"))


def load_model():
    if MODEL_PATH.exists():
        return joblib.load(MODEL_PATH)
    return None


def _to_row(payload: dict[str, Any]):
    row = {
        "age_month": payload["age_month"],
        "gender": payload["gender"],
        "height_cm": payload["height_cm"],
        "weight_kg": payload["weight_kg"],
        "birth_weight_kg": payload.get("birth_weight_kg"),
        "birth_length_cm": payload.get("birth_length_cm"),
        "breastfeeding": payload.get("breastfeeding"),
        "parent_education": payload.get("parent_education"),
        "economic_index": payload.get("economic_index"),
    }
    return pd.DataFrame([row])


def predict_with_ml(payload: dict[str, Any]):
    """Predict with the real serialized thesis pipeline when available.

    Recommended artifact: a single sklearn/imblearn Pipeline saved with joblib,
    containing preprocessing + estimator. That avoids duplicating encoding logic
    between notebook and API.
    """
    model = load_model()
    if model is None:
        return None

    X = _to_row(payload)
    raw = model.predict(X)[0]
    label = str(raw).lower().strip()

    mapping = {
        "0": "low", "low": "low", "rendah": "low", "normal": "low",
        "1": "medium", "medium": "medium", "sedang": "medium", "stunted": "medium",
        "2": "high", "high": "high", "tinggi": "high", "severely_stunted": "high",
    }
    risk = mapping.get(label, label)
    if risk not in {"low", "medium", "high"}:
        raise ValueError(f"Unsupported ML class label: {raw!r}. Update mapping in predictor.py")

    result = {"risk_level": risk, "raw_class": str(raw), "model_path": str(MODEL_PATH)}
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X)[0]
        classes = [str(c) for c in model.classes_]
        result["probabilities"] = {c: round(float(p), 4) for c, p in zip(classes, probs)}
    return result
