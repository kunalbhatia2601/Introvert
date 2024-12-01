import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    venue: { type: String },
    datetime: { type: Date },
    category: { type: String },
    activities: { type: String },
    maxAttendees: { type: Number },
    aboutYou: { type: String },
    expectations: { type: String },
});

export default mongoose.model('events', eventSchema);