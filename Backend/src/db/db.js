const mongoose = require("mongoose")
const dns = require("dns")
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("database is connected succsessfully")
  } catch (error) {
    console.log("connection failed;" , error.message)
  }
}
module.exports = connectDB