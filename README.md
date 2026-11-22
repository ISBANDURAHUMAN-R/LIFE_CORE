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
    A(["&nbsp;&nbsp;&nbsp; INPUT &nbsp;&nbsp;&nbsp;<br/>&nbsp; User Actions &amp; &nbsp;<br/>&nbsp; Productivity Data &nbsp;"])

    subgraph Habit ["&nbsp; HABIT BUILDING CYCLE &nbsp;"]
        H1["&nbsp; 1. CHOOSE A HABIT &nbsp;"]
        H2["&nbsp; 2. SET A GOAL &nbsp;"]
        H3["&nbsp; 3. TAKE ACTIONS &nbsp;"]
        H4["&nbsp; 4. REVIEW PROGRESS &nbsp;"]
        H5["&nbsp; 5. IMPROVE &nbsp;"]
        H6["&nbsp; 6. BUILD CONSISTENCY &nbsp;"]

        H1 --> H2 --> H3 --> H4 --> H5 --> H6
        H6 --> H3
    end

    subgraph Frontend ["&nbsp; FRONTEND — Next.js 13+ &nbsp;"]
        B["&nbsp; Tailwind UI &amp; &nbsp;<br/>&nbsp; Telemetry Dashboard &nbsp;"]
        C["&nbsp; TanStack React Query &nbsp;"]
        D["&nbsp; API HTTP Client &nbsp;"]
        B --> C --> D
    end

    subgraph Security ["&nbsp; SECURITY MIDDLEWARE &nbsp;"]
        E["&nbsp; CORS Validation &nbsp;"]
        F["&nbsp; Security Headers: &nbsp;<br/>&nbsp; nosniff • DENY &nbsp;"]
        E --> F
    end

    subgraph Backend ["&nbsp; BACKEND — FastAPI &nbsp;"]
        G["&nbsp; FastAPI Endpoints &nbsp;"]
        I["&nbsp; Focus Timer Service &nbsp;"]
        J["&nbsp; Cognitive Simulator &nbsp;<br/>&nbsp; Engine &nbsp;"]
        K["&nbsp; Habit &amp; Burnout &nbsp;<br/>&nbsp; Analytics &nbsp;"]

        G --> I
        G --> J
        G --> K
    end

    subgraph Storage ["&nbsp; PERSISTENCE LAYER &nbsp;"]
        L["&nbsp; SQLAlchemy ORM &nbsp;"]
        M[("&nbsp; SQLite Database &nbsp;")]
        L --> M
    end

    N(["&nbsp;&nbsp;&nbsp; OUTPUT &nbsp;&nbsp;&nbsp;<br/>&nbsp; Productivity Analytics &nbsp;<br/>&nbsp; Focus Metrics • History &nbsp;<br/>&nbsp; Habit Predictions &nbsp;"])

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
