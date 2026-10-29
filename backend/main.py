import os
from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from .database import Base, engine, SessionLocal
from . import models, schemas, services

load_dotenv()

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LIFE_CORE Neural Command API",
    description="High-performance life telemetry and cognitive state API with enterprise security hardening.",
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enterprise Security Headers Middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# Configurable CORS
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Health / System Status
@app.get("/api/health")
def health_check():
    return {
        "status": "SECURED",
        "system": "LIFE_CORE Neural Kernel",
        "version": "1.1.0"
    }

# Dashboard Telemetry
@app.get("/api/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    return services.life_engine.get_dashboard(db)

# Activities CRUD
@app.get("/api/activities", response_model=list[schemas.ActivityResponse])
def list_activities(db: Session = Depends(get_db)):
    return services.life_engine.list_activities(db)

@app.post("/api/activities", response_model=schemas.ActivityResponse, status_code=201)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    return services.life_engine.create_activity(db, activity)

@app.delete("/api/activities/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    deleted = services.life_engine.delete_activity(db, activity_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Activity record not found")
    return {"status": "success", "detail": f"Activity {activity_id} removed"}

# Focus Protocol Sessions
@app.get("/api/focus", response_model=list[schemas.FocusSessionResponse])
def list_focus(db: Session = Depends(get_db)):
    return services.focus_engine.list_sessions(db)

@app.post("/api/focus", response_model=schemas.FocusSessionResponse, status_code=201)
def create_focus(session: schemas.FocusSessionCreate, db: Session = Depends(get_db)):
    return services.focus_engine.create_session(db, session)

# Strategic Goals
@app.get("/api/goals", response_model=list[schemas.GoalResponse])
def list_goals(db: Session = Depends(get_db)):
    return services.life_engine.list_goals(db)

@app.post("/api/goals", response_model=schemas.GoalResponse, status_code=201)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    return services.life_engine.create_goal(db, goal)

@app.put("/api/goals/{goal_id}", response_model=schemas.GoalResponse)
def update_goal(goal_id: int, goal: schemas.GoalUpdate, db: Session = Depends(get_db)):
    updated = services.life_engine.update_goal(db, goal_id, goal)
    if not updated:
        raise HTTPException(status_code=404, detail="Goal record not found")
    return updated

# What‑If Simulation Model
@app.post("/api/simulate", response_model=schemas.SimulationResponse)
def simulate(req: schemas.SimulationRequest, db: Session = Depends(get_db)):
    return services.simulation.run_simulation(db, req)

# Neural Insights
@app.get("/api/insights")
def get_insights(db: Session = Depends(get_db)):
    return {
        "insights": [
            {"id": 1, "type": "FLOW_STATE", "message": "Optimal focus detected between 08:30 and 11:45 UTC."},
            {"id": 2, "type": "RECOVERY", "message": "Sleep duration exceeding 7.5 hours elevates cognitive resilience by +24%."}
        ]
    }
