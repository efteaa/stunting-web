from __future__ import annotations

import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import PredictionOutput, ScreeningInput
from .predictor import predict_with_ml
from .who_hfa import classify_who_hfa

app = FastAPI(
    title="StuntAware API",
    description="Backend prototype for a web-based stunting risk screening thesis.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DISCLAIMER = (
    "Hasil ini merupakan screening awal dan media edukasi, bukan diagnosis medis. "
    "Konfirmasi pertumbuhan anak melalui tenaga kesehatan/Posyandu/Puskesmas."
)


def recommendation_for(risk: str):
    if risk == "high":
        return (
            "Hasil screening menunjukkan kebutuhan tindak lanjut lebih cepat. "
            "Bawa catatan pertumbuhan anak dan konsultasikan ke Puskesmas/Posyandu atau dokter anak."
        )
    if risk == "medium":
        return (
            "Lakukan pengukuran ulang dengan teknik yang benar dan konsultasikan hasil ke tenaga kesehatan. "
            "Pantau pertumbuhan secara berkala dan perhatikan asupan gizi sesuai usia."
        )
    return (
        "Lanjutkan pemantauan pertumbuhan rutin. Tinggi badan menurut umur berbeda dengan berat badan menurut umur, "
        "jadi berat badan rendah tidak otomatis berarti stunting."
    )


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionOutput)
def predict(payload: ScreeningInput):
    data = payload.model_dump()
    who = classify_who_hfa(payload.age_month, payload.gender, payload.height_cm)
    ml = predict_with_ml(data)

    # If the real thesis ML pipeline is present, its risk label is primary.
    # Otherwise WHO height/length-for-age cutoffs power the demonstrator.
    risk = ml["risk_level"] if ml else who["risk_level"]
    status = "ml_risk_classification" if ml else who["growth_status"]

    return {
        "screening_id": str(uuid.uuid4()),
        "risk_level": risk,
        "growth_status": status,
        "who_screening": who,
        "ml_prediction": ml,
        "recommendation": recommendation_for(risk),
        "disclaimer": DISCLAIMER,
    }
