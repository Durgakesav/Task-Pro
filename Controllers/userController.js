const { genSalt, hash, compare } = require('bcrypt');
const userSchema = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const create = async (req, res) => {
  const { email, password } = req.body;
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const newUser = new userSchema({ email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User created" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "No user found" });
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { userID: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, userID: user._id });
};


const getProfile = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    res.json({ profile: user.profilePic }); // Should be correct field
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { create, login,getProfile };
