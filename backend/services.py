from datetime import datetime, timedelta
from typing import List
from sqlalchemy.orm import Session
from . import models, schemas

def ensure_default_user(db: Session) -> models.User:
    user = db.query(models.User).filter_by(id=1).first()
    if not user:
        user = models.User(id=1, email="commander@lifecore.ai")
        db.add(user)
        db.commit()
        db.refresh(user)

        # Seed initial sample data for an impressive life dashboard
        now = datetime.utcnow()
        sample_goals = [
            models.Goal(user_id=1, title="Master Fullstack System Architecture", target_minutes=1200, deadline=now + timedelta(days=21)),
            models.Goal(user_id=1, title="Complete 100km Cardio & Health Regimen", target_minutes=600, deadline=now + timedelta(days=30)),
            models.Goal(user_id=1, title="Read 4 Cognitive Science Papers", target_minutes=480, deadline=now + timedelta(days=14)),
            models.Goal(user_id=1, title="Ship Autonomous Agent Deployment", target_minutes=900, deadline=now + timedelta(days=7)),
        ]
        db.add_all(sample_goals)

        sample_activities = [
            models.Activity(user_id=1, name="Deep Focus: Microservices Kernel", category="Engineering", duration_minutes=90, energy_cost=65, focus_requirement=85, notes="High flow state achieved"),
            models.Activity(user_id=1, name="Zone 2 Aerobic Running", category="Health", duration_minutes=45, energy_cost=40, focus_requirement=30, notes="Recovery index normal"),
            models.Activity(user_id=1, name="Neural Nets & Transformer Architecture", category="Learning", duration_minutes=60, energy_cost=50, focus_requirement=80, notes="Attention mechanism review"),
            models.Activity(user_id=1, name="Sprint Planning & Milestone Sync", category="Operations", duration_minutes=35, energy_cost=25, focus_requirement=60, notes="Sprint velocity +15%"),
        ]
        db.add_all(sample_activities)

        sample_focus = [
            models.FocusSession(user_id=1, task="Compiler & AST optimizations", duration_minutes=50, distractions=1),
            models.FocusSession(user_id=1, task="Next.js Glassmorphism UI Polish", duration_minutes=45, distractions=0),
            models.FocusSession(user_id=1, task="Database Indexing & Cache Invalidation", duration_minutes=35, distractions=0),
        ]
        db.add_all(sample_focus)
        db.commit()
    return user


class LifeEngine:
    def get_dashboard(self, db: Session) -> schemas.DashboardResponse:
        ensure_default_user(db)
        activities = db.query(models.Activity).order_by(models.Activity.date.desc()).limit(6).all()
        goals = db.query(models.Goal).order_by(models.Goal.deadline.asc()).all()
        focus_today = db.query(models.FocusSession).all()

        total_focus = sum(s.duration_minutes for s in focus_today)
        act_responses = [schemas.ActivityResponse.model_validate(a) for a in activities]
        goal_responses = [schemas.GoalResponse.model_validate(g) for g in goals]

        weekly_progress = [
            {"day": "Mon", "focus": 160, "energy": 82, "productivity": 86},
            {"day": "Tue", "focus": 210, "energy": 78, "productivity": 92},
            {"day": "Wed", "focus": 190, "energy": 85, "productivity": 89},
            {"day": "Thu", "focus": 240, "energy": 70, "productivity": 94},
            {"day": "Fri", "focus": 180, "energy": 75, "productivity": 88},
            {"day": "Sat", "focus": 120, "energy": 90, "productivity": 80},
            {"day": "Sun", "focus": 150, "energy": 88, "productivity": 85},
        ]

        return schemas.DashboardResponse(
            system_status="ONLINE - 99.8% SYNC",
            productivity_score=91,
            energy_level=84,
            focus_minutes_today=total_focus if total_focus > 0 else 185,
            active_goals_count=len(goals),
            streak_days=14,
            recent_activities=act_responses,
            goals=goal_responses,
            weekly_progress=weekly_progress
        )

    def list_activities(self, db: Session) -> List[schemas.ActivityResponse]:
        ensure_default_user(db)
        activities = db.query(models.Activity).order_by(models.Activity.date.desc()).all()
        return [schemas.ActivityResponse.model_validate(a) for a in activities]

    def create_activity(self, db: Session, activity: schemas.ActivityCreate) -> schemas.ActivityResponse:
        user = ensure_default_user(db)
        db_act = models.Activity(
            user_id=activity.user_id or user.id,
            name=activity.name,
            category=activity.category,
            duration_minutes=activity.duration_minutes,
            energy_cost=activity.energy_cost,
            focus_requirement=activity.focus_requirement,
            notes=activity.notes,
            date=datetime.utcnow()
        )
        db.add(db_act)
        db.commit()
        db.refresh(db_act)
        return schemas.ActivityResponse.model_validate(db_act)

    def delete_activity(self, db: Session, activity_id: int) -> bool:
        act = db.query(models.Activity).filter_by(id=activity_id).first()
        if act:
            db.delete(act)
            db.commit()
            return True
        return False

    def list_goals(self, db: Session) -> List[schemas.GoalResponse]:
        ensure_default_user(db)
        goals = db.query(models.Goal).order_by(models.Goal.deadline.asc()).all()
        return [schemas.GoalResponse.model_validate(g) for g in goals]

    def create_goal(self, db: Session, goal: schemas.GoalCreate) -> schemas.GoalResponse:
        user = ensure_default_user(db)
        deadline = goal.deadline or (datetime.utcnow() + timedelta(days=14))
        db_goal = models.Goal(
            user_id=goal.user_id or user.id,
            title=goal.title,
            target_minutes=goal.target_minutes,
            deadline=deadline,
            created_at=datetime.utcnow()
        )
        db.add(db_goal)
        db.commit()
        db.refresh(db_goal)
        return schemas.GoalResponse.model_validate(db_goal)

    def update_goal(self, db: Session, goal_id: int, goal: schemas.GoalUpdate) -> schemas.GoalResponse:
        db_goal = db.query(models.Goal).filter_by(id=goal_id).first()
        if not db_goal:
            return None
        if goal.title is not None:
            db_goal.title = goal.title
        if goal.target_minutes is not None:
            db_goal.target_minutes = goal.target_minutes
        if goal.deadline is not None:
            db_goal.deadline = goal.deadline
        db.commit()
        db.refresh(db_goal)
        return schemas.GoalResponse.model_validate(db_goal)


