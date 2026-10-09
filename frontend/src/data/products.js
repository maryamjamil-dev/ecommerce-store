import headphonesImage from "../assets/images/products/headphone.png";
import watchImage from "../assets/images/products/watch.png";
import cameraImage from "../assets/images/products/camera.png";
import smartphone01 from "../assets/images/products/smartphones/smartphone-01.png";
import smartphone02 from "../assets/images/products/smartphones/smartphone-02.png";
import smartphone03 from "../assets/images/products/smartphones/smartphone-03.png";
import laptop01 from "../assets/images/products/laptop/laptop-01.png";
import laptop02 from "../assets/images/products/laptop/laptop-02.png";
import laptop03 from "../assets/images/products/laptop/laptop-03.png";
import tablet01 from "../assets/images/products/tablets/tablet-01.png";
import tablet02 from "../assets/images/products/tablets/tablet-02.png";
import tablet03 from "../assets/images/products/tablets/tablet-03.png";
import desktop01 from "../assets/images/products/desktop/desktop-01.png"
import desktop02 from "../assets/images/products/desktop/desktop-02.png"
import desktop03 from "../assets/images/products/desktop/desktop-03.png"
import calculator01 from "../assets/images/products/calculators/calculator-01.png"
import calculator02 from "../assets/images/products/calculators/calculator-02.png"
import calculator03 from "../assets/images/products/calculators/calculator-03.png"
import television01 from "../assets/images/products/televisions/television-01.png"
import television02 from "../assets/images/products/televisions/television-02.png"
import television03 from "../assets/images/products/televisions/television-03.png"
import radio01 from "../assets/images/products/radio/radio-01.png"
import radio02 from "../assets/images/products/radio/radio-02.png"
import radio03 from "../assets/images/products/radio/radio-03.png"
import headphone01 from "../assets/images/products/headphones/headphone-01.png"
import headphone02 from "../assets/images/products/headphones/headphone-02.png"
import headphone03 from "../assets/images/products/headphones/headphone-03.png"
import speaker01 from "../assets/images/products/bluetooth-speaker/speaker-01.png"
import speaker02 from "../assets/images/products/bluetooth-speaker/speaker-02.png"
import speaker03 from "../assets/images/products/bluetooth-speaker/speaker-03.png"
import game01 from "../assets/images/products/video-games/gaming-01.png"
import game02 from "../assets/images/products/video-games/gaming-02.png"
import game03 from "../assets/images/products/video-games/gaming-03.png"
import camera01 from "../assets/images/products/cameras/camera-01.png"
import camera02 from "../assets/images/products/cameras/camera-02.png"
import camera03 from "../assets/images/products/cameras/camera-03.png"
import watch01 from "../assets/images/products/Smartwatches/smartwatch-01.png"
import watch02 from "../assets/images/products/Smartwatches/smartwatch-02.png"
import watch03 from "../assets/images/products/Smartwatches/smartwatch-03.png"
import microwave01 from "../assets/images/products/microwave-ovens/microwave-01.png"
import microwave02 from "../assets/images/products/microwave-ovens/microwave-02.png"
import microwave03 from "../assets/images/products/microwave-ovens/microwave-03.png"
import refrigerator01 from "../assets/images/products/refrigerators/refrigerator-01.png";
import refrigerator02 from "../assets/images/products/refrigerators/refrigerator-02.png";
import refrigerator03 from "../assets/images/products/refrigerators/refrigerator-03.png";
import airConditioner01 from "../assets/images/products/air-conditioners/air-conditioner-01.png"
import airConditioner02 from "../assets/images/products/air-conditioners/air-conditioner-02.png"
import airConditioner03 from "../assets/images/products/air-conditioners/air-conditioner-03.png"
import kettle01 from "../assets/images/products/electric-kettles/kettle-01.png"
import kettle02 from "../assets/images/products/electric-kettles/kettle-02.png"
import kettle03 from "../assets/images/products/electric-kettles/kettle-03.png"
import printer01 from "../assets/images/products/printers/printer-01.png"
import printer02 from "../assets/images/products/printers/printer-02.png"
import printer03 from "../assets/images/products/printers/printer-03.png"
import scanner01 from "../assets/images/products/scanner/scanner-01.png"
import scanner02 from "../assets/images/products/scanner/scanner-02.png"
import scanner03 from "../assets/images/products/scanner/scanner-03.png"
const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    category: "Headphones",
    brand: "Sony",
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.8,
    reviews: 156,
    discount: "25% OFF",
    image: headphonesImage,
    description:
      "Enjoy immersive sound, comfortable listening, and reliable wireless performance with these premium headphones.",
  },

  {
    id: 2,
    title: "Smart Pro Watch",
    category: "Smartwatch",
    brand: "Samsung",
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.7,
    reviews: 98,
    discount: "19% OFF",
    image: watchImage,
    description:
      "Track your everyday activity, stay connected, and manage your daily routine with this smart watch.",
  },

  {
    id: 3,
    title: "Ultra HD Digital Camera",
    category: "Digital Camera",
    brand: "Canon",
    price: 549.99,
    oldPrice: 599.99,
    rating: 4.9,
    reviews: 74,
    discount: "8% OFF",
    image: cameraImage,
    description:
      "Capture detailed photos and videos with a modern digital camera designed for everyday photography.",
  },

  {
    id: 4,
    title: "Professional HD Digital Camera",
    category: "Digital Camera",
    brand: "Sony",
    price: 649.99,
    oldPrice: 699.99,
    rating: 4.8,
    reviews: 86,
    discount: "7% OFF",
    image: cameraImage,
    description:
      "Professional digital camera designed for high-quality photography and video recording.",
  },

  {
    id: 5,
    title: "Advanced Digital Camera",
    category: "Digital Camera",
    brand: "Canon",
    price: 499.99,
    oldPrice: 559.99,
    rating: 4.7,
    reviews: 62,
    discount: "11% OFF",
    image: cameraImage,
    description:
      "A modern digital camera offering reliable performance and excellent image quality.",
  },

  {
    id: 6,
    title: "Studio Wireless Headphones",
    category: "Headphones",
    brand: "Sony",
    price: 149.99,
    oldPrice: 179.99,
    rating: 4.6,
    reviews: 84,
    discount: "17% OFF",
    image: headphonesImage,
    description:
      "Enjoy powerful audio and comfortable listening with these studio wireless headphones.",
  },

  {
    id: 7,
    title: "Smart Fitness Watch",
    category: "Smartwatch",
    brand: "Samsung",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.5,
    reviews: 71,
    discount: "23% OFF",
    image: watchImage,
    description:
      "A smart fitness watch designed to help you track your daily activity and stay connected.",
  },

  {
    id: 8,
    title: "Professional Mirrorless Camera",
    category: "Digital Camera",
    brand: "Canon",
    price: 799.99,
    oldPrice: 899.99,
    rating: 4.9,
    reviews: 53,
    discount: "11% OFF",
    image: cameraImage,
    description:
      "A professional mirrorless camera for detailed photography and high-quality video.",
  },
  {
  id: 9,
  title: "Premium Smart Smartphone",
  category: "Smartphone",
  brand: "Samsung",
  price: 699.99,
  oldPrice: 749.99,
  rating: 4.8,
  reviews: 124,
  discount: "7% OFF",
  image: smartphone01,
  description:
    "A modern smartphone with a premium display, powerful performance, and reliable everyday features.",
},

