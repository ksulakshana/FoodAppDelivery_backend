const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");

const paymentMethodSchema = new Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
  cvc: {
    type: Number,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  isdefault: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = { PaymentMethod };
