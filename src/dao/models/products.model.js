import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
		type: String,
		unique: true,
	},
  price: {
    type: Number,
    required: true
  },
  status: {
		type: Boolean,
		default: true,
		unique: false,
	},
  stock: Number,
  category: {
    type: String,
    required: true
  }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);
export default productModel;
