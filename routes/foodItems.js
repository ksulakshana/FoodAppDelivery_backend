const express = require("express");
const { FoodItems } = require("../schema/foodItems.schema");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, category } = req.body;

    const foodItem = new FoodItems({
      name,
      category,
    });

    await foodItem.save();
    res.status(200).json({ message: "foodItem created successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "foodItem not created" });
  }
});

/************get 1 address ********************/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItems.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "foodItem not found" });
    }
    res.status(200).json(foodItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************get tasks w.r.t createdBy User********** */
router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodItems.find();

    if (!foodItems) {
      return res.status(404).json({ message: "FoodItems not found" });
    }
    res.status(200).json(foodItems);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
