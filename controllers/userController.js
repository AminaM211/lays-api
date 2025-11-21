import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};
