import mongoose from "mongoose";

const userCollection ='Users'
const userSchema = new mongoose.Schema({
    first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
	},
	age: Number,
	password: String,
	role: {
		type: String,
		default: "user",
	},
	documents: [
        {
            name: String,
            reference: String,
        }
    ],
	last_connection: Date,
})
const userModel= mongoose.model(userCollection,userSchema)
export default userModel;