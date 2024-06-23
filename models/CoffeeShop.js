const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['coffee', 'food', 'drinks'], required: true },
});

const CoffeeShopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  products: [ProductSchema],
  favorite: { type: Boolean, default: false },
});

module.exports = mongoose.model('CoffeeShop', CoffeeShopSchema);
