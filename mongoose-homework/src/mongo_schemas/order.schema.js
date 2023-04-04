import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    order_date: {
        type: String
    },

    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    ]
});

export default orderSchema;