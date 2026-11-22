# ◈ KAGE COMPANION // Desktop Companions

[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-ff1a2b.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-white.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-33.2-black.svg)](#)
[![Database](https://img.shields.io/badge/Database-Local%20SQLite-red.svg)](#)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Offline-success.svg)](#)

<p align="center">
  <img src="src/renderer/assets/icons/icon-64.png" alt="KAGE Companion Icon" width="120">
</p>

<p align="center">
  <strong>KAGE & KAGE-CHAN</strong><br>
  Living Interactive Chibi Companions for Windows 10 & Windows 11
</p>

<p align="center">
  Black × Blood Red × White | 100% Offline | Zero Configuration Required
</p>

---

## ◆ About the Project

KAGE COMPANION is a personal desktop companion application that brings two interactive chibi characters directly onto your Windows desktop.

Built with Electron, JavaScript, and local SQLite storage, it provides animated desktop companions with expressive character states, interactive controls, customizable behavior, and persistent positioning.

The application features two independent companions:

- **KAGE — The Shadow Pet:** A mischievous shadow creature with glowing blood-red eyes, small horns, and a swishing tail. Curious, playful, lazy, and expressive.
- **KAGE-CHAN — The Chibi Companion:** An anime-inspired companion with long dark hair, crimson highlights, and gothic attire. Caring, supportive, teasing, and slightly tsundere.

Both companions remain visible above ordinary desktop windows, respond to user interactions, and accompany everyday desktop activities through subtle animations.

## ❖ Key Features

- **Interactive Desktop Companions**
  - Transparent, frameless companion windows.
  - Always-on-top desktop positioning.
  - Smooth drag-and-drop movement.
  - Persistent character positions.
  - Independent visibility controls.
  - Adjustable character scale from 60% to 180%.

- **Expressive Character System**
  - 15+ character poses and expressions.
  - Idle, Happy, Sad, Curious, Angry, Sleepy, Surprised, Excited, Walking, Sleeping, Gaming, Coding, Coffee, Music, and Love states.
  - Interactive character menus.
  - Subtle autonomous animations.
  - Silent companion experience without intrusive notifications.

- **Five-Tab Settings Dashboard**
  - **Companions:** Character previews, visibility, scaling, and position controls.
  - **Behavior:** Animation intervals, responsiveness, and silent desktop options.
  - **Audio:** Procedural audio controls, volume, and pitch.
  - **Startup & Privacy:** Windows startup configuration, local storage information, data folder access, and memory reset.
  - **About:** Application information, companion details, hotkeys, and license.

- **Procedural Audio Engine**
  - Real-time Web Audio synthesis.
  - Gentle notification blips, warm purrs, cheerful chimes, and lullabies.
  - Adjustable master volume and pitch.
  - No external audio assets required.

- **Local-First Privacy**
  - Embedded SQLite database.
  - Local application data storage.
  - No telemetry or tracking.
  - Designed to operate without an internet connection.

- **Windows Startup Integration**
  - Optional automatic startup.
  - Background execution.
  - Restores previously saved companion positions.

## ◆ System Architecture

```text
Desktop Application
       │
       ▼
Electron Main Process
       │
       ├── Window Manager
       │     ├── KAGE Companion Window
       │     ├── KAGE-CHAN Companion Window
       │     ├── Settings Window
       │     └── Welcome Window
       │
       ├── Companion Engines
       │     ├── Personality Engine
       │     ├── Relationship Engine
       │     ├── Dialogue Database
       │     └── Autonomous Engine
       │
       ├── Secure IPC Communication
       │     ├── Companion Preload
       │     └── Settings Preload
       │
       ├── Audio Engine
       │     └── Web Audio API
       │
       └── Persistence Layer
             └── SQLite Database
```

## ⬢ Technologies Used

- Electron 33.2
- JavaScript
- HTML5 & CSS3
- SQLite
- SQLite WebAssembly
- Web Audio API
- Node.js
- npm
- IPC Communication

## § System Requirements

- Windows 10 or Windows 11 (64-bit).
- Minimum Node.js 18+ for development.
- npm 9+ for development.

End users do not need Node.js, Python, or additional programming tools when using the packaged application.

## ▲ Installation & Execution

### Option A: Portable Version

1. Download `KAGE-COMPANION-Portable-x64.zip`.
2. Extract the ZIP archive.
3. Open the extracted folder.
4. Run `KAGE COMPANION.exe`.
5. Both companions will appear on your desktop.

### Option B: Windows Installer

1. Download `KAGE-COMPANION-Setup-1.0.0.exe`.
2. Run the installer.
3. Follow the installation instructions.
4. Select the launch option to start KAGE COMPANION.

## ◆ Desktop Controls

| Action | Control | Result |
|---|---|---|
| Move Companion | Click and drag | Repositions the character |
| Change Expression | Left-click | Cycles character expressions |
| Open Companion Menu | Companion interaction | Opens quick actions |
| Open Settings | Right-click companion | Opens settings dashboard |
| Open Settings | Double-click tray icon | Opens settings dashboard |
| Reset Positions | Tray menu | Restores default positions |

## ◈ Developer Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer.
- npm v9 or newer.
- Windows 10 or Windows 11 (64-bit).

### Clone Repository

```bash
git clone https://github.com/isbandu/kage-companion.git
cd kage-companion
```

### Install Dependencies

```bash
npm install
```

### Run Development Version

```bash
npm start
```

### Run Tests

```bash
npm test
```

### Build Windows Packages

```bash
npm run dist
```

Build artifacts are generated inside the `dist/` directory.

Expected packages:

- `KAGE-COMPANION-Setup-1.0.0.exe`
- `KAGE-COMPANION-Portable-x64.zip`

## ❖ Project Structure

```text
src/
├── main/
│   ├── database/
│   │   └── db.js
│   ├── engine/
│   │   ├── dialogueDatabase.js
│   │   ├── personalityEngine.js
│   │   ├── relationshipEngine.js
│   │   └── autonomousEngine.js
│   ├── preload/
│   │   ├── companionPreload.js
│   │   └── settingsPreload.js
│   ├── windows/
│   │   ├── companionWindow.js
│   │   ├── settingsWindow.js
│   │   └── welcomeWindow.js
│   └── index.js
└── renderer/
    ├── assets/
    │   └── icons/
    ├── characters/
    │   ├── kage/
    │   └── kage-chan/
    ├── settings/
    ├── welcome/
    └── shared/
        ├── audio/
        └── styles/
```

## ※ Privacy & Data Storage

KAGE COMPANION uses local application storage.

Database location:

```text
%APPDATA%\kage-companion\kage.sqlite
```

The application is designed around offline operation and local data persistence. Companion settings and saved positions are maintained locally.

## ◆ Developer

**Created, Developed & Owned by Isbandu Rahuman R.**

- **Founder & Creator:** Isbandu Rahuman R.
- **Developer:** Isbandu Rahuman R.
- **Project Owner:** Isbandu Rahuman R.
- **Concept & Product Design:** Isbandu Rahuman R.

GitHub: [ISBANDURAHUMAN-R](https://github.com/ISBANDURAHUMAN-R)

KAGE COMPANION is an independently developed personal companion application.

## § License

This project is distributed under the [MIT License](LICENSE).

Copyright © Isbandu Rahuman R. All rights reserved to the extent permitted by the applicable license.

