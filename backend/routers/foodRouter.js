import express from "express";
const foodRouter = express.Router();

foodRouter.post("/foodData", (req, res) => {
  try {
    res.json({ foodItems: global.foodItems, foodCategory: global.foodCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

export default foodRouter;
