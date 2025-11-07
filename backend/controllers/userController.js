const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, number, gender, address, bio } = req.body;

    // Check if a file was uploaded
    const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, number, gender, address, bio, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user data' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};