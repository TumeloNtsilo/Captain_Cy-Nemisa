import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

/* The Register function */
router.post("/register", async (req, res) => {
  const { email, password, full_name, age, gender } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword, full_name, gender, age }]);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


/*The Login funxtion*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user)
    return res.status(400).json({ error: "User not found" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(400).json({ error: "Incorrect password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});


router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "Token is valid",
    user: req.user
  });
});


export default router;
