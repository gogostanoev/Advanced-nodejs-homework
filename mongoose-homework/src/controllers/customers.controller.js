import CustomerModel from "../models/customers.model.js";

const customerModel = new CustomerModel();


class CustomerController {
    async getAllCustomers(req, res){

        try {
            const customers = await customerModel.getAllCustomers();
            res.send(customers);
        } catch (error) {
            res.status(404).send({message: error.message});
        };
    };


    async getCustomerById(req, res){
        
        const customerId = req.params.id;

        try {
            const customer = await customerModel.getCustomerById(customerId);
            res.send(customer);
        } catch (error) {
            res.status(404).send({message: "The desired user does not exist."});
        };
    };

     
    async createCustomer(req, res){

        const {name, email, phone, address} = req.body

        try {
            const customerData = {
                name: name,
                email: email,
                phone: phone,
                address: address 
            };

            await customerModel.createCustomer(customerData);
            res.status(201).send({message: "New user was created."});
        } catch (error) {
            res.status(404).send({message: "There was an error in creating the user."});
        };
    };


    async updateCustomer(req, res){

        const customerId = req.params.id;
        const {name, email, phone, address} = req.body;

        try {
            const customerData = {
                name: name,
                email: email,
                phone: phone,
                address: address
            };

            await customerModel.updateCustomer(customerId, customerData);
            res.status(201).send({message: `The desired user: ${customerId} was successfully updated.`});
        } catch (error) {
            res.status(404).send({message: "Could not update the desired user."})
        };
    };


    async deleteCustomer(req, res){
        
        try {
            const customerId = req.params.id;
            await customerModel.deleteCustomer(customerId);
            res.send({message: `The desired user with id: ${customerId} was deleted`});
        } catch (error) {
            res.status(404).send({message: "The desired user you wish to delete does not exist."});
        }
    }
};


export default CustomerController;