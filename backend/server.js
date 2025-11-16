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
app.use(cors({
  origin: true, // Allow all origins for now - you can restrict this later
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;

