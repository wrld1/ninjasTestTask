const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  nickname: String,
  real_name: String,
  origin_description: String,
  superpowers: [String],
  catch_phrase: String,
  images: [String],
});

const Superhero = mongoose.model("Superhero", superheroSchema);

module.exports = Superhero;
