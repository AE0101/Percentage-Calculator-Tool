# Percentage Calculator Tool Desktop

An offline Windows desktop percentage calculator built with Electron.

This project began as a finished single-file HTML utility and was converted into a structured desktop app while preserving the original terminal-inspired UI and instant calculation behavior.

---

## Current Version

Desktop v1.1.0

---

## What It Does

The app includes five practical calculators:

- Percentage Change
- Percentage of Total
- Calculate Percentage
- Discount
- Find Original Value

It also includes desktop polish:

- live calculation while typing
- Enter key support
- copy buttons with visible feedback
- Clear All button
- About dialog
- Windows installer build
- Windows portable build

---

## Project Structure

```text
electron/       Electron main process and preload bridge
src/            Calculator interface, styles, renderer logic, and math helpers
tests/          Unit tests for calculator formulas
scripts/        Local smoke-test launcher
assets/         App icon assets
reference/      Original finished HTML source
Documentation/  Project context, architecture, roadmap, and session summary
```

Generated build output is intentionally not committed.

---

## Run Locally

```powershell
npm install
npm start
```

---

## Test

```powershell
npm test
npm run test:smoke
```

The smoke test launches the real Electron app and verifies the renderer, preload bridge, live calculations, copy behavior, Clear All, version info, and clipboard bridge.

---

## Build Windows Apps

```powershell
npm run build
```

Build outputs are written to `dist/`:

- `Percentage Calculator Tool Setup 1.1.0.exe`
- `Percentage Calculator Tool Portable 1.1.0.exe`

The clean user-facing copies are placed in:

```text
D:\Codex Projects\Percentage Calculator Tool Desktop - FINAL OUTPUT
```

---

## Documentation

The main project documentation is in `Documentation/`:

- `1- PROJECT_CONTEXT.md`
- `2- ARCHITECTURE.md`
- `3- ROADMAP.md`
- `4- SESSION_SUMMARY.md`

These files explain why the tool exists, how the Electron version is structured, what was changed in each phase, and what happened during the development session.
