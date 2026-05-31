# System Architecture

## Overview

Percentage Calculator Tool Desktop is a small Electron application.

The architecture is intentionally simple:

- Electron creates the Windows desktop shell
- preload exposes a narrow safe API
- the renderer displays the calculator UI
- pure calculation helpers perform the math
- tests verify both formulas and real desktop integration
- Electron Builder produces installer and portable builds

The app does not load remote content and does not require an internet connection at runtime.

---

## High-Level Flow

```text
User Input
    |
Renderer Event Handler
    |
Calculation Helper
    |
Formula Preview + Result Display
    |
Optional Preload API
    |
Electron Main Process
```

---

## Final Architecture Layers

### 1. Electron Main Process

The main process lives in:

```text
electron/main.cjs
```

It is responsible for:

- creating the application window
- loading the local HTML file
- setting the app icon
- keeping the native Windows title bar
- handling clipboard requests
- returning app metadata
- showing the About dialog
- running the integration smoke test when launched with `--smoke-test`

The main process is the only part of the app that directly accesses Electron desktop APIs.

---

### 2. Preload Bridge

The preload file lives in:

```text
electron/preload.cjs
```

It exposes a small API to the renderer:

```text
window.percentageTool.copyText(text)
window.percentageTool.getAppInfo()
window.percentageTool.showAboutDialog()
```

This is important because the renderer is kept isolated from Node and direct Electron access.

The app uses:

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`

This keeps the desktop boundary clear and easier to reason about.

---

### 3. Renderer Interface

The renderer lives in:

```text
src/index.html
src/styles.css
src/renderer.js
```

The renderer is responsible for:

- displaying the original terminal-inspired UI
- reading numeric inputs
- updating formulas live
- displaying results
- resetting individual sections
- clearing all sections
- showing copy feedback
- calling the preload API when desktop behavior is needed

The UI remains plain HTML, CSS, and JavaScript. No framework is used because the app is small and does not need one.

---

### 4. Calculation Layer

The calculation helpers live in:

```text
src/calculations.js
```

This file contains pure functions for:

- decimal formatting
- percentage change
- percentage of total
- percentage portion
- discount calculation
- original value calculation

Keeping the math separate from the DOM makes the formulas easy to test and easier for future developers to inspect.

---

### 5. Test Layer

The project uses two levels of testing.

Unit tests live in:

```text
tests/calculations.test.js
```

They verify the calculation helpers and edge cases.

The Electron smoke test is launched through:

```text
scripts/smoke-test.cjs
```

It starts the real app and verifies:

- app focus
- live calculation behavior
- divide-by-zero handling
- copy bridge
- copy feedback
- Clear All behavior
- app version bridge
- About dialog bridge availability

---

### 6. Packaging Layer

Packaging is configured in:

```text
package.json
```

Electron Builder creates:

- an NSIS installer
- a portable Windows executable

Generated output is written to:

```text
dist/
```

Clean user-facing copies are then placed in:

```text
D:\Codex Projects\Percentage Calculator Tool Desktop - FINAL OUTPUT
```

---

## Internal Structure

The main source areas are:

```text
electron/       desktop shell and bridge
src/            UI, style, renderer logic, calculations
tests/          unit tests
scripts/        smoke-test launcher
assets/         icon files
reference/      original HTML source
Documentation/  project explanation and development record
```

This structure keeps the project readable without introducing more layers than the tool needs.

---

## Design Philosophy

### 1. Preserve the original app

The original HTML calculator was already useful. The Electron version should not change its identity.

### 2. Desktop features should be narrow

Desktop APIs are accessed only through preload and main-process handlers.

### 3. Tests should cover real behavior

The smoke test launches the actual app because some important behavior only exists when Electron, preload, and renderer code work together.

### 4. Documentation is part of the architecture

The documentation explains not only what files exist, but why the project was shaped this way.

---

## Important Limitation

The app is currently packaged for Windows only.

It can likely be adapted for other platforms later, but macOS and Linux builds were intentionally left out of the v1.1 scope.

---

## Final Architectural Character

The final architecture is:

- small
- local
- offline
- testable
- packaged
- documented
- easy to understand later

That is the intended character of the project.
