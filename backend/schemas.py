from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional, List, Dict, Any

class ActivityBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Activity title")
    category: str = Field("General", min_length=1, max_length=50, description="Life domain category")
    duration_minutes: int = Field(30, ge=1, le=1440, description="Duration in minutes (1 - 1440)")
    energy_cost: int = Field(20, ge=0, le=100, description="Energy expenditure percentage")
    focus_requirement: int = Field(50, ge=0, le=100, description="Focus intensity percentage")
    notes: Optional[str] = Field(None, max_length=1000, description="Optional reflection notes")

class ActivityCreate(ActivityBase):
    user_id: Optional[int] = Field(1, ge=1)

class ActivityResponse(ActivityBase):
    id: int
    user_id: int
    date: datetime

    model_config = ConfigDict(from_attributes=True)

class FocusSessionBase(BaseModel):
    task: str = Field(..., min_length=1, max_length=120, description="Focus task description")
    duration_minutes: int = Field(25, ge=1, le=360, description="Session length in minutes")
    distractions: int = Field(0, ge=0, le=100, description="Distraction event counter")

class FocusSessionCreate(FocusSessionBase):
    user_id: Optional[int] = Field(1, ge=1)

class FocusSessionResponse(FocusSessionBase):
    id: int
    user_id: int
    date: datetime

    model_config = ConfigDict(from_attributes=True)

class GoalBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=120, description="Strategic goal title")
    target_minutes: int = Field(600, ge=1, le=60000, description="Target deliberate practice minutes")
    deadline: Optional[datetime] = None

class GoalCreate(GoalBase):
    user_id: Optional[int] = Field(1, ge=1)

class GoalUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=120)
    target_minutes: Optional[int] = Field(None, ge=1, le=60000)
    deadline: Optional[datetime] = None

class GoalResponse(GoalBase):
    id: int
    user_id: int
    deadline: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class DashboardResponse(BaseModel):
    system_status: str = "SECURED // OPTIMAL"
    productivity_score: int = Field(88, ge=0, le=100)
    energy_level: int = Field(75, ge=0, le=100)
    focus_minutes_today: int = Field(150, ge=0)
    active_goals_count: int = Field(4, ge=0)
    streak_days: int = Field(14, ge=0)
    recent_activities: List[ActivityResponse] = []
    goals: List[GoalResponse] = []
    weekly_progress: List[Dict[str, Any]] = []

class SimulationRequest(BaseModel):
    daily_focus_hours: float = Field(4.0, ge=0.5, le=16.0, description="Daily deep focus hours")
    sleep_hours: float = Field(7.5, ge=3.0, le=14.0, description="Nightly sleep duration")
    habit_consistency_pct: float = Field(85.0, ge=0.0, le=100.0, description="Habit consistency percentage")
    weeks_ahead: int = Field(4, ge=1, le=52, description="Forecast timeline horizon in weeks")

class SimulationResponse(BaseModel):
    projected_skill_level: float
    projected_goal_completion_pct: float
    burnout_risk_score: float
    burnout_risk_level: str
    trajectory: List[Dict[str, Any]]
    recommendation: str
