import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const TagSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Define the DaySchema for the timetable
const DaySchema = new mongoose.Schema({
    open: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    }
});

const TimetableSchema = new mongoose.Schema({
    Monday: DaySchema,
    Tuesday: DaySchema,
    Wednesday: DaySchema,
    Thursday: DaySchema,
    Friday: DaySchema,
    Saturday: DaySchema,
    Sunday: DaySchema
});

const RestaurantSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: [true, "Insert restaurant name"]
    },
    city_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    timetable: TimetableSchema,
    comments: [CommentSchema],
    tags: [TagSchema]
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
