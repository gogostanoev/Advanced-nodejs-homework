// Create one more customer collection, using the flow and implementation as the rest of the code. Implement the CRUD operations to get all customers, get customer by id, delete customer, and update customer.
// REQUIREMENTS:
// Using the MVC pattern, mongoose schemas, and mongoose model create one more collection Customer;
// The customer object should have the following props (name: string, email:string, phone:string, address: string); BONUS: Make the adress property to be object that contains the following properties (street, city, country, zip);
// The Order schema should have one more property customer_id which refers to the id of the customer object(the customer who created this order);
// When get all orders or get order by id route is requested, now it should return the fully information about the customer itself.
// BONUS:
// Add validation on the routes


import mongoose from "mongoose";

const { Schema } = mongoose;


const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: Number, required: true }
    }
})


export default customerSchema;