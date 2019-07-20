import mongoose from 'mongoose';

// define the schema for our user model
const foodSchema = new mongoose.Schema({
    nameOfFood: { type: String, required: true },
    typeOfFood: {
        type: String,
        enum : ['soup','swallow', 'extras'],
        required: true
    },
    availability: { type: Boolean, default: false },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Food = mongoose.model('Food', foodSchema);
export default Food;