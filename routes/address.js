const express = require("express");
const authMiddleware = require("../middleware/auth");
const { User } = require("../schema/user.schema");
const { Address } = require("../schema/address.schema");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { state, city, pincode, phoneNo, fulladdress } = req.body;
    const { user } = req;

    const address = new Address({
      state,
      city,
      pincode,
      phoneNo,
      fulladdress,
      userId: user,
    });

    await address.save();
    res.status(200).json({ message: "address created successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "address not created" });
  }
});

/************get 1 address ********************/
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************get tasks w.r.t createdBy User********** */
router.get("/", authMiddleware, async (req, res) => {
  try {
    let { user } = req;
    const userdata = await User.findById(user).select(`_id`);
    const address = await Address.find({
      $or: [
        {
          userId: userdata._id,
        },
      ],
    });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************update tasks - status********** */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    let address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address = await Address.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(address);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*******************delete task********* */
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const address = await Address.findById(id);
  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }
  await Address.findByIdAndDelete(id);
  res.status(200).json({ message: "Address deleted successfully" });
});

module.exports = router;