{
  id: 10,
  title: "Pro Max Smartphone",
  category: "Smartphone",
  brand: "Apple",
  price: 899.99,
  oldPrice: 949.99,
  rating: 4.9,
  reviews: 186,
  discount: "5% OFF",
  image: smartphone02,
  description:
    "A premium smartphone designed for smooth performance, high-quality photography, and everyday productivity.",
},

{
  id: 11,
  title: "Ultra Performance Smartphone",
  category: "Smartphone",
  brand: "OnePlus",
  price: 599.99,
  oldPrice: 649.99,
  rating: 4.7,
  reviews: 97,
  discount: "8% OFF",
  image: smartphone03,
  description:
    "A powerful smartphone offering fast performance, a vibrant display, and a smooth user experience.",
},
{
  id: 12,
  title: "Professional Business Laptop",
  category: "Laptop",
  brand: "Dell",
  price: 899.99,
  oldPrice: 999.99,
  rating: 4.8,
  reviews: 142,
  discount: "10% OFF",
  image: laptop01,
  description:
    "A professional laptop designed for work, productivity, multitasking, and everyday computing.",
},

{
  id: 13,
  title: "Ultra Performance Laptop",
  category: "Laptop",
  brand: "HP",
  price: 1099.99,
  oldPrice: 1199.99,
  rating: 4.9,
  reviews: 118,
  discount: "8% OFF",
  image: laptop02,
  description:
    "A powerful laptop offering fast performance, a high-quality display, and reliable everyday productivity.",
},

