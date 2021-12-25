const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://delightStudio:machoAirline999@project-beta.uzn9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
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
  })

module.exports = mongoose.model("User", UserSchema);