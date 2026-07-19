# Pakistan House Price Predictor

Predict the estimated market price of residential houses in Pakistan using an XGBoost Machine Learning model.

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS + Framer Motion
- **Backend**: FastAPI + XGBoost + Scikit-Learn
- **Deployment**: Docker + Railway

## Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd pakistan-house-price-predictor
npm install
npm run dev
```

Set `VITE_API_URL` in `.env` to point to the backend URL.