{
  id: 14,
  title: "Slim Performance Laptop",
  category: "Laptop",
  brand: "Lenovo",
  price: 799.99,
  oldPrice: 899.99,
  rating: 4.7,
  reviews: 96,
  discount: "11% OFF",
  image: laptop03,
  description:
    "A slim and lightweight laptop built for comfortable productivity, study, entertainment, and everyday use.",
},
{
  id: 15,
  title: "Premium Android Tablet",
  category: "Tablet",
  brand: "Samsung",
  price: 399.99,
  oldPrice: 449.99,
  rating: 4.8,
  reviews: 87,
  discount: "11% OFF",
  image: tablet01,
  description:
    "A premium tablet with a vibrant display, smooth performance, and reliable features for work, study, and entertainment.",
},

{
  id: 16,
  title: "Pro Performance Tablet",
  category: "Tablet",
  brand: "Apple",
  price: 599.99,
  oldPrice: 649.99,
  rating: 4.9,
  reviews: 135,
  discount: "8% OFF",
  image: tablet02,
  description:
    "A powerful tablet designed for productivity, creative work, entertainment, and a smooth everyday experience.",
},

{
  id: 17,
  title: "Slim Everyday Tablet",
  category: "Tablet",
  brand: "Lenovo",
  price: 299.99,
  oldPrice: 349.99,
  rating: 4.6,
  reviews: 64,
  discount: "14% OFF",
  image: tablet03,
  description:
    "A lightweight tablet for everyday browsing, studying, streaming, reading, and entertainment.",
},
{
  id: 18,
  title: "Professional Desktop Computer",
  category: "Desktop Computer",
  brand: "Dell",
  price: 899.99,
  oldPrice: 999.99,
  rating: 4.8,
  reviews: 91,
  discount: "10% OFF",
  image: desktop01,
  description:
    "A reliable desktop computer designed for professional work, multitasking, productivity, and everyday computing.",
},

{
  id: 19,
  title: "High Performance Desktop",
  category: "Desktop Computer",
  brand: "HP",
  price: 1099.99,
  oldPrice: 1199.99,
  rating: 4.9,
  reviews: 76,
  discount: "8% OFF",
  image: desktop02,
  description:
    "A powerful desktop computer built for demanding applications, multitasking, productivity, and entertainment.",
},

{
  id: 20,
  title: "Compact Office Desktop",
  category: "Desktop Computer",
  brand: "Lenovo",
  price: 699.99,
  oldPrice: 749.99,
  rating: 4.6,
  reviews: 58,
  discount: "7% OFF",
  image: desktop03,
  description:
    "A compact and efficient desktop computer suitable for office work, study, browsing, and everyday tasks.",
},
{
  id: 21,
  title: "Scientific Calculator",
  category: "Calculator",
  brand: "Casio",
  price: 24.99,
  oldPrice: 29.99,
  rating: 4.8,
  reviews: 156,
  discount: "17% OFF",
  image: calculator01,
  description:
    "A reliable scientific calculator designed for students, engineering, mathematics, and everyday calculations.",
},

