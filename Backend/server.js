require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

if (!process.env.VERCEL) {
  connectDB().catch((err) => console.log("connection failed;", err.message));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`server of ecommerce site is running on port number ${PORT}`);
  });
}

module.exports = app;