
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'



// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, address } = req.body;

    console.log(req.body)

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({success:false, error: "Email already exist" });

    const newUser = await User.create({ name, email, phone, password, role, address });
    const token = generateToken(newUser);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body)
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({success:false, error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({success:false, error: "Invalid email or password" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", error: error.message });
  }
};

// Edit User
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({success:false, error: "User not found" });

    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        address: updatedUser.address
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Update failed", error: error.message });
  }
};

// Get User
export const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed", error: error.message });
  }
};
