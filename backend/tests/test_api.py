from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def base_payload(**overrides):
    data = {
        "child_name": "Anak Demo",
        "age_month": 24,
        "gender": "female",
        "height_cm": 85.0,
        "weight_kg": 11.0,
    }
    data.update(overrides)
    return data


def test_health():
    assert client.get("/health").json()["status"] == "ok"


def test_valid_screening_returns_result():
    r = client.post("/predict", json=base_payload())
    assert r.status_code == 200
    body = r.json()
    assert body["risk_level"] in {"low", "medium", "high"}
    assert "who_screening" in body


def test_missing_required_field_is_rejected():
    data = base_payload()
    del data["height_cm"]
    assert client.post("/predict", json=data).status_code == 422


def test_out_of_range_age_is_rejected():
    assert client.post("/predict", json=base_payload(age_month=61)).status_code == 422
