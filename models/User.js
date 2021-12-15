const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    basket: [{type: Types.ObjectId, ref: 'Product'}],
    washlist: [{type: Types.ObjectId, ref: 'Product'}]
})

module.exports = model('User', schema);

// tabnine - плагин автокомплита