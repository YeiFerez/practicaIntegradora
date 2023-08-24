import mongoose from "mongoose";

const adminCollection = 'admin';

const adminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "admin",
	},
});

const adminModel = mongoose.model(adminCollection, adminSchema);
export default adminModel;
