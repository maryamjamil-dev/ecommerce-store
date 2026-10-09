import {
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Calculator,
  Tv,
  Radio,
  Headphones,
  Bluetooth,
  Gamepad2,
  Camera,
  Watch,
  Microwave,
  Refrigerator,
  AirVent,
  CookingPot,
  Printer,
  ScanLine,
} from "lucide-react";

const categories = [
  // Communication and Computing
  {
    name: "Smartphone",
    slug: "smartphones",
    group: "Communication and Computing",
    description: "Latest smartphones and mobile devices.",
    icon: Smartphone,
  },
  {
    name: "Laptop",
    slug: "laptops",
    group: "Communication and Computing",
    description: "Powerful laptops for work and entertainment.",
    icon: Laptop,
  },
  {
    name: "Tablet",
    slug: "tablets",
    group: "Communication and Computing",
    description: "Portable tablets for work, study and entertainment.",
    icon: Tablet,
  },
  {
    name: "Desktop Computer",
    slug: "desktop-computers",
    group: "Communication and Computing",
    description: "Reliable desktop computers for home and office.",
    icon: Monitor,
  },
  {
    name: "Calculator",
    slug: "calculators",
    group: "Communication and Computing",
    description: "Digital calculators for study and professional use.",
    icon: Calculator,
  },

  // Entertainment and Audio
  {
    name: "Television",
    slug: "television",
    group: "Entertainment and Audio",
    description: "Smart TVs and modern entertainment displays.",
    icon: Tv,
  },
  {
    name: "Radio",
    slug: "radio",
    group: "Entertainment and Audio",
    description: "Portable and modern radio devices.",
    icon: Radio,
  },
  {
    name: "Headphones",
    slug: "headphones",
    group: "Entertainment and Audio",
    description: "Wireless and premium headphones for immersive audio.",
    icon: Headphones,
  },
  {
    name: "Bluetooth Speaker",
    slug: "bluetooth-speakers",
    group: "Entertainment and Audio",
    description: "Portable speakers with powerful wireless sound.",
    icon: Bluetooth,
  },
  {
    name: "Video Game",
    slug: "video-games",
    group: "Entertainment and Audio",
    description: "Gaming consoles and entertainment devices.",
    icon: Gamepad2,
  },

  // Photography and Wearables
  {
    name: "Digital Camera",
    slug: "digital-cameras",
    group: "Photography and Wearables",
    description: "Digital cameras for photography and video.",
    icon: Camera,
  },
  {
    name: "Smartwatch",
    slug: "smartwatches",
    group: "Photography and Wearables",
    description: "Smartwatches for fitness, communication and daily life.",
    icon: Watch,
  },

  // Home and Kitchen Appliances
  {
    name: "Microwave Oven",
    slug: "microwave-ovens",
    group: "Home and Kitchen Appliances",
    description: "Modern microwave ovens for convenient cooking.",
    icon: Microwave,
  },
  {
    name: "Refrigerator",
    slug: "refrigerators",
    group: "Home and Kitchen Appliances",
    description: "Modern refrigerators for efficient food storage.",
    icon: Refrigerator,
  },
  {
    name: "Air Conditioner",
    slug: "air-conditioners",
    group: "Home and Kitchen Appliances",
    description: "Cooling solutions for comfortable indoor spaces.",
    icon: AirVent,
  },
  {
    name: "Electric Kettle",
    slug: "electric-kettles",
    group: "Home and Kitchen Appliances",
    description: "Fast and convenient electric kettles for everyday use.",
    icon: CookingPot,
  },

  // Office Equipment
  {
    name: "Printer",
    slug: "printers",
    group: "Office Equipment",
    description: "Printers for home, office and professional use.",
    icon: Printer,
  },
  {
    name: "Scanner",
    slug: "scanners",
    group: "Office Equipment",
    description: "Reliable scanners for documents and images.",
    icon: ScanLine,
  },
];

export default categories;