import mongoose from "mongoose";

export const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { 
    type: String, 
    required: true,
  },
  price: {
     type: Number, 
     required: true 
    },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);