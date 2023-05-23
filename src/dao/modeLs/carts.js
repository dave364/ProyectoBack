import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
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
    },

})

export const cartModel = mongoose.model(cartCollection, cartSchema)