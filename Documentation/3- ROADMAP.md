# Roadmap

This roadmap reflects both the current completed work and the likely future direction of the Percentage Calculator Tool Desktop project.

It should be read as a project memory document, not only a task list.

---

## Phase 1 - Original HTML Utility
**Status: Completed**

### Goals

- build a small local percentage calculator
- keep it offline
- keep it single-file
- use a terminal-inspired UI
- support fast practical calculations

### What was completed

- original single-file HTML app was created
- five calculator types were implemented
- live formula display was included
- copy buttons were added
- documentation existed in the original finished-project folder

### Outcome

This phase produced the useful calculator that became the source for the desktop app.

---

## Phase 2 - Electron Desktop Conversion
**Status: Completed**

### Goals

- turn the finished HTML tool into a desktop application
- preserve the original UI and behavior
- create a real Windows app identity
- support installer and portable builds

### What was completed

- Electron project was created
- original HTML was split into structured files
- main process and preload bridge were added
- app icon assets were generated
- Electron Builder packaging was configured
- installer and portable builds were produced

### Outcome

The project moved from a browser-opened HTML file into a working Windows desktop app.

---

## Phase 3 - Testing and Build Verification
**Status: Completed**

### Goals

- protect the calculator formulas
- verify the real Electron app launches correctly
- make packaging safer to repeat

### What was completed

- calculation helpers were separated from the renderer
- Vitest unit tests were added
- Electron smoke test was added
- build script was connected to tests
- portable and installer outputs were verified

### Outcome

The app became safer to change because core behavior is now checked automatically.

---

## Phase 4 - Clean Final Output Folder
**Status: Completed**

### Goals

- reduce confusion around generated files
- separate user-facing deliverables from source code
- make the installer and portable version easy to find

### What was completed

- final-output folder was created outside the source project
- installer and portable builds were copied into clear subfolders
- a "START HERE" explanation file was added

### Outcome

The final app files became easier to understand and share.

---

## Phase 5 - Desktop v1.1 Polish
**Status: Completed**

### Goals

- improve the app without making it larger than it needs to be
- add small desktop-app touches
- make user interactions more reassuring

### What was completed

- copy feedback was added
- Clear All button was added
- About dialog was added
- app version was shown in the footer
- preload app-info and About APIs were added
- smoke test was extended for v1.1 behavior
- useful developer comments were added

### Outcome

The app now feels more like a finished desktop utility while preserving its simple identity.

---

## Phase 6 - Documentation and Local Repository Foundation
**Status: Completed**

### Goals

- document the project in a style similar to AI Ambassadors GP Project #7
- create a local Git repository
- use readable commits as part of the project record
- prepare for private GitHub publishing

### What was completed

- `Documentation` folder was added
- project context was written
- architecture was documented
- roadmap was reconstructed
- session summary was written
- root README was rewritten
- `.gitignore` was added
- local Git history was initialized

### Outcome

The project became understandable as a complete development artifact, not just an app folder.

---

## Current Final Project State

The project is currently:

- a structured Electron desktop app
- Windows-focused
- offline
- tested
- packaged
- documented
- committed locally with readable history
- ready for a private GitHub remote when available

---

## Optional Future Work

Future improvements can include:

- custom Discord-style title bar
- compact mode that hides formula panels
- better multi-size icon set
- code signing for public sharing
- GitHub Releases for distributing installer and portable builds
- automated CI checks
- auto-update support

These are intentionally future items. They are not required for the current personal utility version.
