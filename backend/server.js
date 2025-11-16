import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js"; 
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


/** This is the Middleware**/
// Configure CORS to allow requests from your frontend
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000', // Alternative local port
  process.env.FRONTEND_URL, // Production frontend URL (set in Vercel env vars)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

/**Supabase client**/
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**The Test route function**/
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

/**Mount Routes**/
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

/**This function starts the server**/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

