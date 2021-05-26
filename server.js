const express = require("express");
const app = express();
const cors = require("cors");
// const lcm_result = require("./lcm");
const user = require('./src/user/user');
const lcm = require('./src/lcm/lcm');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
user.userRoutes(app);
lcm.lcmRoutes(app);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

// Find LCM for given number array
