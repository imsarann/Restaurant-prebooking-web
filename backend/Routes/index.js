const upload  = require("../upload")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod")
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware")
const fs = require('fs');
const { User, HotelDetails, Top5res, Top5food, FoodDetails, Order } = require("../database/index");

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  const existinguser = await User.findOne({
    email: req.body.email,
  });
  if (existinguser) {
    return res.status(411).json({
      message: "Email already exist",
    });
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  const userId = user._id;
  try{
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: "user created successfully",
      token: token,
    });
  }catch(err){
    console.log(err)
  }
  
});

const signinbody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
router.post("/signin", async (req, res) => {
  const { success } = signinbody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      message: "user signed in",
      token: token,
    });
  }
  return res.status(411).json({
    message: "error while log in",
  });
});


router.post("/upload-image", upload.single("image"), async (req, res) => {
  // console.log(req.file);
  // console.log("Location:", req.file.location);
  // console.log(req.body);
  // const location = req.file.location;
  // const name = req.body.name;
  // const address = req.body.address
  // const hotel = await HotelDetails.create({
  //   hotelImage : location,
  //   hotelName : name,
  //   hotelAddress : address
  // }) 
  // console.log(hotel)
  // res.send("success");
  const location = req.file.location;
  fs.appendFile('data.txt', "Hotel 1" + location + '\n', (err) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    } else {
        res.status(200).send('Data saved successfully');
    }
}); 
});

router.get("/get-image", async (req, res)=>{
      console.log("hello")
      const images = await HotelDetails.find({})
      if (!images) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json(images)
      console.log(images)
})
router.get("/topres", async(req, res)=>{
  console.log("hitting topres")
  try{
    console.log("entering try")
    const images = await Top5res.find({});
    console.log("after fetching try")
    console.log("after fetching from database", images)
    res.json(images)
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Server Error", error: err });
  }
})
router.get("/topfood", async(req, res)=>{
  try{  
      console.log("entering try")
      const food = await Top5food.find({});
      console.log("after fetching try")
      console.log("food",food)
      res.json(food)
  }catch(err){
    console.log(err)
  }
})

router.get("/getfood", async(req,res) => { 
  const foodId = req.query.foodId;
  const respose = await FoodDetails.find({hotelId : foodId})
  res.json(respose)
})
router.post("/book", async(req, res)=>{
  const data = req.body;
  const response = await Order.create(data)
  res.json()
})
module.exports = router;
