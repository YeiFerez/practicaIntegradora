import mongoose from 'mongoose';

const ticketCollection = 'Tickets';

const ticketSchema = new mongoose.Schema({
  code: {
		type: String,
		unique: true,
	},
  purchase_datetime: String,
  purchase_products: Array,
  amount: Number,
  purchaser: Object,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;



