const pool = require("./../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, role]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag if in production
      sameSite: "Lax",
    });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};
// -------
exports.getUser = async (req, res) => {
  try {
    const userid = req.user.id;

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userid]);
    
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

