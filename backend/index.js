const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { authenticate } = require("./middlewares/authenticate");
const {connection} = require("./config/db")
const {userRouter}= require("./routes/userRoutes");
const {usermodel}= require("./models/usermodel")

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// Define Schema and Model


// Routes

app.get("/", (req,res)=>{
    res.send("home page")
});
app.use("/user",userRouter);

app.use(authenticate);
app.get("/api/get-items", async (req, res) => {
  try {
      const {userid}= req.body;
    const items = await usermodel.findById({_id:userid});
    res.json(items.content[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

app.post("/api/save-item", async (req, res) => {
  try {

    const {userid,items}= req.body;
    const Item = await usermodel.findById({_id:userid});
    console.log(Item)
    Item.content[0]=items;
    console.log(Item)
     const val= await usermodel.findByIdAndUpdate({_id:userid},{content:Item.content})
    res.status(201).json({"msg":"Chat saved successfully"});
  } catch (error) {
    res.status(500).json({ msg: "Error saving item", error });
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
