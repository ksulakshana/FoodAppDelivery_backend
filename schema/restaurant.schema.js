const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  imageuri: {
    type: String,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = { Restaurant };
