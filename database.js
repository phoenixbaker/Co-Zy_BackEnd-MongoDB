const mongoose = require("mongoose");

mongoose.connect(process.env.url);

const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("Database connected successfully");
});
conn.on("disconnected", () => {
  console.log("Database disconnected successfully");
});

module.exports = conn;
