from typing import Literal, Optional
from pydantic import BaseModel, Field


class ScreeningInput(BaseModel):
    child_name: str = Field(min_length=1, max_length=80)
    age_month: int = Field(ge=0, le=60)
    gender: Literal["female", "male"]
    height_cm: float = Field(gt=30, lt=140)
    weight_kg: float = Field(gt=1, lt=50)
    birth_weight_kg: Optional[float] = Field(default=None, gt=0.3, lt=8)
    birth_length_cm: Optional[float] = Field(default=None, gt=20, lt=70)
    breastfeeding: Optional[Literal["exclusive", "non_exclusive", "unknown"]] = None
    parent_education: Optional[str] = Field(default=None, max_length=80)
    economic_index: Optional[float] = Field(default=None, ge=0, le=100)


class PredictionOutput(BaseModel):
    screening_id: str
    risk_level: Literal["low", "medium", "high"]
    growth_status: str
    who_screening: dict
    ml_prediction: Optional[dict] = None
    recommendation: str
    disclaimer: str
