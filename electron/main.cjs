const { app, BrowserWindow, Menu, clipboard, ipcMain } = require("electron");
const path = require("path");

const isSmokeTest = process.argv.includes("--smoke-test");

async function runSmokeTest(mainWindow) {
  const result = await mainWindow.webContents.executeJavaScript(`
    (async () => {
      const setValue = (id, value) => {
        const el = document.getElementById(id);
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      };

      const text = (id) => document.getElementById(id).innerText.trim();

      const checks = [];
      checks.push(document.activeElement.id === "changeOrig");

      setValue("changeOrig", "150");
      setValue("changeNew", "180");
      checks.push(text("changeResult").includes("20.00% increase"));

      setValue("changeOrig", "200");
      setValue("changeNew", "150");
      checks.push(text("changeResult").includes("25.00% decrease"));

      setValue("changeOrig", "0");
      setValue("changeNew", "150");
      checks.push(text("changeResult").includes("Original value cannot be zero"));

      setValue("isWhatX", "50");
      setValue("isWhatY", "200");
      checks.push(text("percentResult").includes("25.00%"));

      setValue("isWhatY", "0");
      checks.push(text("percentResult").includes("Total cannot be zero"));

      setValue("whatX", "20");
      setValue("whatY", "500");
      checks.push(text("whatResult").includes("100.00"));

      setValue("discountPrice", "79.99");
      setValue("discountPercent", "20");
      checks.push(text("discountResult").includes("Final: 63.99"));
      checks.push(text("discountResult").includes("Saved: 16.00"));

      setValue("baseX", "50");
      setValue("baseY", "25");
      checks.push(text("baseResult").includes("200.00"));

      setValue("baseY", "0");
      checks.push(text("baseResult").includes("Percent cannot be zero"));

      await window.percentageTool.copyText("percentage-tool-smoke-test");

      return checks.every(Boolean);
    })();
  `);

  if (!result || clipboard.readText() !== "percentage-tool-smoke-test") {
    throw new Error("Smoke test failed.");
  }
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1120,
    height: 860,
    minWidth: 760,
    minHeight: 620,
    show: !isSmokeTest,
    title: "Percentage Calculator Tool",
    backgroundColor: "#0E0F12",
    icon: path.join(__dirname, "..", "assets", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, "..", "src", "index.html")).then(async () => {
    if (!isSmokeTest) return;

    try {
      await runSmokeTest(mainWindow);
      app.exit(0);
    } catch (error) {
      console.error(error);
      app.exit(1);
    }
  });
}

ipcMain.handle("clipboard:write-text", (_event, text) => {
  clipboard.writeText(String(text ?? ""));
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
