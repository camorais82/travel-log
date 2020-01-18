const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  destination: String,
  city: String,
  days: Number,
  people: Array,
  route: Array,
  imgName: String,
  imgPath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});
var Trips = mongoose.model("Trips", tripSchema);

module.exports = Trips;
