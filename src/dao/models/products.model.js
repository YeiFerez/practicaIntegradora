import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
  name:  String,
  description: String,
  code: {
		type: String,
		unique: true,
	},
  price: Number,
  status: {
		type: Boolean,
		default: true,
		unique: false,
	},
  stock: Number,
  category: String,
  owner: {
		type: String,
		default: 'adminDan@gmail.com',
	},
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);
export default productModel;
