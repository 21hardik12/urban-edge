const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
require('dotenv').config()

const db = mongoose.connection;
const rawData = fs.readFileSync('./dataset1.json');
const data = JSON.parse(rawData);

function parseProductDetailsString(str) {
  const productDetails = {};
  const keyValuePairs = str.split('\n\n\n');

  for (const pair of keyValuePairs) {
    const [key, value] = pair.split('\n\u200f\n:\n\u200e\n\n');

    if (key && value) {
      productDetails[key] = value.trim();
    }
  }

  return productDetails;
}

(async () => {
  try {
    await mongoose.connect(process.env.mongoDb);
    console.log('Connected to MongoDB');

    const entryToInsert = data[0];
    const features = entryToInsert.features.map(feature => {
      const [name, value] = Object.entries(feature)[0];
      return { name, value };
    });  

    const product = new Product({
      url: entryToInsert.url,
      title: entryToInsert.title,
      asin: entryToInsert.asin,
      price: entryToInsert.price,
      brand: entryToInsert.brand,
      product_details: entryToInsert.product_details,
      breadcrumbs: entryToInsert.breadcrumbs,
      images_list: entryToInsert.images_list,
      features: features
    });

    await product.save();
    console.log('Product saved to database');
  
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
})();



// const mongoose = require('mongoose');
// const Product = require('./models/Product');
// const fs = require('fs');
// require('dotenv').config()
// console.log(process.env.mongoDb);

// const db = mongoose.connection;

// const rawData = fs.readFileSync('./dataset.json');
// const data = JSON.parse(rawData);
// const entryToInsert = data[0];
// // Parse features

// function parseProductDetailsString(str) {
//   const productDetails = {};

//   const keyValuePairs = str.split('\n\n\n');

//   for (const pair of keyValuePairs) {
//     const [key, value] = pair.split('\n\u200f\n:\n\u200e\n\n');

//     if (key && value) {
//       productDetails[key] = value.trim();
//     }
//   }

//   return productDetails;
// }

// (async () => {
//   await mongoose.connect(process.env.mongoDb);
  
//   await entryToInsert.forEach((entry) => {
//     const features = entryToInsert.features.map(feature => {
//       const [name, value] = Object.entries(feature)[0];
//       return { name, value };
//     });
//     const productDetails = parseProductDetailsString(entry.product_details);
//     const product = new Product({
//       url: entry.url,
//       title: entry.title,
//       asin: entry.asin,
//       price: entry.price,
//       brand: entry.brand,
//       product_details: productDetails,
//       breadcrumbs: entry.breadcrumbs,
//       images_list: entry.images_list,
//       features: features
//     });    
//     product.save()
//     .then(() => console.log('product saved to database'))
//     .catch(err => console.error('Error saving product to database: ', err));
//   });
// })().catch(err => console.log(err));
