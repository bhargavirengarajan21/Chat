const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../config/generateToken");

//@description Get or Search all users
//@route Get /api/user?search=
//@acces Publid


const allUsers = asyncHandler( async(req, res) => {
  console.log(req.query.search);
  const keyword = req.query.search ?
    {
      $or: [
        { name: { $regex: req.query.search, $options: "i"} },
        { email: { $regex: req.query.search, $options: "i"}},
      ],
    } : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id}});
  res.send(users);
});

//@description Get particular user
//@router Get /api/user?id=
//@access Public

const findUser = asyncHandler( async(req,res) => {
  const { email, password } = req.query;
  console.log(req.query);

  const user = await User.findOne({ email });
 
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401);
  }
});

//@description  Post user
//@router Post /api/user
//@access Public

const registerUser = asyncHandler( async(req,res) => {
  const {email,name,password,pic} = req.body;
  if(!name || !email || !password) {
    res.send(404);
    throw new Error("Please Fill all the fields");
  }

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400).statusMessage("user alreeady exists");
  }

  const newUser = new User(req.body);

  const user = await newUser.save(
    {
      email,name,password,pic, isAdmin: true,
    }
  );

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    })
  }
});

module.exports = {allUsers, registerUser , findUser}