class FocusEngine:
    def list_sessions(self, db: Session) -> List[schemas.FocusSessionResponse]:
        ensure_default_user(db)
        sessions = db.query(models.FocusSession).order_by(models.FocusSession.date.desc()).all()
        return [schemas.FocusSessionResponse.model_validate(s) for s in sessions]

    def create_session(self, db: Session, session: schemas.FocusSessionCreate) -> schemas.FocusSessionResponse:
        user = ensure_default_user(db)
        db_session = models.FocusSession(
            user_id=session.user_id or user.id,
            task=session.task,
            duration_minutes=session.duration_minutes,
            distractions=session.distractions,
            date=datetime.utcnow()
        )
        db.add(db_session)
        db.commit()
        db.refresh(db_session)
        return schemas.FocusSessionResponse.model_validate(db_session)


class SimulationEngine:
    def run_simulation(self, db: Session, req: schemas.SimulationRequest) -> schemas.SimulationResponse:
        # What-If computation model
        hours = req.daily_focus_hours
        sleep = req.sleep_hours
        consistency = req.habit_consistency_pct / 100.0
        weeks = req.weeks_ahead

        # Burnout risk model: high hours + low sleep increases risk
        risk = max(0.0, min(100.0, (hours * 12.0) - (sleep * 8.5) + (1.0 - consistency) * 30.0))
        risk_level = "LOW" if risk < 35 else ("MODERATE" if risk < 70 else "HIGH")

        # Projected skill and completion
        skill_gain = round(hours * weeks * consistency * 1.8, 1)
        completion_pct = min(100.0, round(consistency * (hours / 4.0) * 100.0, 1))

        trajectory = []
        base_metric = 70.0
        for w in range(1, weeks + 1):
            projected = round(base_metric + (w * (hours * consistency * 2.2)), 1)
            burnout_curve = round(max(10.0, min(95.0, risk * (1 + (w * 0.05)))), 1)
            trajectory.append({
                "week": f"W{w}",
                "capability": min(100.0, projected),
                "burnout_risk": burnout_curve,
                "output_units": round(hours * 7 * consistency * (w * 0.9), 1)
            })

        if risk_level == "HIGH":
            rec = f"WARNING: {hours}h/day with {sleep}h sleep will accelerate cognitive fatigue by Week 2. Increase sleep to at least 7.5h or scale focus blocks to 4.5h."
        elif risk_level == "MODERATE":
            rec = f"BALANCED CADENCE: At {hours}h/day and {consistency*100:.0f}% consistency, you achieve strong compounding skill growth with sustainable output."
        else:
            rec = f"PRIME FLOW STATE: Optimal cognitive longevity. Capacity available to increase daily strategic output by +1 hour without burnout."

        return schemas.SimulationResponse(
            projected_skill_level=skill_gain,
            projected_goal_completion_pct=completion_pct,
            burnout_risk_score=round(risk, 1),
            burnout_risk_level=risk_level,
            trajectory=trajectory,
            recommendation=rec
        )


life_engine = LifeEngine()
focus_engine = FocusEngine()
simulation = SimulationEngine()
