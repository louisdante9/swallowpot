import mongoose from 'mongoose';

// define the schema for our user model
const foodSchema = new mongoose.Schema({
    nameOfFood: { type: String, required: true, unique: true },
    typeOfFood: { type: String, required: true },
    availability: { type: Boolean, required: true, default: false },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Food = mongoose.model('Food', foodSchema);
export default Food;