import OrdersModel from "../models/order.model.js";

const orderModel = new OrdersModel();

class OrdersController {
    async getAllOrder(req, res){
        const orders = await orderModel.getAllOrder();

        res.send(orders);
    };

    async getOrderById(req, res){
        const orderId = req.params.id;

        const order = await orderModel.getOrderById(orderId);

        res.send(order)
    }

    async addOrder(req, res){
        const { productIds, customerId } = req.body;

        const orderData = {
            order_date: new Date().toLocaleDateString(),
            customer_id: customerId,
            items: productIds
        }

        await orderModel.addOrder(orderData);

        res.status(201).send({message: "Order was created"})
    }

    async deleteOrder(req, res){
        const orderId = req.params.id;

        await orderModel.deleteOrder(orderId);

        res.send({message: `Order with id: ${orderId} was deleted`})
    }
}

export default OrdersController