import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/** This is the Middleware**/
app.use(cors());
app.use(express.json());

/**The Test route function**/
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

/**This function starts the server**/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
