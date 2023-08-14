const mongoose= require("mongoose")

const dbURI = "mongodb+srv://akash:shukla@cluster0.zvutwxw.mongodb.net/";
const connection= mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports={
    connection
}