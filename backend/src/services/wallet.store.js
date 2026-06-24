// Keshbek hamyoni — userId -> { balance, transactions[] }. KEYIN DB (wallet + ledger) ga ko'chadi.
const byUser = new Map();

// Hamyonni oladi, bo'lmasa nol balans bilan ochadi
function get(userId) {
  if (!byUser.has(userId)) byUser.set(userId, { balance: 0, transactions: [] });
  return byUser.get(userId);
}

// Bitta atomik o'zgartirish: balansni o'zgartiradi va tarixga yozadi.
// delta > 0 -> kirim (credit), delta < 0 -> chiqim (debit)
function apply(userId, delta, type, reason) {
  const w = get(userId);
  w.balance += delta;
  w.transactions.unshift({
    type,                          // 'credit' | 'debit'
    amount: Math.abs(delta),
    reason: reason || '',
    balanceAfter: w.balance,
    at: new Date().toISOString(),
  });
  return w.balance;
}

module.exports = { get, apply };
