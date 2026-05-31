import {
  calculateDiscount,
  calculateOriginalValue,
  calculatePercentageChange,
  calculatePercentageOfTotal,
  calculatePercentagePortion,
  formatDecimal
} from "./calculations.js";

const COPY_FEEDBACK_MS = 1200;

function getNumber(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const val = el.value.trim();
  if (val === "") return null;
  const num = parseFloat(val);
  return Number.isNaN(num) ? null : num;
}

function setResult(resultId, content, isError = false) {
  const el = document.getElementById(resultId);
  if (!el) return;

  if (isError) {
    el.innerHTML = `<span class="result-prefix">=</span><span style="color:#E9A715;">${content}</span>`;
  } else {
    el.innerHTML = `<span class="result-prefix">=</span>${content}`;
  }
}

function showCopyFeedback(button) {
  if (!button) return;

  const originalText = button.innerText;
  button.innerText = "copied";
  button.classList.add("copied");

  window.setTimeout(() => {
    button.innerText = originalText;
    button.classList.remove("copied");
  }, COPY_FEEDBACK_MS);
}

async function copyText(text, button) {
  try {
    if (window.percentageTool?.copyText) {
      await window.percentageTool.copyText(text);
      showCopyFeedback(button);
      return;
    }

    await navigator.clipboard.writeText(text);
    showCopyFeedback(button);
  } catch {
    // Clipboard failures should not interrupt the calculator.
  }
}

function attachEnterKey(ids, computeFn) {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter") computeFn();
    });
  });
}

function updateChangeLive() {
  const orig = getNumber("changeOrig");
  const newVal = getNumber("changeNew");
  const formulaDiv = document.getElementById("changeLiveFormula");
  const resultSpan = document.getElementById("changeLiveResult");

  if (orig === null || newVal === null) {
    formulaDiv.innerHTML = "((new − original) / original) × 100";
    resultSpan.innerHTML = "→ —";
    setResult("changeResult", "—");
    return;
  }

  if (orig === 0) {
    formulaDiv.innerHTML = '((new − original) / original) × 100 <span style="color:#E9A715;">(original cannot be zero)</span>';
    resultSpan.innerHTML = "→ invalid";
    setResult("changeResult", "Original value cannot be zero", true);
    return;
  }

  const result = calculatePercentageChange(orig, newVal);
  const absChange = Math.abs(result.value);

  formulaDiv.innerHTML = `((${newVal} − ${orig}) / ${orig}) × 100`;
  resultSpan.innerHTML = `→ ${formatDecimal(absChange)}% ${result.value > 0 ? "increase" : result.value < 0 ? "decrease" : "no change"}`;
  setResult("changeResult", result.label);
}

function updatePercentLive() {
  const x = getNumber("isWhatX");
  const y = getNumber("isWhatY");
  const formulaDiv = document.getElementById("percentLiveFormula");
  const resultSpan = document.getElementById("percentLiveResult");

  if (x === null || y === null) {
    formulaDiv.innerHTML = "(X / Y) × 100";
    resultSpan.innerHTML = "→ —";
    setResult("percentResult", "—");
    return;
  }

  if (y === 0) {
    formulaDiv.innerHTML = '(X / Y) × 100 <span style="color:#E9A715;">(Y cannot be zero)</span>';
    resultSpan.innerHTML = "→ invalid";
    setResult("percentResult", "Total cannot be zero", true);
    return;
  }

  const result = calculatePercentageOfTotal(x, y);
  formulaDiv.innerHTML = `(${x} / ${y}) × 100`;
  resultSpan.innerHTML = `→ ${result.label}`;
  setResult("percentResult", result.label);
}

function updateWhatLive() {
  const x = getNumber("whatX");
  const y = getNumber("whatY");
  const formulaDiv = document.getElementById("whatLiveFormula");
  const resultSpan = document.getElementById("whatLiveResult");

  if (x === null || y === null) {
    formulaDiv.innerHTML = "(X / 100) × Y";
    resultSpan.innerHTML = "→ —";
    setResult("whatResult", "—");
    return;
  }

  const result = calculatePercentagePortion(x, y);
  formulaDiv.innerHTML = `(${x} / 100) × ${y}`;
  resultSpan.innerHTML = `→ ${result.label}`;
  setResult("whatResult", result.label);
}

function updateDiscountLive() {
  const price = getNumber("discountPrice");
  const disc = getNumber("discountPercent");
  const formulaDiv = document.getElementById("discountLiveFormula");
  const resultSpan = document.getElementById("discountLiveResult");

  if (price === null || disc === null) {
    formulaDiv.innerHTML = "final = price × (1 − discount/100)<br>saved = price × discount/100";
    resultSpan.innerHTML = "→ —";
    setResult("discountResult", "—");
    return;
  }

  const result = calculateDiscount(price, disc);
  formulaDiv.innerHTML = `final = ${price} × (1 − ${disc}/100) = ${formatDecimal(result.finalPrice)}<br>saved = ${price} × ${disc}/100 = ${formatDecimal(result.saved)}`;
  resultSpan.innerHTML = `→ final: ${formatDecimal(result.finalPrice)} | saved: ${formatDecimal(result.saved)}`;
  setResult("discountResult", result.label);
}

