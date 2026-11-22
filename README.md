<p align="center">
<img src="assets/banner.png" alt="LIFE_CORE Banner" width="100%">
</p>

# ◈ LIFE_CORE // Neural Life Command OS



## ◆ About the Project

LIFE_CORE is a personal productivity, habit tracking, and cognitive telemetry platform built with Next.js and FastAPI. It integrates focus timing protocols, session logging, predictive what-if simulators, and performance analytics into a single low-latency command center interface.

## ❖ Key Features

- Real-time productivity and focus output dashboard with animated telemetry gauges.
- Interactive focus timer supporting Pomodoro (25m), Deep Work (50m), and Rest intervals with distraction logging.
- Session activity journal with category filtering, duration tracking, and energy cost ratings.
- Predictive simulation module calculating burnout risk and habit velocity based on customizable user parameters.
- Hardened FastAPI backend featuring strict CORS validation, security header middleware, and parameterized SQLite storage.

## ◆ System Architecture

```mermaid
flowchart TD
    A(["INPUT<br/>User Actions & Productivity Data"])
```mermaid
flowchart TD
    A(["INPUT<br/>User Actions & Productivity Data"])

    subgraph Habit ["HABIT BUILDING CYCLE"]
        H1["1. CHOOSE A HABIT"]
        H2["2. SET A GOAL"]
        H3["3. TAKE ACTIONS"]
        H4["4. REVIEW PROGRESS"]
        H5["5. IMPROVE"]
        H6["6. BUILD CONSISTENCY"]

        H1 --> H2 --> H3 --> H4 --> H5 --> H6
        H6 --> H3
    end

    subgraph Frontend ["FRONTEND — Next.js 13+ (Port 3000)"]
        B["Tailwind UI & Telemetry Dashboard"]
        C["TanStack React Query"]
        D["API HTTP Client"]
        B --> C --> D
    end

    subgraph Security ["SECURITY MIDDLEWARE"]
        E["CORS Validation"]
        F["Security Headers<br/>nosniff • DENY • strict-origin"]
        E --> F
    end

    subgraph Backend ["BACKEND — FastAPI (Port 8001)"]
        G["FastAPI REST Endpoints"]
        I["Focus & Timer Service"]
        J["Cognitive Simulator Engine"]
        K["Habit & Burnout Analytics"]
        G --> I
        G --> J
        G --> K
    end

    subgraph Storage ["PERSISTENCE LAYER"]
        L["SQLAlchemy ORM"]
        M[("SQLite Database")]
        L --> M
    end

    N(["OUTPUT<br/>Productivity Analytics<br/>Focus Metrics<br/>Session History<br/>Habit Progress & Predictions"])

    A --> B
    A --> H1
    H6 --> B
    D --> E
    F --> G
    I --> L
    J --> L
    K --> L
    M --> N
    N -.-> B
    N -.-> H4
```
    subgraph Habit ["HABIT BUILDING CYCLE"]
        H1["1. CHOOSE A HABIT"]
        H2["2. SET A GOAL"]
        H3["3. TAKE ACTIONS"]
        H4["4. REVIEW PROGRESS"]
        H5["5. IMPROVE"]
        H6["6. BUILD CONSISTENCY"]

        H1 --> H2 --> H3 --> H4 --> H5 --> H6
        H6 --> H3
    end

    subgraph Frontend ["FRONTEND — Next.js 13+ (Port 3000)"]
        B["Tailwind UI & Telemetry Dashboard"]
        C["TanStack React Query"]
        D["API HTTP Client"]
        B --> C --> D
    end

    subgraph Security ["SECURITY MIDDLEWARE"]
        E["CORS Validation"]
        F["Security Headers<br/>nosniff • DENY • strict-origin"]
        E --> F
    end

    subgraph Backend ["BACKEND — FastAPI (Port 8001)"]
        G["FastAPI REST Endpoints"]
        I["Focus & Timer Service"]
        J["Cognitive Simulator Engine"]
        K["Habit & Burnout Analytics"]
        G --> I
        G --> J
        G --> K
    end

    subgraph Storage ["PERSISTENCE LAYER"]
        L["SQLAlchemy ORM"]
        M[("SQLite Database")]
        L --> M
    end

    N(["OUTPUT<br/>Productivity Analytics<br/>Focus Metrics<br/>Session History<br/>Habit Progress & Predictions"])

    A --> B
    A --> H1
    H6 --> B
    D --> E
    F --> G
    I --> L
    J --> L
    K --> L
    M --> N
    N -.-> B
    N -.-> H4

    style A fill:#161616,stroke:#ff3030,color:#ffffff
    style N fill:#161616,stroke:#ff3030,color:#ffffff
    style H1 fill:#242424,stroke:#ff3030,color:#ffffff
    style H2 fill:#242424,stroke:#ff3030,color:#ffffff
    style H3 fill:#242424,stroke:#ff3030,color:#ffffff
    style H4 fill:#242424,stroke:#ff3030,color:#ffffff
    style H5 fill:#242424,stroke:#ff3030,color:#ffffff
    style H6 fill:#242424,stroke:#ff3030,color:#ffffff
```
## ⬢ Technologies Used

- Next.js 13+ (App Router)
- React & TypeScript
- Tailwind CSS
- Python 3.10+
- FastAPI & Pydantic v2
- SQLAlchemy & SQLite

## § Requirements

- Node.js 18 or higher
- Python 3.10 or higher

## ▲ Installation & Execution

```
# 1. Start Frontend
npm install
npm run dev

# 2. Start Backend
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

## ※ Developer

**Developer:** ISBANDU RAHUMAN R

**GitHub:** [https://github.com/ISBANDURAHUMAN-R](https://github.com/ISBANDURAHUMAN-R)

Add a quick-start workflowExplain the development server setup
