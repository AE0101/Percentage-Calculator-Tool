export function formatDecimal(value) {
  if (value === undefined || value === null || Number.isNaN(value)) return "?";
  const rounded = Math.round(value * 100) / 100;
  return rounded.toFixed(2);
}

export function calculatePercentageChange(originalValue, newValue) {
  if (originalValue === 0) {
    return {
      ok: false,
      error: "Original value cannot be zero"
    };
  }

  const value = ((newValue - originalValue) / originalValue) * 100;
  const absValue = Math.abs(value);

  if (value > 0) {
    return {
      ok: true,
      value,
      label: `${formatDecimal(absValue)}% increase`
    };
  }

  if (value < 0) {
    return {
      ok: true,
      value,
      label: `${formatDecimal(absValue)}% decrease`
    };
  }

  return {
    ok: true,
    value,
    label: "0.00% no change"
  };
}

export function calculatePercentageOfTotal(part, total) {
  if (total === 0) {
    return {
      ok: false,
      error: "Total cannot be zero"
    };
  }

  const value = (part / total) * 100;

  return {
    ok: true,
    value,
    label: `${formatDecimal(value)}%`
  };
}

export function calculatePercentagePortion(percent, number) {
  const value = (percent / 100) * number;

  return {
    ok: true,
    value,
    label: formatDecimal(value)
  };
}

export function calculateDiscount(price, discountPercent) {
  const saved = price * (discountPercent / 100);
  const finalPrice = price - saved;
  const finalText = formatDecimal(finalPrice);
  const savedText = formatDecimal(saved);

  return {
    ok: true,
    finalPrice,
    saved,
    label: `Final: ${finalText}<br>Saved: ${savedText}`,
    copyText: `Final: ${finalText}\nSaved: ${savedText}`
  };
}

export function calculateOriginalValue(value, percent) {
  if (percent === 0) {
    return {
      ok: false,
      error: "Percent cannot be zero"
    };
  }

  const originalValue = value / (percent / 100);

  return {
    ok: true,
    value: originalValue,
    label: formatDecimal(originalValue)
  };
}
