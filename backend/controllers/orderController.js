import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Order } from "../models/orderSchema.js";

export const orderData = catchAsyncError(async (req, res, next) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  const user = await Order.findOne({ email: req.body.email });
  if (!user) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({
          success: true,
        });
      });
    } catch (error) {
      console.log(error.message);
      res.sned(`Server error: ${error.message}`);
    }
  } else {
    try {
      await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } }).then(() => {
        res.json({
          success: true,
        });
      });
    } catch (error) {
      res.sned(`Server error: ${error.message}`);
    }
  }
});
