require("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const Category = require("./model/category.model");

const categories = [
  { name: "Smartphone", slug: "smartphones", description: "Explore the latest smartphones." },
  { name: "Laptop", slug: "laptops", description: "Explore laptops for work and entertainment." },
  { name: "Tablet", slug: "tablets", description: "Explore tablets for everyday use." },
  { name: "Desktop Computer", slug: "desktop-computers", description: "Explore desktop computers." },
  { name: "Calculator", slug: "calculators", description: "Explore calculators for everyday use." },
  { name: "Television", slug: "televisions", description: "Explore televisions and smart TVs." },
  { name: "Radio", slug: "radios", description: "Explore radios and audio devices." },
  { name: "Headphones", slug: "headphones", description: "Explore headphones for music and calls." },
  { name: "Bluetooth Speaker", slug: "bluetooth-speakers", description: "Explore portable Bluetooth speakers." },
  { name: "Video Game", slug: "video-games", description: "Explore gaming products and accessories." },
  { name: "Digital Camera", slug: "digital-cameras", description: "Explore digital cameras and photography devices." },
  { name: "Smartwatch", slug: "smartwatches", description: "Explore smartwatches and wearable technology." },
  { name: "Microwave Oven", slug: "microwave-ovens", description: "Explore microwave ovens for your kitchen." },
  { name: "Refrigerator", slug: "refrigerators", description: "Explore refrigerators and cooling appliances." },
  { name: "Air Conditioner", slug: "air-conditioners", description: "Explore air conditioners." },
  { name: "Electric Kettle", slug: "electric-kettles", description: "Explore electric kettles." },
  { name: "Printer", slug: "printers", description: "Explore printers for home and office." },
  { name: "Scanner", slug: "scanners", description: "Explore scanners for documents and images." },
];

async function seedCategories() {
  try {
    const mongoUrl =
      process.env.MONGO_URL ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      process.env.DATABASE_URL;

    if (!mongoUrl) {
      throw new Error(
        "Mongo connection string .env mein nahi mili (MONGO_URL / MONGODB_URI check karein)."
      );
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected.");

    try {
      await Category.syncIndexes();
      console.log("Indexes synced.");
    } catch (err) {
      console.warn("Index sync skipped:", err.message);
    }

    let inserted = 0;
    let skipped = 0;
    let failed = 0;

    for (const category of categories) {
      try {
        const existing = await Category.findOne({
          $or: [{ slug: category.slug }, { name: category.name }],
        });

        if (existing) {
          skipped++;
          console.log(`Already exists: ${category.name}`);
          continue;
        }

        await Category.create({ ...category, image: "", isActive: true });
        inserted++;
        console.log(`Inserted: ${category.name}`);
      } catch (err) {
        failed++;
        console.error(`FAILED: ${category.name} -> ${err.message}`);
      }
    }

    console.log("\nCategory seeding completed.");
    console.log(`Inserted: ${inserted} | Skipped: ${skipped} | Failed: ${failed}`);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedCategories();