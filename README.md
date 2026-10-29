# 🧠 LIFE_CORE // NEURAL LIFE COMMAND OS

<div align="center">

![Version](https://img.shields.io/badge/version-1.1.0-ff2a51.svg?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Security](https://img.shields.io/badge/Security-Hardened-red.svg?style=for-the-badge&logo=securityscorecard&logoColor=white)

> **Your life. Your system. Your evolution.**  
> *A high-performance personal command center engineered for deep focus, strategic objectives, and cognitive telemetry.*

</div>

---

## ⚡ What is LIFE_CORE?

**LIFE_CORE** treats human performance and personal development as a feedback-driven cybernetic system. Rather than fragmenting productivity across multiple disjointed applications, LIFE_CORE consolidates goals, cognitive load, deliberate practice, habits, and predictive analytics into a unified, zero-latency command center.

Designed with an **Obsidian Black & Crimson Red** command aesthetic, the interface provides immediate tactile feedback, flow-state tracking, and real-time biometric telemetry.

---

## 🛡️ Security Architecture & Hardening

LIFE_CORE is built with defense-in-depth security principles across both frontend and backend layers:

* **Strict CORS Whitelisting**: Dynamic origin validation configured via environment variables (`ALLOWED_ORIGINS`), preventing cross-origin forgery.
* **HTTP Security Headers Middleware**:
  * `X-Frame-Options: DENY` (Anti-Clickjacking)
  * `X-Content-Type-Options: nosniff` (MIME Sniffing Mitigation)
  * `X-XSS-Protection: 1; mode=block`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=()`
* **Input Validation & Sanitization**: Strict Pydantic v2 `Field` constraints (`min_length`, `max_length`, `ge`, `le`) preventing injection and malformed tensor inputs.
* **SQL Injection Immunity**: Complete parameterized query execution via SQLAlchemy ORM without raw string concatenation.
* **Offline Resilience & Data Isolation**: Zero-latency local caching with safe local fallback if backend offline.
* **Information Leakage Prevention**: Server headers suppressed (`poweredByHeader: false` in Next.js).

---

## 🖥️ System Architecture

```text
                           ┌──────────────────────────────┐
                           │      LIFE_CORE Command       │
                           │     Next.js 13 App Router    │
                           │   (Red & Black Cyber UI)     │
                           └──────────────┬───────────────┘
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   │  HTTP REST / Zero-Latency Local Fallback     │
                   ▼                                             ▼
       ┌────────────────────────┐                   ┌────────────────────────┐
       │   FastAPI Backend      │                   │ Browser Local Cache    │
       │   Security Middleware  │                   │ (Encrypted Persistent) │
       └───────────┬────────────┘                   └────────────────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │ SQLite / SQLAlchemy ORM│
       │ (lifeos.db Repository) │
       └────────────────────────┘
```

---

## ✨ Core Telemetry Modules

### 1. 🎯 Command Center Dashboard (`/`)
* **Real-time Biometric Gauges**: Focus Output, Cognitive Energy Reserve, Productivity Index, Discipline Streak.
* **Neural Focus Protocol**: Interactive SVG circular countdown timer with *Pomodoro* (25m), *Deep Work* (50m), and *Rest* modes, live distraction logging, and automated kernel sync.
* **7-Day Telemetry Chart**: Responsive visual comparison of daily focus cycles vs. cognitive energy levels.
* **Strategic Milestone Quotas**: Real-time progress bars tracking quarterly deliverables.

### 2. 📋 Session Chronicle (`/activities`)
* Multi-category log filtering (*Engineering*, *Health*, *Learning*, *Operations*, *Focus*).
* Detailed metrics recording session duration, energy cost (-%), and focus intensity (%).
* Instant deletion and atomic commit capabilities.

### 3. 🚩 Objective Engine (`/goals`)
* Dedicated target commitment tracker with total hour commitments and deadline horizons.
* Milestone progress bars, status badges (*Active Crucible*, *Final Sprint*), and timeline countdowns.

### 4. 💡 What‑If Predictive Simulator (`/whatif`)
* Interactive hypothesis testing sliders: Daily Focus Hours, Sleep Duration, Habit Compliance Rate, and Forecast Horizon.
* Dynamic computation of **Burnout Risk Score**, **Compound Skill Acquisition Velocity**, and **Goal Probability Rating**.
* Actionable AI Cognitive Directives tailored to current physiological parameters.

### 5. 📊 Deep Telemetry & Analytics (`/analytics`)
* Flow state efficiency ratios and distraction event latency.
* Multi-segmented energy allocation breakdown across life disciplines.

### 6. ⚙️ Settings & Security Center (`/settings`)
* Live backend health protocol tester (`/api/health`).
* Local repository management and seed data reset.
* System architecture and security compliance audit.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** v18+ (tested on Node v24)
* **Python** 3.10+ (tested on Python 3.14)
* **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/ISBANDURAHUMAN-R/LIFE_CORE.git
cd LIFE_CORE
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Launch the Complete System

**Option A — Running the Frontend (Command Center):**
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

**Option B — Running the Backend API:**
```bash
pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```
Open interactive Swagger API documentation at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## 📡 API Reference Overview

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | System security status & kernel version |
| `/api/dashboard` | `GET` | Aggregated command center telemetry |
| `/api/activities` | `GET`, `POST` | List and record productivity sessions |
| `/api/activities/{id}` | `DELETE` | Remove activity record |
| `/api/focus` | `GET`, `POST` | Retrieve and record focus sessions |
| `/api/goals` | `GET`, `POST`, `PUT`| Strategic milestones & target hours |
| `/api/simulate` | `POST` | Predictive What-If simulation algorithm |
| `/api/insights` | `GET` | Cognitive recommendations |

---

## 🎨 Color Palette Reference

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Obsidian Black** | `#050508` | Primary background canvas |
| **Deep Charcoal** | `#0e0e15` | Glass panels & cards |
| **Crimson Red** | `#ff2a51` / `#ef4444` | Primary brand accent & active states |
| **Ruby Red** | `#be123c` / `#9f1239` | Secondary highlights & progress rings |
| **Blood Velvet** | `#4c0519` | Subtle ambient background glows |

---

## 📜 License & Integrity

Engineered for high-agency individuals. Developed and maintained under MIT License.
