// Hamyon biznes mantiqi. req/res YO'Q.
const ApiError = require('../utils/ApiError');
const store = require('./wallet.store');

function getBalance(userId) {
  return store.get(userId).balance;
}

// Pul qo'shish (keshbek, qaytarish...)
function credit(userId, amount, reason) {
  const amt = Math.round(Number(amount));
  if (!(amt > 0)) throw new ApiError(400, "Summa noto'g'ri");
  return store.apply(userId, amt, 'credit', reason);
}

// Pul yechish — balansdan oshib ketmaydi (manfiy balansga yo'l qo'yilmaydi)
function debit(userId, amount, reason) {
  const amt = Math.round(Number(amount));
  if (!(amt > 0)) throw new ApiError(400, "Summa noto'g'ri");
  const w = store.get(userId);
  if (w.balance < amt) throw new ApiError(400, "Hamyonda mablag' yetarli emas");
  return store.apply(userId, -amt, 'debit', reason);
}

// Balans + harakatlar tarixi
function history(userId) {
  const w = store.get(userId);
  return { balance: w.balance, transactions: w.transactions };
}

module.exports = { getBalance, credit, debit, history };
