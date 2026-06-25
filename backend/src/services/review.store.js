// Sharhlar — id -> review. KEYIN PostgreSQL ga ko'chadi.
const reviews = new Map();
let nextId = 1;

function insert(data) {
  const review = { id: nextId++, createdAt: new Date().toISOString(), ...data };
  reviews.set(review.id, review);
  return review;
}

function findById(id) {
  return reviews.get(Number(id)) || null;
}

// Bitta gulning sharhlari (ixtiyoriy status filtri bilan)
function byFlower(flowerId, status) {
  return [...reviews.values()]
    .filter((r) => r.flowerId === Number(flowerId) && (!status || r.status === status))
    .sort((a, b) => b.id - a.id);
}

// Foydalanuvchi shu gulga avval sharh qoldirganmi?
function findByUserAndFlower(userId, flowerId) {
  return [...reviews.values()].find((r) => r.userId === userId && r.flowerId === Number(flowerId)) || null;
}

// Moderatsiya ro'yxati (ixtiyoriy status filtri bilan)
function all(status) {
  return [...reviews.values()]
    .filter((r) => !status || r.status === status)
    .sort((a, b) => b.id - a.id);
}

function update(id, data) {
  const review = findById(id);
  if (!review) return null;
  Object.assign(review, data);
  return review;
}

module.exports = { insert, findById, byFlower, findByUserAndFlower, all, update };
