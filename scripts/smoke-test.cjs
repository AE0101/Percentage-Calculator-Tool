const { spawn } = require("child_process");
const path = require("path");

const electronExecutable = require("electron");
const projectRoot = path.join(__dirname, "..");

const child = spawn(electronExecutable, [projectRoot, "--smoke-test"], {
  cwd: projectRoot,
  stdio: "inherit",
  windowsHide: true
});

const timeout = setTimeout(() => {
  child.kill();
  console.error("Electron smoke test timed out.");
  process.exit(1);
}, 15000);

child.on("exit", (code) => {
  clearTimeout(timeout);
  process.exit(code ?? 1);
});
