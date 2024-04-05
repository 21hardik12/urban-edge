const express = require("express");
const session = require("express-session");
const app = express();
const passport = require("./config/passport");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// mongodb
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users',userRoutes);
app.get("/", (req, res) => {
  res.send("Hello from the backend");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
