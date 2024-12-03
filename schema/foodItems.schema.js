const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  //   restaurant: {
  //     type: String,
  //     required: true,
  //   },
});

const FoodItems = mongoose.model("FoodItems", foodSchema);
module.exports = { FoodItems };
