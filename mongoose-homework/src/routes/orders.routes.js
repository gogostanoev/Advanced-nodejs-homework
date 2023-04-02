import { Router } from "express";
import OrdersController from "../controllers/orders.controller.js";

const ordersController = new OrdersController();

const orderRouter = Router();

// GET ORDERS
orderRouter.get("/", ordersController.getAllOrders);

// GET ORDER BY ID
orderRouter.get("/:id", ordersController.getOrderById);

// CREATE ORDER
orderRouter.post("/", ordersController.addOrder);

// REMOVE ORDER
orderRouter.delete("/", ordersController.deleteOrder);

export default orderRouter;