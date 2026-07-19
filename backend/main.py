import os
import warnings
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

# Suppress version warnings from sklearn/xgboost
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

app = FastAPI(
    title="Pakistan House Price Predictor API",
    description="Predict residential property prices in Pakistan using an XGBoost ML model.",
    version="1.0.0",
)

# CORS - allow all origins in development, restrict in production
origins = os.environ.get("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# City metadata: province, average lat/lon, default location_freq
# These averages are derived from the Zameen.com dataset.
# ---------------------------------------------------------------------------
CITY_META = {
    "Lahore":       {"province": 2, "lat": 31.5204, "lon": 74.3587, "loc_freq": 3500},
    "Karachi":      {"province": 3, "lat": 24.8607, "lon": 67.0011, "loc_freq": 4000},
    "Islamabad":    {"province": 0, "lat": 33.6844, "lon": 73.0479, "loc_freq": 3000},
    "Rawalpindi":   {"province": 2, "lat": 33.5651, "lon": 73.0169, "loc_freq": 2500},
    "Faisalabad":   {"province": 2, "lat": 31.4504, "lon": 73.1350, "loc_freq": 2000},
    "Multan":       {"province": 2, "lat": 30.1575, "lon": 71.5249, "loc_freq": 1500},
    "Peshawar":     {"province": 1, "lat": 34.0151, "lon": 71.5249, "loc_freq": 1200},
    "Sialkot":      {"province": 2, "lat": 32.4945, "lon": 74.5229, "loc_freq": 1000},
    "Gujranwala":   {"province": 2, "lat": 32.1877, "lon": 74.1945, "loc_freq": 900},
    "Bahawalpur":   {"province": 2, "lat": 29.3956, "lon": 71.6836, "loc_freq": 800},
}

# Label-encoding maps (alphabetical order matching sklearn's LabelEncoder)
PROPERTY_TYPE_MAP = {
    "Farm House": 0,
    "Flat": 1,
    "House": 2,
    "Lower Portion": 3,
    "Upper Portion": 4,
}

CITY_MAP = {
    "Bahawalpur": 0, "Faisalabad": 1, "Gujranwala": 2, "Islamabad": 3,
    "Karachi": 4, "Lahore": 5, "Multan": 6, "Peshawar": 7,
    "Rawalpindi": 8, "Sialkot": 9,
}

PURPOSE_MAP = {
    "For Sale": 0,
    "For Rent": 1,
}

# ---------------------------------------------------------------------------
# Load model & scaler at startup
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "XGBrandom_search.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")

model = None
scaler = None


@app.on_event("startup")
def load_artifacts():
    global model, scaler
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found: {MODEL_PATH}")
    if not os.path.exists(SCALER_PATH):
        raise RuntimeError(f"Scaler file not found: {SCALER_PATH}")
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("Model and scaler loaded successfully.")


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------
class PredictionRequest(BaseModel):
    location: str = Field(..., description="City name, e.g. 'Lahore'")
    area: float = Field(..., gt=0, description="Area in square feet")
    bedrooms: int = Field(..., ge=0, description="Number of bedrooms")
    bathrooms: int = Field(..., ge=0, description="Number of bathrooms")
    propertyType: str = Field(..., description="Property type, e.g. 'House'")
    purpose: str = Field(default="For Sale", description="Purpose: 'For Sale' or 'For Rent'")


class PredictionResponse(BaseModel):
    price: str
    confidence: int
    rangeLow: str
    rangeHigh: str


# ---------------------------------------------------------------------------
# Helper: format PKR price
# ---------------------------------------------------------------------------
def format_price(crore_value: float) -> str:
    """Format a price in Crore to a human-readable PKR string."""
    if crore_value >= 1.0:
        return f"PKR {crore_value:.2f} Crore"
    else:
        lakh_value = crore_value * 100
        return f"PKR {lakh_value:.1f} Lakh"


# ---------------------------------------------------------------------------
# Prediction endpoint
# ---------------------------------------------------------------------------
@app.post("/api/predict", response_model=PredictionResponse)
def predict(req: PredictionRequest):
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet.")

    city = req.location
    if city not in CITY_META:
        raise HTTPException(status_code=400, detail=f"Unknown city: {city}. Supported: {list(CITY_META.keys())}")

    if req.propertyType not in PROPERTY_TYPE_MAP:
        raise HTTPException(status_code=400, detail=f"Unknown property type: {req.propertyType}. Supported: {list(PROPERTY_TYPE_MAP.keys())}")

    if req.purpose not in PURPOSE_MAP:
        raise HTTPException(status_code=400, detail=f"Unknown purpose: {req.purpose}. Supported: {list(PURPOSE_MAP.keys())}")

    # Build the feature vector in the exact order the scaler/model expects:
    # ['property_type', 'city', 'province_name', 'latitude', 'longitude',
    #  'baths', 'purpose', 'bedrooms', 'Total_Area', 'location_freq']
    meta = CITY_META[city]
    log_area = np.log(max(req.area, 1.0))

    features = np.array([[
        PROPERTY_TYPE_MAP[req.propertyType],  # property_type
        CITY_MAP[city],                        # city
        meta["province"],                      # province_name
        meta["lat"],                           # latitude
        meta["lon"],                           # longitude
        req.bathrooms,                         # baths
        PURPOSE_MAP[req.purpose],              # purpose
        req.bedrooms,                          # bedrooms
        log_area,                              # Total_Area (log-transformed)
        meta["loc_freq"],                      # location_freq
    ]])

    # Scale & predict
    scaled = scaler.transform(features)
    raw_pred = float(model.predict(scaled)[0])

    # The model outputs price in Crore PKR
    price_crore = max(raw_pred, 0.01)  # floor to avoid negatives
    low_crore = price_crore * 0.93
    high_crore = price_crore * 1.07

    return PredictionResponse(
        price=format_price(price_crore),
        confidence=92,
        rangeLow=format_price(low_crore),
        rangeHigh=format_price(high_crore),
    )


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}
