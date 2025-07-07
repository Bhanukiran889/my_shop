const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// ✅ CORS config must include credentials for cookies to work
app.use(cors({
  origin: "https://my-shop-self-sigma.vercel.app/", // 🔁 or your frontend deployed URL
  credentials: true,
}));

app.use(express.json());

// ✅ cookie-parser should be BEFORE your routes
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart")); 
app.use("/api/orders", require("./routes/orders"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("DB Error:", err));
