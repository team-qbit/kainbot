const mongoose = require("mongoose");
require('dotenv').config();
const password = process.env.DB_PASSWORD;

mongoose
  .connect("mongodb+srv://delightStudio:" + password + "@project-beta.uzn9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

  const UserSchema = new mongoose.Schema({
      userId: Number,
      heart: Number,
      gold: Number,
      diamond: Number,
      highestStage: Number,
      team: Object,
      item: Object,
      owningCharacters: Array,
      piece: Number
  })

module.exports = mongoose.model("User", UserSchema);