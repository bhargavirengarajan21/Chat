const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {type: "String", required: true, index: {unique: true}},
  email: {type: "String", require: true},
  password: {type: "String", required: true},
  pic: {
    type: "String",
    required: true,
    default: ""
  },
  isAdmin: {
    type: "Boolean",
    required: true,
    default: false,
  },
},{timestamp: true});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function (next) {
  if(!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User= mongoose.model("User", userSchema);
module.exports = User;