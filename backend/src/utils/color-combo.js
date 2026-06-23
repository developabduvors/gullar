// Ranglar massividan avtomatik "Mix" filtr tagini yasaydi.
// Masalan: ['red','blue','green'] -> tag: "blue-green-red", label: "Ko'k-Qizil-Yashil (Mix)"

const COLOR_LABELS = {
  red: 'Qizil', blue: "Ko'k", green: 'Yashil', white: 'Oq',
  pink: 'Pushti', yellow: 'Sariq', purple: 'Binafsha', orange: 'To\'q sariq',
};

function labelFor(color) {
  return COLOR_LABELS[color] || color;
}

// Bir gulning ranglaridan tag + label qaytaradi (tartiblangan -> bir xil kombinatsiya bir xil tag)
function buildCombo(colors = []) {
  const clean = [...new Set(colors.map((c) => String(c).toLowerCase().trim()).filter(Boolean))].sort();
  if (clean.length === 0) return null;

  const tag = clean.join('-');
  const label = clean.map(labelFor).join('-') + (clean.length > 1 ? ' (Mix)' : '');
  return { tag, label, colors: clean };
}

module.exports = { buildCombo, labelFor };
