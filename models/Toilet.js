// models/toilet.js
import mongoose from 'mongoose';

const toiletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    universal: { type: Boolean, required: true },
    comments: { type: String } 
});

const Toilet = mongoose.model('Toilet', toiletSchema);

export default Toilet;
