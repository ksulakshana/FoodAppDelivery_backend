const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: true }));
dotenv.config();

const PORT = process.env.PORT;

const userRoutes = require("./routes/user.js");
const addressRoutes = require("./routes/address.js");
const foodItemRoutes = require("./routes/foodItems.js");
const pmRoutes = require("./routes/paymentMethod.js");
const restaurantRoutes = require("./routes/restaurants.js");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/foodItems", foodItemRoutes);
app.use("/api/v1/paymentMethods", pmRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose.connect(process.env.MONGOOSE_URI_STRING);
  mongoose.connection.on("connected", () => {
    console.log("connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
});
