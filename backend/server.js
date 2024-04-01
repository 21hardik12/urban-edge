const express = require('express');
require('dotenv').config();
const app = express();

// mongodb
const {connectDB} = require('./config/db')
connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello from the backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));