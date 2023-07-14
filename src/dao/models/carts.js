import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export default cartModel;
