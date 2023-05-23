import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const productCollection = 'products';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        unique: true
    }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
