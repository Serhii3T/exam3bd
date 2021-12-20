const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  titleProduct: { type: String},
  priceProduct: { type: Number},
  colorProduct: { type: String},
  imgNameProduct: { type: String},
  category: { type: String},
})

module.exports = model('Product', schema);