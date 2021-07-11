require('dotenv').config();
const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;


mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => { 
    console.log("SOMETHING IS NOT RIGHT..");
    console.log(err);
  });



module.exports = mongoose;

