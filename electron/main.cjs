const { app, BrowserWindow, Menu, clipboard, dialog, ipcMain } = require("electron");
const path = require("path");

const isSmokeTest = process.argv.includes("--smoke-test");

function getAppInfo() {
  return {
    name: "Percentage Calculator Tool",
    version: app.getVersion(),
    credits: "Directed by a Human, made by DeepSeek & ChatGPT",
    privacy: "Fully offline. No tracking, no storage, no network calls."
  };
}

// The smoke test runs inside the real Electron window. This catches renderer,
// preload, and main-process integration problems that unit tests cannot see.
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
      checks.push(typeof window.percentageTool.getAppInfo === "function");
      checks.push(typeof window.percentageTool.showAboutDialog === "function");

      const appInfo = await window.percentageTool.getAppInfo();
      checks.push(appInfo.name === "Percentage Calculator Tool");
      checks.push(appInfo.version === "1.1.0");
      checks.push(document.getElementById("appVersion").innerText.includes("Desktop v1.1.0"));

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

      document.getElementById("copyPercentBtn").click();
      await new Promise((resolve) => setTimeout(resolve, 50));
      checks.push(document.getElementById("copyPercentBtn").innerText === "copied");

      document.getElementById("clearAllBtn").click();
      checks.push(document.getElementById("changeOrig").value === "");
      checks.push(document.getElementById("isWhatX").value === "");
      checks.push(document.getElementById("whatX").value === "");
      checks.push(document.getElementById("discountPrice").value === "");
      checks.push(document.getElementById("baseX").value === "");
      checks.push(text("changeResult").includes("—"));
      checks.push(text("percentResult").includes("—"));
      checks.push(text("whatResult").includes("—"));
      checks.push(text("discountResult").includes("—"));
      checks.push(text("baseResult").includes("—"));

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
      // The renderer stays browser-like. Desktop capabilities are exposed only
      // through the narrow preload API below.
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

ipcMain.handle("app:get-info", () => getAppInfo());

ipcMain.handle("app:show-about-dialog", async () => {
  const appInfo = getAppInfo();

  await dialog.showMessageBox({
    type: "info",
    title: `About ${appInfo.name}`,
    message: `${appInfo.name} Desktop v${appInfo.version}`,
    detail: `${appInfo.credits}\n\n${appInfo.privacy}`,
    buttons: ["OK"],
    noLink: true
  });
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
