const mongoose = require("mongoose");
const Trips = require("../models/trips");
const dbName = "project";
mongoose.connect(`mongodb://localhost/${dbName}`);

const trips = [
  {
    destination: "Portugal",
    city: "Lisbon",
    days: 5,
    people: ["Alex", "Ana"],
    route: ["Bairo Alto", "Alfama"]
  },
  {
    destination: "Spain",
    city: "Barcelona",
    days: 6,
    people: "Gustavo",
    route: ["Park Guell", "Sagrada Familia"]
  },
  {
    destination: "Inglaterra",
    city: "London",
    days: 3,
    people: "",
    route: ["Big Ben", "Ponte de Londres", "London Eye"]
  },
  {
    destination: "Italy",
    city: "Rome",
    days: 6,
    people: ["John", "Alex"],
    route: ["Colosseum", "Roman Forum"]
  }
];

Trips.create(trips, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${trips.length} trips`);
  mongoose.connection.close();
});
