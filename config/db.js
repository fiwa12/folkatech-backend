const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost:27017/folkatech-backend", {
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

