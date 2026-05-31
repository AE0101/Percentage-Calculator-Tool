const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("percentageTool", {
  async copyText(text) {
    await ipcRenderer.invoke("clipboard:write-text", text);
  }
});
