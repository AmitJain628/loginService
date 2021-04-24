"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookieParser = require('cookie-parser');

require('dotenv').config();

const app = (0, _express.default)();
app.use(cookieParser()); //app.use(cors(corsOptions));

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

const db = require("./models"); //db.sequelize.sync();


db.sequelize.sync().then(() => {
  console.log('Drop and Resync Database with');
}); // health check

app.get("/health", (req, res) => {
  res.sendStatus(200);
}); // routes

require('./routes/auth')(app);

require('./routes/country')(app); // set port, listen for requests


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});