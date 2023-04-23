import { Order } from "src/interfaces/order.interface";


export const ordersObj: Order[] = [
    {id: "1", orderDate: new Date(), productsOrdered: [{
        id: "drinkOne",
        productName: "Pepsi",
        productPrice: 70
    }]},

    {id: "2", orderDate: new Date(), productsOrdered: [{
        id: "foodOne",
        productName: "Mimoza salad",
        productPrice: 200
    }]},

    {id: "3", orderDate: new Date(), productsOrdered: [{
        id: "foodTwo",
        productName: "Chicken soup",
        productPrice: 210
    }]},
    
    {id: "4", orderDate: new Date(), productsOrdered: [{
        id: "foodThree",
        productName: "Tres leches cake",
        productPrice: 180
    }]}
]