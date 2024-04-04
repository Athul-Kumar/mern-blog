import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  )
    next(errorHandler(400, "All fields are required !!!"));

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = await User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("singed up successfully!!!");
  } catch (error) {
    next(error)
  }
};