function updateBaseLive() {
  const x = getNumber("baseX");
  const y = getNumber("baseY");
  const formulaDiv = document.getElementById("baseLiveFormula");
  const resultSpan = document.getElementById("baseLiveResult");

  if (x === null || y === null) {
    formulaDiv.innerHTML = "X / (Y / 100)";
    resultSpan.innerHTML = "→ —";
    setResult("baseResult", "—");
    return;
  }

  if (y === 0) {
    formulaDiv.innerHTML = 'X / (Y / 100) <span style="color:#E9A715;">(Y cannot be zero)</span>';
    resultSpan.innerHTML = "→ invalid";
    setResult("baseResult", "Percent cannot be zero", true);
    return;
  }

  const result = calculateOriginalValue(x, y);
  formulaDiv.innerHTML = `${x} / (${y} / 100)`;
  resultSpan.innerHTML = `→ ${result.label}`;
  setResult("baseResult", result.label);
}

function resetFields(inputIds, resultId, updateFn) {
  inputIds.forEach((id) => {
    document.getElementById(id).value = "";
  });
  setResult(resultId, "—");
  updateFn();
}

function clearAllCalculators() {
  resetFields(["changeOrig", "changeNew"], "changeResult", updateChangeLive);
  resetFields(["isWhatX", "isWhatY"], "percentResult", updatePercentLive);
  resetFields(["whatX", "whatY"], "whatResult", updateWhatLive);
  resetFields(["discountPrice", "discountPercent"], "discountResult", updateDiscountLive);
  resetFields(["baseX", "baseY"], "baseResult", updateBaseLive);
  document.getElementById("changeOrig").focus();
}

async function syncAppInfo() {
  if (!window.percentageTool?.getAppInfo) return;

  const appInfo = await window.percentageTool.getAppInfo();
  document.getElementById("appVersion").innerText = `Desktop v${appInfo.version}`;
}

function bindControls() {
  document.getElementById("clearAllBtn").addEventListener("click", clearAllCalculators);
  document.getElementById("aboutBtn").addEventListener("click", () => window.percentageTool?.showAboutDialog?.());

  document.getElementById("calcChangeBtn").addEventListener("click", updateChangeLive);
  document.getElementById("resetChangeBtn").addEventListener("click", () => resetFields(["changeOrig", "changeNew"], "changeResult", updateChangeLive));
  document.getElementById("copyChangeBtn").addEventListener("click", (event) => copyText(document.getElementById("changeResult").innerText.replace(/^=\s*/, ""), event.currentTarget));

  document.getElementById("calcPercentBtn").addEventListener("click", updatePercentLive);
  document.getElementById("resetPercentBtn").addEventListener("click", () => resetFields(["isWhatX", "isWhatY"], "percentResult", updatePercentLive));
  document.getElementById("copyPercentBtn").addEventListener("click", (event) => copyText(document.getElementById("percentResult").innerText.replace(/^=\s*/, ""), event.currentTarget));

  document.getElementById("calcWhatBtn").addEventListener("click", updateWhatLive);
  document.getElementById("resetWhatBtn").addEventListener("click", () => resetFields(["whatX", "whatY"], "whatResult", updateWhatLive));
  document.getElementById("copyWhatBtn").addEventListener("click", (event) => copyText(document.getElementById("whatResult").innerText.replace(/^=\s*/, ""), event.currentTarget));

  document.getElementById("calcDiscountBtn").addEventListener("click", updateDiscountLive);
  document.getElementById("resetDiscountBtn").addEventListener("click", () => resetFields(["discountPrice", "discountPercent"], "discountResult", updateDiscountLive));
  document.getElementById("copyDiscountBtn").addEventListener("click", (event) => copyText(document.getElementById("discountResult").innerText.replace(/^=\s*/, ""), event.currentTarget));

  document.getElementById("calcBaseBtn").addEventListener("click", updateBaseLive);
  document.getElementById("resetBaseBtn").addEventListener("click", () => resetFields(["baseX", "baseY"], "baseResult", updateBaseLive));
  document.getElementById("copyBaseBtn").addEventListener("click", (event) => copyText(document.getElementById("baseResult").innerText.replace(/^=\s*/, ""), event.currentTarget));
}

// Each calculator owns its own inputs and live formula panel. Binding them in
// one place makes it easier to audit the full app behavior.
function bindLiveUpdates() {
  document.getElementById("changeOrig").addEventListener("input", updateChangeLive);
  document.getElementById("changeNew").addEventListener("input", updateChangeLive);

  document.getElementById("isWhatX").addEventListener("input", updatePercentLive);
  document.getElementById("isWhatY").addEventListener("input", updatePercentLive);

  document.getElementById("whatX").addEventListener("input", updateWhatLive);
  document.getElementById("whatY").addEventListener("input", updateWhatLive);

  document.getElementById("discountPrice").addEventListener("input", updateDiscountLive);
  document.getElementById("discountPercent").addEventListener("input", updateDiscountLive);

  document.getElementById("baseX").addEventListener("input", updateBaseLive);
  document.getElementById("baseY").addEventListener("input", updateBaseLive);
}

function bindEnterKeys() {
  attachEnterKey(["changeOrig", "changeNew"], updateChangeLive);
  attachEnterKey(["isWhatX", "isWhatY"], updatePercentLive);
  attachEnterKey(["whatX", "whatY"], updateWhatLive);
  attachEnterKey(["discountPrice", "discountPercent"], updateDiscountLive);
  attachEnterKey(["baseX", "baseY"], updateBaseLive);
}

function initialize() {
  bindControls();
  bindLiveUpdates();
  bindEnterKeys();

  updateChangeLive();
  updatePercentLive();
  updateWhatLive();
  updateDiscountLive();
  updateBaseLive();
  syncAppInfo();

  document.getElementById("changeOrig").focus();
}

initialize();
