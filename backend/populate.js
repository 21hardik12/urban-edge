const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
require('dotenv').config()

// Helper function to parse nested objects
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

// Read the JSON file
const productsData = JSON.parse(fs.readFileSync('./dataset.json'));

// Get the first entry from the dataset
const entryToInsert = productsData[0];

// Clean the product_details object
const productDetails = parseProductDetailsString(entryToInsert.product_details);

console.log(productDetails);