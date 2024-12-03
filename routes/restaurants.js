const express = require("express");
const { Restaurant } = require("../schema/restaurant.schema");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, location, imageuri } = req.body;

    const restaurant = new Restaurant({
      name,
      location,
      imageuri,
    });

    await restaurant.save();
    res.status(200).json({ message: "Restaurant created successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Restaurant not created" });
  }
});

/************get 1 address ********************/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************get tasks w.r.t createdBy User********** */
router.get("/", async (req, res) => {
  try {
    const restaurant = await Restaurant.find();

    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
