const { contextBridge, ipcRenderer } = require("electron");

// Keep the renderer isolated from Node/Electron. Only these explicit actions
// cross the boundary into the main process.
contextBridge.exposeInMainWorld("percentageTool", {
  async copyText(text) {
    await ipcRenderer.invoke("clipboard:write-text", text);
  },
  async getAppInfo() {
    return ipcRenderer.invoke("app:get-info");
  },
  async showAboutDialog() {
    await ipcRenderer.invoke("app:show-about-dialog");
  }
});
