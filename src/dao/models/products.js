import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const productModel = mongoose.model(productCollection, productSchema);
export default productModel;
