import mongoose from "mongoose";

const userCollection ='Users'
const userSchema = new mongoose.Schema({
    first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	age: Number,
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "user",
		required: true,
	},
})
const userModel= mongoose.model(userCollection,userSchema)
export default userModel;