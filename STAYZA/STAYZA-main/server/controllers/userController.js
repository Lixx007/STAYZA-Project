import User from "../models/userModel.js"; // assuming you have a User mongoose model

// Get User Data | /api/user |
export const getUserData = async (req, res) => {
  try {
    // req.user is set in jwtMiddleware (decoded token payload)
    const userId = req.user.id;

    // Fetch user from DB
    const user = await User.findById(userId).select("role recentSearchedCities");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      role: user.role,
      recentSearchedCities: user.recentSearchedCities,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Store recent searched cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCities } = req.body;
    const userId = req.user.id;

    // Fetch user from DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Manage up to 3 recent cities
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCities);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCities);
    }

    await user.save();
    res.json({ success: true, message: "City Added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
