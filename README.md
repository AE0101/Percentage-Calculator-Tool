# Percentage Calculator Tool Desktop

Offline desktop version of the Percentage Calculator Tool, packaged with Electron for Windows.

## Run Locally

```powershell
npm install
npm start
```

## Test

```powershell
npm test
```

## Build Windows Apps

```powershell
npm run build
```

Build outputs are written to `dist/`:

- Portable executable: `Percentage Calculator Tool Portable 1.0.0.exe`
- Installer executable: `Percentage Calculator Tool Setup 1.0.0.exe`

## Source Layout

- `electron/main.cjs` creates the desktop window.
- `electron/preload.cjs` exposes safe desktop APIs to the renderer.
- `src/index.html`, `src/styles.css`, and `src/renderer.js` contain the calculator interface.
- `src/calculations.js` contains tested calculation helpers.
- `reference/Percentage Calculator Tool v1.1.html` is the original finished HTML source.