{
  id: 22,
  title: "Advanced Scientific Calculator",
  category: "Calculator",
  brand: "Casio",
  price: 34.99,
  oldPrice: 39.99,
  rating: 4.9,
  reviews: 112,
  discount: "13% OFF",
  image: calculator02,
  description:
    "An advanced calculator with useful scientific functions for mathematics, engineering, and professional use.",
},

{
  id: 23,
  title: "Professional Desktop Calculator",
  category: "Calculator",
  brand: "Canon",
  price: 19.99,
  oldPrice: 24.99,
  rating: 4.6,
  reviews: 74,
  discount: "20% OFF",
  image: calculator03,
  description:
    "A practical desktop calculator designed for office work, business calculations, and everyday use.",
},
{
  id: 24,
  title: "4K Smart LED Television",
  category: "Television",
  brand: "Samsung",
  price: 699.99,
  oldPrice: 799.99,
  rating: 4.8,
  reviews: 128,
  discount: "13% OFF",
  image: television01,
  description:
    "A modern 4K smart television with a vibrant display, smart features, and an immersive entertainment experience.",
},

{
  id: 25,
  title: "Premium 4K Smart TV",
  category: "Television",
  brand: "Sony",
  price: 899.99,
  oldPrice: 999.99,
  rating: 4.9,
  reviews: 94,
  discount: "10% OFF",
  image: television02,
  description:
    "A premium 4K television designed with detailed picture quality, smart connectivity, and modern entertainment features.",
},

{
  id: 26,
  title: "Full HD Smart Television",
  category: "Television",
  brand: "LG",
  price: 499.99,
  oldPrice: 579.99,
  rating: 4.7,
  reviews: 83,
  discount: "14% OFF",
  image: television03,
  description:
    "A stylish smart television offering clear Full HD picture quality and convenient streaming features.",
},
{
  id: 27,
  title: "Portable Digital Radio",
  category: "Radio",
  brand: "Sony",
  price: 49.99,
  oldPrice: 59.99,
  rating: 4.7,
  reviews: 86,
  discount: "17% OFF",
  image: radio01,
  description:
    "A compact digital radio with clear sound, easy controls, and convenient portability for everyday listening.",
},

{
  id: 28,
  title: "Premium FM Radio",
  category: "Radio",
  brand: "Panasonic",
  price: 69.99,
  oldPrice: 79.99,
  rating: 4.8,
  reviews: 63,
  discount: "13% OFF",
  image: radio02,
  description:
    "A reliable FM radio offering clear reception, simple controls, and a classic design for home and outdoor use.",
},

{
  id: 29,
  title: "Bluetooth Digital Radio",
  category: "Radio",
  brand: "Philips",
  price: 79.99,
  oldPrice: 89.99,
  rating: 4.6,
  reviews: 51,
  discount: "11% OFF",
  image: radio03,
  description:
    "A modern digital radio with Bluetooth connectivity and convenient wireless audio features.",
},
{
  id: 30,
  title: "Premium Noise Cancelling Headphones",
  category: "Headphones",
  brand: "Sony",
  price: 199.99,
  oldPrice: 229.99,
  rating: 4.9,
  reviews: 214,
  discount: "13% OFF",
  image: headphone01,
  description:
    "Premium wireless headphones with immersive sound, comfortable ear cushions, and advanced noise cancellation.",
},

{
  id: 31,
  title: "Wireless Studio Headphones",
  category: "Headphones",
  brand: "JBL",
  price: 129.99,
  oldPrice: 159.99,
  rating: 4.7,
  reviews: 138,
  discount: "19% OFF",
  image: headphone02,
  description:
    "Wireless studio headphones delivering balanced audio, comfortable listening, and reliable everyday performance.",
},

