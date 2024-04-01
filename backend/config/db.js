const mongoose = require('mongoose');
const MONGODB_URI = process.env.mongoDb;


mongoose.set("strictQuery", "false")
module.exports.connectDB = () => main().catch(err => {
  console.log(err)
});

async function main() {
  await mongoose.connect(MONGODB_URI);
}