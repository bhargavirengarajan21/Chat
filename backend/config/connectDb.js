const mongoose = require("mongoose");
const {config} = require('./local');

const connectDb = async() => {
  try {
      const conDb = await mongoose.connect(config.MongoDB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Mongo Db connected: ${conDb.connection.host}`);

  } catch(error) {
    console.log(`Error ${error.message}`);
    process.exit();
  }
}

module.exports = connectDb;