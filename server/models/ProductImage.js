const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProductImage = mongoose.model('ProductImage', productImageSchema);
module.exports =  ProductImage;