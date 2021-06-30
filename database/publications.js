const mongoose = require("mongoose");

//publication schema
const PublicationSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});

const PublicationModel = mongoose.model("publications", PublicationSchema);
//publication model
module.exports = PublicationModel;
