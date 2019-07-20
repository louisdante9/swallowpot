import mongoose from 'mongoose';

// define the schema for the order model
const orderSchema = new mongoose.Schema({
    order: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Order = mongoose.model('Order', orderSchema);
export default Order;