{
  id: 32,
  title: "Professional Gaming Headphones",
  category: "Headphones",
  brand: "Logitech",
  price: 99.99,
  oldPrice: 119.99,
  rating: 4.6,
  reviews: 109,
  discount: "17% OFF",
  image: headphone03,
  description:
    "Gaming headphones with clear audio, comfortable design, and an immersive experience for gaming and entertainment.",
},
{
  id: 33,
  title: "Portable Bluetooth Speaker",
  category: "Bluetooth Speaker",
  brand: "JBL",
  price: 79.99,
  oldPrice: 99.99,
  rating: 4.8,
  reviews: 164,
  discount: "20% OFF",
  image: speaker01,
  description:
    "A portable Bluetooth speaker delivering powerful wireless sound with a compact design for everyday use.",
},

{
  id: 34,
  title: "Premium Wireless Speaker",
  category: "Bluetooth Speaker",
  brand: "Sony",
  price: 129.99,
  oldPrice: 149.99,
  rating: 4.7,
  reviews: 98,
  discount: "13% OFF",
  image: speaker02,
  description:
    "A premium wireless speaker designed for clear audio, strong bass, and convenient Bluetooth connectivity.",
},

{
  id: 35,
  title: "Compact Outdoor Bluetooth Speaker",
  category: "Bluetooth Speaker",
  brand: "Anker",
  price: 59.99,
  oldPrice: 69.99,
  rating: 4.6,
  reviews: 76,
  discount: "14% OFF",
  image: speaker03,
  description:
    "A compact Bluetooth speaker designed for portable listening, outdoor use, and everyday entertainment.",
},
{
  id: 36,
  title: "Next Gen Gaming Console",
  category: "Video Game",
  brand: "Sony",
  price: 499.99,
  oldPrice: 549.99,
  rating: 4.9,
  reviews: 186,
  discount: "9% OFF",
  image: game01,
  description:
    "A next-generation gaming console designed for immersive gameplay, high-quality graphics, and modern entertainment.",
},

{
  id: 37,
  title: "Advanced Gaming Console",
  category: "Video Game",
  brand: "Microsoft",
  price: 449.99,
  oldPrice: 499.99,
  rating: 4.8,
  reviews: 142,
  discount: "10% OFF",
  image: game02,
  description:
    "A powerful gaming console offering smooth performance, immersive gaming, and a wide range of entertainment features.",
},

{
  id: 38,
  title: "Portable Gaming Console",
  category: "Video Game",
  brand: "Nintendo",
  price: 299.99,
  oldPrice: 349.99,
  rating: 4.7,
  reviews: 118,
  discount: "14% OFF",
  image: game03,
  description:
    "A portable gaming console designed for flexible gameplay, entertainment, and gaming on the go.",
},
{
  id: 39,
  title: "Professional Mirrorless Camera",
  category: "Digital Camera",
  brand: "Sony",
  price: 899.99,
  oldPrice: 999.99,
  rating: 4.9,
  reviews: 142,
  discount: "10% OFF",
  image: camera01,
  description:
    "A professional mirrorless camera designed for high-quality photography, detailed images, and creative video recording.",
},

{
  id: 40,
  title: "Advanced Digital Camera",
  category: "Digital Camera",
  brand: "Canon",
  price: 699.99,
  oldPrice: 799.99,
  rating: 4.8,
  reviews: 116,
  discount: "13% OFF",
  image: camera02,
  description:
    "An advanced digital camera offering excellent image quality, reliable performance, and versatile photography features.",
},

{
  id: 41,
  title: "Compact Digital Camera",
  category: "Digital Camera",
  brand: "Nikon",
  price: 499.99,
  oldPrice: 549.99,
  rating: 4.7,
  reviews: 89,
  discount: "9% OFF",
  image: camera03,
  description:
    "A compact digital camera designed for everyday photography, travel, and capturing high-quality photos and videos.",
},
{
  id: 42,
  title: "Premium Smartwatch",
  category: "Smartwatch",
  brand: "Apple",
  price: 299.99,
  oldPrice: 349.99,
  rating: 4.9,
  reviews: 156,
  discount: "14% OFF",
  image: watch01,
  description:
    "A premium smartwatch with smart health features, notifications, fitness tracking, and a modern design for everyday use.",
},

