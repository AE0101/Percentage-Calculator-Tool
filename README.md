# Percentage Calculator Tool Desktop

An offline desktop percentage calculator built with Electron.

This project turns a small browser-based percentage utility into a structured Windows desktop app. It keeps the original terminal-inspired interface and instant calculation flow, while adding desktop packaging, a safer Electron structure, automated checks, and project documentation.

---

## Built With Codex

This project was human-directed and built with Codex as the AI coding collaborator.

Codex helped convert the original single-file HTML utility into a structured Electron desktop app, add tests, prepare Windows packaging, write project documentation, and maintain the local Git/GitHub workflow. The project remains intentionally transparent about that collaboration because the development process is part of the value of the repository.

---

## What This App Is

Percentage Calculator Tool Desktop is a practical local utility for common percentage calculations.

It is designed for quick use rather than account-based or cloud-connected workflows:

- no login
- no tracking
- no network requirement at runtime
- no stored user data
- no database

The app is intentionally small. Its value is speed, clarity, and an understandable codebase.

---

## Features

The current version includes five calculator sections:

- **Percentage Change** - shows increase or decrease from an original value
- **Percentage of Total** - finds what percent one value is of another
- **Calculate Percentage** - calculates X percent of a number
- **Discount** - calculates final price and savings
- **Find Original Value** - finds the full value from a known percentage

Desktop polish includes:

- live calculation while typing
- Enter key support
- copy-to-clipboard buttons with visible feedback
- Clear All button
- About dialog
- Windows installer build
- Windows portable build

---

## Current Version

Desktop v1.1.0

---

## How It Works

The app uses a simple Electron structure:

```text
Electron main process
-> preload bridge
-> local renderer
-> calculation helpers
-> live result display
```

The renderer is plain HTML, CSS, and JavaScript. The calculation logic is separated into pure helper functions so the math can be tested without launching Electron.

Desktop-only capabilities, such as clipboard access and the About dialog, are exposed through a narrow preload API instead of giving the renderer direct Node/Electron access.

---

## Project Structure

```text
electron/       Electron main process and preload bridge
src/            Interface, styles, renderer logic, and calculation helpers
tests/          Unit tests for calculator formulas
scripts/        Local Electron smoke-test launcher
assets/         App icon assets
reference/      Original finished HTML source
Documentation/  Project context, architecture, roadmap, and session summary
```

Generated build output is not committed to the repository.

---

## Install Dependencies

```powershell
npm install
```

---

## Run Locally

```powershell
npm start
```

---

## Test

```powershell
npm test
npm run test:smoke
```

The unit tests verify the calculation helpers.

The smoke test launches the real Electron app and verifies the renderer, preload bridge, live calculations, copy behavior, Clear All behavior, version info, and clipboard bridge.

---

## Build

```powershell
npm run build
```

The build creates Windows desktop outputs under `dist/`:

- NSIS installer
- portable executable
- unpacked app folder

---

## Documentation

The main project documentation is in `Documentation/`:

- `1- PROJECT_CONTEXT.md`
- `2- ARCHITECTURE.md`
- `3- ROADMAP.md`
- `4- SESSION_SUMMARY.md`

These files explain the purpose of the project, how the Electron architecture works, how the project evolved, and what happened during the development session.

---

## Design Philosophy

This project favors:

- simplicity over feature bloat
- offline use over cloud dependency
- readable code over unnecessary frameworks
- visible tests over manual-only confidence
- documentation as part of the development process

The goal is not to make a large product. The goal is to make a small utility feel complete, understandable, and maintainable.
