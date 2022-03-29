const config = require("config");

const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const app = express();
const users = require("./routes/users");
const messages = require("./routes/messages");
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const location = require("./routes/location");
const household = require("./routes/household");

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwt ket is not defined");
//   process.exit(1);
// }

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());

app.use("/api/my/notes", notes);
app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/auth", auth);
app.use("/api/location", location);
app.use("/api/household", household);

mongoose
  .connect(
    "mongodb+srv://phoenixbaker:Disruckto2@cluster0.ssjzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to DataBase"))
  .catch(() => console.log("didnt connect to DB"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on Port " + port));