{
  id: 43,
  title: "Advanced Fitness Smartwatch",
  category: "Smartwatch",
  brand: "Samsung",
  price: 199.99,
  oldPrice: 249.99,
  rating: 4.8,
  reviews: 124,
  discount: "20% OFF",
  image: watch02,
  description:
    "An advanced smartwatch designed for fitness tracking, activity monitoring, notifications, and everyday connectivity.",
},

{
  id: 44,
  title: "Classic Smart Fitness Watch",
  category: "Smartwatch",
  brand: "Amazfit",
  price: 129.99,
  oldPrice: 159.99,
  rating: 4.7,
  reviews: 98,
  discount: "19% OFF",
  image: watch03,
  description:
    "A stylish fitness smartwatch offering activity tracking, health monitoring, notifications, and long-lasting everyday performance.",
},
{
  id: 45,
  title: "Digital Microwave Oven",
  category: "Microwave Oven",
  brand: "Samsung",
  price: 149.99,
  oldPrice: 179.99,
  rating: 4.8,
  reviews: 126,
  discount: "17% OFF",
  image: microwave01,
  description:
    "A modern digital microwave oven with convenient controls, efficient cooking performance, and a stylish design for everyday kitchens.",
},

{
  id: 46,
  title: "Premium Convection Microwave",
  category: "Microwave Oven",
  brand: "Panasonic",
  price: 229.99,
  oldPrice: 269.99,
  rating: 4.9,
  reviews: 94,
  discount: "15% OFF",
  image: microwave02,
  description:
    "A premium convection microwave oven designed for efficient cooking, reheating, and versatile everyday kitchen use.",
},

{
  id: 47,
  title: "Compact Microwave Oven",
  category: "Microwave Oven",
  brand: "LG",
  price: 119.99,
  oldPrice: 139.99,
  rating: 4.7,
  reviews: 81,
  discount: "14% OFF",
  image: microwave03,
  description:
    "A compact microwave oven offering convenient cooking, easy controls, and an efficient design for modern kitchens.",
},
{
  id: 48,
  title: "Smart Double Door Refrigerator",
  category: "Refrigerator",
  brand: "Samsung",
  price: 899.99,
  oldPrice: 999.99,
  rating: 4.8,
  reviews: 118,
  discount: "10% OFF",
  image: refrigerator01,
  description:
    "A modern double door refrigerator offering spacious storage, efficient cooling, and convenient features for everyday use.",
},

{
  id: 49,
  title: "Premium French Door Refrigerator",
  category: "Refrigerator",
  brand: "LG",
  price: 1299.99,
  oldPrice: 1499.99,
  rating: 4.9,
  reviews: 86,
  discount: "13% OFF",
  image: refrigerator02,
  description:
    "A premium refrigerator with spacious compartments, advanced cooling technology, and an elegant modern design.",
},

{
  id: 50,
  title: "Compact Family Refrigerator",
  category: "Refrigerator",
  brand: "Haier",
  price: 699.99,
  oldPrice: 799.99,
  rating: 4.7,
  reviews: 94,
  discount: "13% OFF",
  image: refrigerator03,
  description:
    "A practical family refrigerator with efficient cooling, convenient storage, and a space-saving design.",
},
{
  id: 51,
  title: "Inverter Split Air Conditioner",
  category: "Air Conditioner",
  brand: "Haier",
  price: 799.99,
  oldPrice: 899.99,
  rating: 4.8,
  reviews: 124,
  discount: "11% OFF",
  image: airConditioner01,
  description:
    "An energy-efficient inverter air conditioner designed for fast cooling, comfortable temperature control, and everyday home use.",
},

{
  id: 52,
  title: "Premium Smart Air Conditioner",
  category: "Air Conditioner",
  brand: "Samsung",
  price: 999.99,
  oldPrice: 1099.99,
  rating: 4.9,
  reviews: 96,
  discount: "9% OFF",
  image: airConditioner02,
  description:
    "A premium smart air conditioner offering powerful cooling, efficient performance, and convenient temperature control.",
},

