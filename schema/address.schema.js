const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");

const addressSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  fulladdress: {
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

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address };
