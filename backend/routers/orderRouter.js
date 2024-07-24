import express from "express";
import { orderData } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("orderdata", orderData);

export default orderRouter;
