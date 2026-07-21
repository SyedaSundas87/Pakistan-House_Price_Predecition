FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model artifacts and application code
COPY XGBrandom_search.pkl .
COPY scaler.pkl .
COPY main.py .

# Expose port
EXPOSE 8000

# Start uvicorn
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
