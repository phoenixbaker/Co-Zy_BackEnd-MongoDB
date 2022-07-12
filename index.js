require("custom-env").env(".env");

// Make new backend

// make more paths --- understand the uses of push/get

// make better use of x-auth-token | watch mosh video

// Use img upload solution from here

// Make smarter push/get requests, with more small get requests to stop latency | asycnronous parallel requests

const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const busboy = require("connect-busboy");

// const conn = require("./database");
const upload = require("./routes/upload");
const users = require("./routes/users");
const messages = require("./routes/messages");
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const location = require("./routes/location");
const household = require("./routes/household");
// const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(busboy());
// app.use(fileUpload());

app.use("/api/img", upload);
app.use("/api/my/notes", notes);
app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/auth", auth);
app.use("/api/location", location);
app.use("/api/household", household);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on Port " + port));
