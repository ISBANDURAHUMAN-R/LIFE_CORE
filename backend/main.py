from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from . import models, schemas, services

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LIFEOS API")

# Allow any origin for development; tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dashboard
@app.get("/api/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    return services.life_engine.get_dashboard(db)

# Activities CRUD
@app.get("/api/activities", response_model=list[schemas.ActivityResponse])
def list_activities(db: Session = Depends(get_db)):
    return services.life_engine.list_activities(db)

@app.post("/api/activities", response_model=schemas.ActivityResponse)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    return services.life_engine.create_activity(db, activity)

@app.delete("/api/activities/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    services.life_engine.delete_activity(db, activity_id)
    return {"detail": "deleted"}

# Focus sessions
@app.get("/api/focus", response_model=list[schemas.FocusSessionResponse])
def list_focus(db: Session = Depends(get_db)):
    return services.focus_engine.list_sessions(db)

@app.post("/api/focus", response_model=schemas.FocusSessionResponse)
def create_focus(session: schemas.FocusSessionCreate, db: Session = Depends(get_db)):
    return services.focus_engine.create_session(db, session)

# Goals
@app.get("/api/goals", response_model=list[schemas.GoalResponse])
def list_goals(db: Session = Depends(get_db)):
    return services.life_engine.list_goals(db)

@app.post("/api/goals", response_model=schemas.GoalResponse)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    return services.life_engine.create_goal(db, goal)

@app.put("/api/goals/{goal_id}", response_model=schemas.GoalResponse)
def update_goal(goal_id: int, goal: schemas.GoalUpdate, db: Session = Depends(get_db)):
    return services.life_engine.update_goal(db, goal_id, goal)

# What‑If simulation
@app.post("/api/simulate", response_model=schemas.SimulationResponse)
def simulate(req: schemas.SimulationRequest, db: Session = Depends(get_db)):
    return services.simulation.run_simulation(db, req)

# Insights placeholder
@app.get("/api/insights")
def get_insights(db: Session = Depends(get_db)):
    return {"insights": []}
