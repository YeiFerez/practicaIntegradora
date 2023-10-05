import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: Number,
    }
  ]
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export default cartModel;
