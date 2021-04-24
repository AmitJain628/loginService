import express from "express";
import bodyParser from "body-parser";
var cookieParser = require('cookie-parser');
import cors from "cors";

require('dotenv').config();

const app = express();

app.use(cookieParser());
//app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

//db.sequelize.sync();
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Database with');
});

// health check
app.get("/health", (req, res) => {
  res.sendStatus(200);
});

// routes
require('./routes/auth')(app);
require('./routes/country')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
