export interface Activity {
  id: number;
  user_id?: number;
  name: string;
  category: string;
  duration_minutes: number;
  energy_cost: number;
  focus_requirement: number;
  notes?: string;
  date: string;
}

export interface Goal {
  id: number;
  user_id?: number;
  title: string;
  target_minutes: number;
  deadline: string;
  created_at: string;
  progress_minutes?: number;
}

export interface FocusSession {
  id: number;
  user_id?: number;
  task: string;
  duration_minutes: number;
  distractions: number;
  date: string;
}

export interface DashboardData {
  system_status: string;
  productivity_score: number;
  energy_level: number;
  focus_minutes_today: number;
  active_goals_count: number;
  streak_days: number;
  recent_activities: Activity[];
  goals: Goal[];
  weekly_progress: {
    day: string;
    focus: number;
    energy: number;
    productivity: number;
  }[];
}

export interface SimulationResult {
  projected_skill_level: number;
  projected_goal_completion_pct: number;
  burnout_risk_score: number;
  burnout_risk_level: string;
  trajectory: {
    week: string;
    capability: number;
    burnout_risk: number;
    output_units: number;
  }[];
  recommendation: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

// Intelligent Local Fallback State
const INITIAL_ACTIVITIES: Activity[] = [
  { id: 1, name: 'Deep Focus: Microservices Kernel', category: 'Engineering', duration_minutes: 90, energy_cost: 65, focus_requirement: 85, notes: 'Flow state achieved', date: new Date().toISOString() },
  { id: 2, name: 'Zone 2 Cardio & VO2 Max Optimization', category: 'Health', duration_minutes: 45, energy_cost: 40, focus_requirement: 30, notes: 'Recovery index optimal', date: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 3, name: 'Transformer Architecture & Attention Maps', category: 'Learning', duration_minutes: 60, energy_cost: 50, focus_requirement: 80, notes: 'Mathematical proofs complete', date: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 4, name: 'Weekly Roadmap & Milestone Sync', category: 'Operations', duration_minutes: 35, energy_cost: 25, focus_requirement: 60, notes: 'Sprint velocity +15%', date: new Date(Date.now() - 3600000 * 10).toISOString() }
];

const INITIAL_GOALS: Goal[] = [
  { id: 1, title: 'Master Fullstack System Architecture', target_minutes: 1200, deadline: new Date(Date.now() + 86400000 * 21).toISOString(), created_at: new Date().toISOString(), progress_minutes: 740 },
  { id: 2, title: 'Complete 100km Cardio & Health Regimen', target_minutes: 600, deadline: new Date(Date.now() + 86400000 * 30).toISOString(), created_at: new Date().toISOString(), progress_minutes: 410 },
  { id: 3, title: 'Read 4 Cognitive Science Papers', target_minutes: 480, deadline: new Date(Date.now() + 86400000 * 14).toISOString(), created_at: new Date().toISOString(), progress_minutes: 360 },
  { id: 4, title: 'Ship Autonomous Agent Deployment', target_minutes: 900, deadline: new Date(Date.now() + 86400000 * 7).toISOString(), created_at: new Date().toISOString(), progress_minutes: 820 }
];

function getLocal<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  const item = localStorage.getItem(`lifecore_${key}`);
  if (!item) {
    localStorage.setItem(`lifecore_${key}`, JSON.stringify(defaultVal));
    return defaultVal;
  }
  try {
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`lifecore_${key}`, JSON.stringify(val));
  }
}

