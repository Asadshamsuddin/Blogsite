// CONNETCTING WITH DATA BASE 

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/blogsite');
  console.log('we are connected With Database')};

  // MONGOOSE SCHEMA
const collectionSchema = new mongoose.Schema({
     name: String,
     email: String,
     password: String,
     address: String,
     age: Number,

   });

 const collection = mongoose.model('blogdata' , collectionSchema);
module.exports = collection ;