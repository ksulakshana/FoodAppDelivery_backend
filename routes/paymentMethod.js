const express = require("express");
const authMiddleware = require("../middleware/auth");
const { User } = require("../schema/user.schema");
const { PaymentMethod } = require("../schema/paymentMethods.schema");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { cardNumber, expiration, cvc, nameOnCard } = req.body;
    const { user } = req;

    const pm = new PaymentMethod({
      cardNumber,
      expiration,
      cvc,
      nameOnCard,
      userId: user,
    });

    await pm.save();
    res.status(200).json({ message: "Payment Method created successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Payment Method not created" });
  }
});

/************get 1 address ********************/
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pm = await PaymentMethod.findById(id);
    if (!pm) {
      return res.status(404).json({ message: "Payment Method not found" });
    }
    res.status(200).json(pm);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************get tasks w.r.t createdBy User********** */
router.get("/", authMiddleware, async (req, res) => {
  try {
    let { user } = req;
    const userdata = await User.findById(user).select(`_id`);
    const pm = await PaymentMethod.find({
      $or: [
        {
          userId: userdata._id,
        },
      ],
    });
    if (!pm) {
      return res.status(404).json({ message: "Payment Method not found" });
    }
    res.status(200).json(pm);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************update tasks - status********** */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    let pm = await PaymentMethod.findById(id);

    if (!pm) {
      return res.status(404).json({ message: "Payment Method not found" });
    }

    pm = await PaymentMethod.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(pm);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*******************delete task********* */
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const pm = await PaymentMethod.findById(id);
  if (!pm) {
    return res.status(404).json({ message: "Payment Method not found" });
  }
  await PaymentMethod.findByIdAndDelete(id);
  res.status(200).json({ message: "Payment Method deleted successfully" });
});

module.exports = router;
