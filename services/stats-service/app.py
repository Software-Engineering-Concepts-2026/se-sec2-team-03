from fastapi import FastAPI

app = FastAPI(
    title="Stats Service",
    version="0.1.0"
)


@app.get("/")
def get_service_status():
    return {
        "service": "stats-service",
        "status": "ok"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }