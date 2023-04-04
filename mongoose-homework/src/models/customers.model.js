import mongoose from "mongoose";
import customerSchema from "../mongo_schemas/customers.schema.js";


class CustomerModel {
    mongo_model;

    constructor(){
        this.mongo_model = mongoose.model("Customer", customerSchema);
    };


    async getAllCustomers(){
        const customer = await this.mongo_model.find()

        return customer;
    };

    
    async getCustomerById(customerId){
        const customer = await this.mongo_model.findById(customerId);

        return customer;
    };


    async createCustomer(customerData){
        const customer = await this.mongo_model(customerData);

        await customer.save();
    };


    async updateCustomer(customerId, customerData){
        const customer = await this.mongo_model.findById(customerId);

        if(!customer){
            throw new Error(`The user with id: ${customerId} does not exist.`);
        };

        await this.mongo_model.updateOne({ _id: customerId }, {
            name: customerData.name || customer.name,
            email: customerData.email || customer.email,
            phone: customerData.phone || customer.phone,
            address: customerData.address || customer.address  
        })
    };


    async deleteCustomer(customerId){
        await this.mongo_model.deleteOne({ _id: customerId });
    };
};


export default CustomerModel;