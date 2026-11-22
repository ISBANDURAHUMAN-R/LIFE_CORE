\<p align="center">\
&#x20; \<img src="assets/banner.png" alt="LIFE_CORE Banner" width="100%">\
\</p>\
\
\# ◈ LIFE_CORE // Neural Life Command OS\
\
[![CI]\(https\://github.com/ISBANDURAHUMAN-R/LIFE_CORE/actions/workflows/ci.yml/badge.svg)]\(https\://github.com/ISBANDURAHUMAN-R/LIFE_CORE/actions/workflows/ci.yml)\
\
\## ◆ About the Project\
LIFE_CORE is a personal productivity, habit tracking, and cognitive telemetry platform built with Next.js and FastAPI. It integrates focus timing protocols, session logging, predictive what-if simulators, and performance analytics into a single low-latency command center interface.\
\
\## ❖ Key Features\
\- Real-time productivity and focus output dashboard with animated telemetry gauges.\
\- Interactive focus timer supporting Pomodoro (25m), Deep Work (50m), and Rest intervals with distraction logging.\
\- Session activity journal with category filtering, duration tracking, and energy cost ratings.\
\- Predictive simulation module calculating burnout risk and habit velocity based on customizable user parameters.\
\- Hardened FastAPI backend featuring strict CORS validation, security header middleware, and parameterized SQLite storage.\
\
\## ◆ System Architecture\
\`\`\`mermaid\
graph TD\
&#x20;   subgraph Frontend ["Next.js 13+ Command Center (Port 3000)"]\
&#x20;       UI["Tailwind UI & Telemetry Gauges"] --> Hook["TanStack React Query"]\
&#x20;       Hook --> Client["API HTTP Client"]\
&#x20;   end\
\
&#x20;   subgraph Security ["Enterprise Security Middleware"]\
&#x20;       Client --> CORS["Configurable CORS Policy"]\
&#x20;       CORS --> SecHeaders["Security Headers Middleware\<br/>nosniff • DENY • strict-origin"]\
&#x20;   end\
\
&#x20;   subgraph Backend ["FastAPI Core Services (Port 8001)"]\
&#x20;       SecHeaders --> Router["FastAPI REST Endpoints"]\
&#x20;       Router --> SvcFocus["Focus & Timer Service"]\
&#x20;       Router --> SvcSim["Cognitive Simulator Engine"]\
&#x20;       Router --> SvcHabit["Habit & Burnout Analytics"]\
&#x20;   end\
\
&#x20;   subgraph Storage ["Persistence Layer"]\
&#x20;       SvcFocus --> ORM["SQLAlchemy ORM"]\
&#x20;       SvcSim --> ORM\
&#x20;       SvcHabit --> ORM\
&#x20;       ORM --> DB[("SQLite Database")]\
&#x20;   end\
\`\`\`\
\
\## ⬢ Technologies Used\
\- Next.js 13+ (App Router)\
\- React & TypeScript\
\- Tailwind CSS\
\- Python 3.10+\
\- FastAPI & Pydantic v2\
\- SQLAlchemy & SQLite\
\
\## § Requirements\
\- Node.js 18 or higher\
\- Python 3.10 or higher\
\
\## ▲ Installation & Execution\
\`\`\`bash\
\# 1. Start Frontend\
npm install\
npm run dev\
\
\# 2. Start Backend\
cd backend\
pip install -r requirements.txt\
python -m uvicorn main:app --reload --port 8001\
\`\`\`\
\
\## ※ Developer\
Developer: ISBANDU RAHUMAN R  \
GitHub: https\://github.com/ISBANDURAHUMAN-R\

