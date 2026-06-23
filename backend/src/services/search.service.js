// Tezkor qidiruv — yengil natija (rasm + narx). Flowers store'dan o'qiydi.
const flowerStore = require('./flower.store');

// Yengil ko'rinish: dropdown uchun kerakli maydonlargina
function toLight(f) {
  return {
    id: f.id,
    name: f.name,
    price: f.price,
    discountPrice: f.discountPrice,
    image: f.images && f.images[0] ? f.images[0] : null,
  };
}

// ?q=atir -> nom ichidan qidiradi (registr farqsiz), arxivlangani chiqmaydi
function search(q, limit = 8) {
  const term = String(q || '').toLowerCase().trim();
  if (!term) return [];

  return flowerStore
    .all()
    .filter((f) => !f.archived && f.name.toLowerCase().includes(term))
    .slice(0, limit)
    .map(toLight);
}

module.exports = { search };
