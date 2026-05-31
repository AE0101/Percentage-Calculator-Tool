# Project Context

## Project Name

Percentage Calculator Tool Desktop

---

## Project Purpose

The purpose of this project is to turn a finished local HTML percentage calculator into a small, polished Windows desktop application.

The desktop app should:

- remain fully offline
- preserve the original calculator behavior
- keep the terminal-inspired visual style
- support normal Windows usage through an installer
- support portable usage through a standalone executable
- be documented clearly enough for the project to be understood later

This is a personal utility tool, not a large commercial application.

---

## Final Core Idea

The app is a transparent desktop wrapper around a focused calculator workflow:

```text
User Input
-> Live Calculator Logic
-> Formula Preview
-> Result Display
-> Optional Copy
```

The important design decision was to avoid overbuilding.

Electron is used only to provide a desktop shell, app identity, packaging, and safe access to desktop features such as the clipboard and About dialog.

---

## Final Scope Definition

### Included in the Current Version

- Electron desktop app
- Windows native title bar
- offline local renderer
- five percentage calculators
- live formula previews
- copy-to-clipboard buttons
- copy feedback
- Clear All button
- About dialog
- tested calculation helpers
- Electron smoke test
- Windows installer build
- Windows portable build
- clean final-output folder
- local Git repository with documentation-style commits
- project documentation modeled after the AI Ambassadors documentation structure

---

### Calculation Types

The current app supports:

- percentage change
- percentage of total
- percentage portion of a number
- discount final price and savings
- original value from a known percentage

These are intentionally practical calculations rather than a full spreadsheet or financial system.

---

## What Is Not Included

The project intentionally does not include:

- user accounts
- cloud sync
- telemetry
- analytics
- database storage
- network calls
- auto-updater
- code signing
- custom Discord-style title bar
- complex theming system
- React or another frontend framework
- mobile builds
- macOS or Linux packaging

These exclusions keep the app small, understandable, and aligned with its original utility purpose.

---

## Development Philosophy

This project follows the same general development philosophy as the referenced AI Ambassadors documentation:

- keep the system simple
- document the real work, not an idealized version
- make architecture easy to trace
- avoid fake complexity
- preserve the human-directed development story
- use Git commits as part of the project memory
- explain limitations honestly

The tool is small, but the documentation is intentionally serious because future understanding matters.

---

## Success Criteria

The project is considered successful if:

- the calculator works locally as an Electron app
- all five calculator sections preserve the original behavior
- copy feedback and Clear All work reliably
- the app exposes safe desktop APIs through preload
- the Windows installer and portable builds are generated
- the final-output folder is easy to understand
- the documentation explains the project context and architecture clearly
- the local Git history tells a readable project story
- the repository is ready to connect to a private GitHub remote

---

## Current Final State

At the v1.1.0 stage, the project is:

- implemented as a structured Electron app
- tested with unit tests and a desktop smoke test
- packaged for Windows as installer and portable builds
- documented in a numbered `Documentation` folder
- initialized as a local Git repository
- prepared for private GitHub publishing once a remote is available

---

## Why This Project Matters

Technically, this is a small calculator.

But the project matters because it demonstrates a complete workflow:

- start from a useful single-file HTML tool
- convert it into a real desktop app
- preserve the original behavior
- add careful polish without bloating the product
- document the architecture and decisions
- prepare the project for version control and future sharing

The result is both a working tool and a record of how it was built.
