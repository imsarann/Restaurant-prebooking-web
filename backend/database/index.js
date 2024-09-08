
const mongoose = require("mongoose");

mongoose.connect("mongodb adress/Reservify", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const hotelSchema = new mongoose.Schema({
    hotelImage: String,
    hotelName: String,
    hotelAddress: String,
});
const top5Schema = new mongoose.Schema({
    hotelName: String,
    hotelAddress: String,
    hotelImage: String,
})
const top5foodSchema = new mongoose.Schema({
    hotelImage : String,
    hotelName : String,
    foodName : String
})

const foodSchema = new mongoose.Schema({
    hotelId : String,
    foodImage : String,
    foodPrice : String,
    foodName : String

}) 
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    numPeople: { type: String, required: true },
    foodOrder: [{ name: String, price: String }]
});

const Order = new mongoose.model("Order", orderSchema)
const User = mongoose.model("User", userSchema);
const HotelDetails = new mongoose.model("HotelDetails", hotelSchema);
const Top5res = new mongoose.model("Top5res", top5Schema)
const Top5food = new mongoose.model("Top5food", top5foodSchema)
const FoodDetails = new mongoose.model("FoodDetails", foodSchema)
module.exports ={
    HotelDetails,
    User,
    Top5res,
    Top5food,
    FoodDetails,
    Order
}