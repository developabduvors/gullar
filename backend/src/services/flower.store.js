// Gullarni vaqtinchalik xotirada saqlash. KEYIN PostgreSQL ga ko'chadi.
const flowers = new Map(); // id -> flower
let nextId = 1;

function all() {
  return [...flowers.values()];
}

function findById(id) {
  return flowers.get(Number(id)) || null;
}

function insert(data) {
  const flower = {
    id: nextId++,
    archived: false,
    rating: 0,
    createdAt: new Date().toISOString(),
    ...data,
  };
  flowers.set(flower.id, flower);
  return flower;
}

function update(id, data) {
  const flower = findById(id);
  if (!flower) return null;
  Object.assign(flower, data);
  return flower;
}

module.exports = { all, findById, insert, update };
