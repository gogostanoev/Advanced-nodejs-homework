import { Router } from "express";
import CustomerController from "../controllers/customers.controller.js";

const customerController = new CustomerController();
const customerRouter = Router();

// GET ALL CUSTOMERS
customerRouter.get("/", customerController.getAllCustomers);

// GET CUSTOMER BY ID
customerRouter.get("/:id", customerController.getCustomerById);

// CREATE NEW USER(CUSTOMER)
customerRouter.post("/", customerController.createCustomer);

// UPDATE DESIRED USER(CUSTOMER)
customerRouter.patch("/:id", customerController.updateCustomer);

// DELETE DESIRED USER(CUSTOMER)
customerRouter.delete("/:id", customerController.deleteCustomer);


export default customerRouter;