export const api = {
  async getDashboard(): Promise<DashboardData> {
    try {
      const res = await fetch(`${API_BASE}/dashboard`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const activities = getLocal<Activity[]>('activities', INITIAL_ACTIVITIES);
    const goals = getLocal<Goal[]>('goals', INITIAL_GOALS);
    const focusMinutes = activities.reduce((acc, a) => acc + (a.duration_minutes || 0), 0);

    return {
      system_status: 'ONLINE • NEURAL COMMAND',
      productivity_score: 92,
      energy_level: 84,
      focus_minutes_today: focusMinutes > 0 ? focusMinutes : 230,
      active_goals_count: goals.length,
      streak_days: 14,
      recent_activities: activities.slice(0, 5),
      goals: goals,
      weekly_progress: [
        { day: 'Mon', focus: 160, energy: 82, productivity: 86 },
        { day: 'Tue', focus: 210, energy: 78, productivity: 92 },
        { day: 'Wed', focus: 190, energy: 85, productivity: 89 },
        { day: 'Thu', focus: 240, energy: 70, productivity: 94 },
        { day: 'Fri', focus: 180, energy: 75, productivity: 88 },
        { day: 'Sat', focus: 130, energy: 90, productivity: 80 },
        { day: 'Sun', focus: 150, energy: 88, productivity: 85 },
      ]
    };
  },

  async getActivities(): Promise<Activity[]> {
    try {
      const res = await fetch(`${API_BASE}/activities`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return getLocal<Activity[]>('activities', INITIAL_ACTIVITIES);
  },

  async addActivity(act: Omit<Activity, 'id' | 'date'>): Promise<Activity> {
    try {
      const res = await fetch(`${API_BASE}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(act)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const current = getLocal<Activity[]>('activities', INITIAL_ACTIVITIES);
    const newAct: Activity = {
      ...act,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setLocal('activities', [newAct, ...current]);
    return newAct;
  },

  async deleteActivity(id: number): Promise<void> {
    try {
      await fetch(`${API_BASE}/activities/${id}`, { method: 'DELETE' });
    } catch {
      // Fallback
    }
    const current = getLocal<Activity[]>('activities', INITIAL_ACTIVITIES);
    setLocal('activities', current.filter(a => a.id !== id));
  },

  async getGoals(): Promise<Goal[]> {
    try {
      const res = await fetch(`${API_BASE}/goals`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return getLocal<Goal[]>('goals', INITIAL_GOALS);
  },

  async addGoal(goal: Omit<Goal, 'id' | 'created_at'>): Promise<Goal> {
    try {
      const res = await fetch(`${API_BASE}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const current = getLocal<Goal[]>('goals', INITIAL_GOALS);
    const newGoal: Goal = {
      ...goal,
      id: Date.now(),
      created_at: new Date().toISOString(),
      progress_minutes: 0
    };
    setLocal('goals', [newGoal, ...current]);
    return newGoal;
  },

  async simulate(params: {
    daily_focus_hours: number;
    sleep_hours: number;
    habit_consistency_pct: number;
    weeks_ahead: number;
  }): Promise<SimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback calculation
    }

    const { daily_focus_hours: hours, sleep_hours: sleep, habit_consistency_pct: consistencyPct, weeks_ahead: weeks } = params;
    const consistency = consistencyPct / 100.0;
    const risk = Math.max(0, Math.min(100, Math.round((hours * 12.0) - (sleep * 8.5) + (1.0 - consistency) * 30.0)));
    const riskLevel = risk < 35 ? 'LOW' : (risk < 70 ? 'MODERATE' : 'CRITICAL');
    const skillGain = Math.round(hours * weeks * consistency * 1.8 * 10) / 10;
    const completionPct = Math.min(100, Math.round(consistency * (hours / 4.0) * 100));

    const trajectory = [];
    for (let w = 1; w <= weeks; w++) {
      trajectory.push({
        week: `Week ${w}`,
        capability: Math.min(100, Math.round(70 + (w * hours * consistency * 2.2))),
        burnout_risk: Math.round(Math.max(10, Math.min(95, risk * (1 + (w * 0.05))))),
        output_units: Math.round(hours * 7 * consistency * (w * 0.9) * 10) / 10
      });
    }

    let rec = '';
    if (riskLevel === 'CRITICAL') {
      rec = `CRITICAL WARNING: ${hours}h/day with only ${sleep}h sleep will deplete neural stamina by Week 2. Prioritize at least 7.5h sleep to safeguard executive function.`;
    } else if (riskLevel === 'MODERATE') {
      rec = `SUSTAINABLE MOMENTUM: Operating at ${hours}h/day and ${consistencyPct}% consistency yields solid compounding capability. Ensure active recovery on weekends.`;
    } else {
      rec = `FLOW STATE HARMONY: Optimal neuro-efficiency. Your recovery balance is exceptional, unlocking maximum long-term skill acquisition and deep focus endurance.`;
    }

    return {
      projected_skill_level: skillGain,
      projected_goal_completion_pct: completionPct,
      burnout_risk_score: risk,
      burnout_risk_level: riskLevel,
      trajectory,
      recommendation: rec
    };
  }
};