{
  id: 53,
  title: "Energy Efficient Split AC",
  category: "Air Conditioner",
  brand: "LG",
  price: 699.99,
  oldPrice: 799.99,
  rating: 4.7,
  reviews: 87,
  discount: "13% OFF",
  image: airConditioner03,
  description:
    "An efficient split air conditioner designed for reliable cooling, comfortable indoor temperatures, and everyday use.",
},
{
  id: 54,
  title: "Premium Electric Kettle",
  category: "Electric Kettle",
  brand: "Philips",
  price: 49.99,
  oldPrice: 59.99,
  rating: 4.8,
  reviews: 126,
  discount: "17% OFF",
  image: kettle01,
  description:
    "A premium electric kettle with fast boiling performance, convenient controls, and a modern design for everyday kitchen use.",
},

{
  id: 55,
  title: "Stainless Steel Electric Kettle",
  category: "Electric Kettle",
  brand: "Panasonic",
  price: 39.99,
  oldPrice: 49.99,
  rating: 4.7,
  reviews: 94,
  discount: "20% OFF",
  image: kettle02,
  description:
    "A durable stainless steel electric kettle designed for fast boiling, easy handling, and convenient everyday use.",
},

{
  id: 56,
  title: "Compact Travel Electric Kettle",
  category: "Electric Kettle",
  brand: "Kenwood",
  price: 29.99,
  oldPrice: 39.99,
  rating: 4.6,
  reviews: 78,
  discount: "25% OFF",
  image: kettle03,
  description:
    "A compact electric kettle designed for quick boiling, easy storage, and convenient use at home or while traveling.",
},
{
  id: 57,
  title: "Wireless All-in-One Printer",
  category: "Printer",
  brand: "HP",
  price: 149.99,
  oldPrice: 179.99,
  rating: 4.8,
  reviews: 136,
  discount: "17% OFF",
  image: printer01,
  description:
    "A versatile all-in-one printer designed for high-quality printing, scanning, and convenient wireless connectivity.",
},

{
  id: 58,
  title: "Professional Laser Printer",
  category: "Printer",
  brand: "Canon",
  price: 229.99,
  oldPrice: 269.99,
  rating: 4.9,
  reviews: 108,
  discount: "15% OFF",
  image: printer02,
  description:
    "A professional laser printer offering fast printing, sharp documents, and reliable performance for home and office use.",
},

{
  id: 59,
  title: "Compact Color Printer",
  category: "Printer",
  brand: "Epson",
  price: 119.99,
  oldPrice: 139.99,
  rating: 4.7,
  reviews: 82,
  discount: "14% OFF",
  image: printer03,
  description:
    "A compact color printer designed for everyday documents, photos, and convenient home or office printing.",
},
{
  id: 60,
  title: "Professional Document Scanner",
  category: "Scanner",
  brand: "Canon",
  price: 199.99,
  oldPrice: 229.99,
  rating: 4.8,
  reviews: 118,
  discount: "13% OFF",
  image: scanner01,
  description:
    "A professional document scanner designed for fast, clear, and reliable document and image scanning for home and office use.",
},

{
  id: 61,
  title: "High Speed Office Scanner",
  category: "Scanner",
  brand: "Epson",
  price: 249.99,
  oldPrice: 299.99,
  rating: 4.9,
  reviews: 92,
  discount: "17% OFF",
  image: scanner02,
  description:
    "A high-speed scanner offering efficient document processing, detailed scans, and reliable performance for professional environments.",
},

{
  id: 62,
  title: "Compact Portable Scanner",
  category: "Scanner",
  brand: "HP",
  price: 129.99,
  oldPrice: 149.99,
  rating: 4.7,
  reviews: 76,
  discount: "13% OFF",
  image: scanner03,
  description:
    "A compact scanner designed for convenient document scanning, easy storage, and everyday home or office use.",
},
];

export default products;