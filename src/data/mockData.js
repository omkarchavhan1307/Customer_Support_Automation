export const restaurants = [
  {
    id: "r1",
    name: "BiteCraft Sourdough Pizza & Grill",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    location: "45 Innovation Way, Tech District, Bangalore",
    openingHours: "11:00 AM - 11:00 PM",
    rating: 4.8,
    reviewsCount: 1240,
    specialty: "Truffle Pizzas & Angus Burgers",
    todaySpecial: {
      name: "Truffle Mushroom Fusion Pizza",
      price: 389,
      description: "Sautéed wild mushrooms, white truffle oil, fresh mozzarella, and micro greens on sourdough."
    },
    basePrepTime: 15,
    currentQueueCount: 4
  },
  {
    id: "r2",
    name: "BiteCraft Sichuan Wok & Dim Sum",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop",
    location: "88 Orchid Blvd, Food Street, Bangalore",
    openingHours: "12:00 PM - 10:30 PM",
    rating: 4.6,
    reviewsCount: 890,
    specialty: "Hand-Pulled Noodles & Crystal Dim Sum",
    todaySpecial: {
      name: "Steamed Crystal Dim Sum (6pcs)",
      price: 199,
      description: "Delicate wrappers stuffed with minced water chestnuts, shiitake mushrooms, and asparagus."
    },
    basePrepTime: 12,
    currentQueueCount: 2
  },
  {
    id: "r3",
    name: "BiteCraft Ghee Roast Dosa Cafe",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop",
    location: "12 Temple Road, Jayanagar, Bangalore",
    openingHours: "07:30 AM - 10:00 PM",
    rating: 4.9,
    reviewsCount: 2310,
    specialty: "Crispy Ghee Roast Dosas & Filter Coffee",
    todaySpecial: {
      name: "Ghee Roast Paper Masala Dosa",
      price: 149,
      description: "Thin crispy rice crepe spread with pure cow ghee, filled with potato masala."
    },
    basePrepTime: 8,
    currentQueueCount: 1
  }
];

export const menuItems = [
  // Restaurant 1: Pizza & Grill
  {
    id: "p1",
    restaurantId: "r1",
    name: "Truffle Mushroom Fusion Pizza",
    description: "Sautéed wild mushrooms, white truffle oil, fresh mozzarella, and micro greens on sourdough.",
    price: 389,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 18,
    available: true,
    isPopular: true
  },
  {
    id: "p2",
    restaurantId: "r1",
    name: "Smoked Chicken Pepperoni Pizza",
    description: "Double smoked pepperoni, fresh mozzarella, parmesan, spicy honey drizzle, and fresh basil.",
    price: 429,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop",
    isVeg: false,
    prepTime: 15,
    available: true,
    isPopular: true
  },
  {
    id: "p3",
    restaurantId: "r1",
    name: "Garden Pesto Sourdough Pizza",
    description: "Basil pesto base, cherry tomatoes, baby spinach, roasted garlic, goat cheese, and toasted pine nuts.",
    price: 369,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 16,
    available: true
  },
  {
    id: "b1",
    restaurantId: "r1",
    name: "Double Smash Cheddar Burger",
    description: "Two smashed angus beef patties, double aged cheddar, caramelized onions, house sauce on brioche.",
    price: 289,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
    isVeg: false,
    prepTime: 12,
    available: true,
    isPopular: true
  },
  {
    id: "b2",
    restaurantId: "r1",
    name: "Crispy Avocado Paneer Burger",
    description: "Panko crusted paneer steak, avocado mash, spicy chipotle mayo, heirloom tomato, and lettuce.",
    price: 249,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 14,
    available: true
  },
  {
    id: "v1",
    restaurantId: "r1",
    name: "Watermelon Mint Mojito Cooler",
    description: "Fresh muddled watermelon, mint leaves, lime juice, carbonated spring water, and crushed ice.",
    price: 119,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 5,
    available: true
  },
  {
    id: "v2",
    restaurantId: "r1",
    name: "Cold Brew Vietnamese Coffee",
    description: "18-hour cold steeped Arabica coffee mixed with sweet condensed milk, served over ice.",
    price: 139,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 4,
    available: true,
    isPopular: true
  },

  // Restaurant 2: Sichuan Wok & Dim Sum
  {
    id: "c1",
    restaurantId: "r2",
    name: "Sichuan Chilli Garlic Noodles",
    description: "Wok-tossed hand-pulled noodles with seasonal greens, dynamic chilli crisp, and sesame.",
    price: 229,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 10,
    available: true,
    isPopular: true
  },
  {
    id: "c2",
    restaurantId: "r2",
    name: "Steamed Crystal Dim Sum (6pcs)",
    description: "Delicate wrappers stuffed with minced water chestnuts, shiitake mushrooms, and asparagus.",
    price: 199,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 15,
    available: true,
    isPopular: true
  },
  {
    id: "c3",
    restaurantId: "r2",
    name: "General Tso's Sticky Chicken",
    description: "Crispy battered chicken thighs tossed in sweet, savoury, and slightly spicy glaze.",
    price: 279,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop",
    isVeg: false,
    prepTime: 15,
    available: true
  },
  {
    id: "v1_r2",
    restaurantId: "r2",
    name: "Watermelon Mint Mojito Cooler",
    description: "Fresh muddled watermelon, mint leaves, lime juice, carbonated spring water, and crushed ice.",
    price: 119,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 5,
    available: true
  },
  {
    id: "d1",
    restaurantId: "r2",
    name: "Molten S'mores Chocolate Lava",
    description: "Hot dark chocolate cake filled with liquid fudge, topped with toasted marshmallows.",
    price: 179,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 10,
    available: true,
    isPopular: true
  },

  // Restaurant 3: Ghee Roast Dosa Cafe
  {
    id: "s1",
    restaurantId: "r3",
    name: "Ghee Roast Paper Masala Dosa",
    description: "Thin crispy rice crepe spread with pure cow ghee, filled with potato masala, served with chutneys.",
    price: 149,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 8,
    available: true,
    isPopular: true
  },
  {
    id: "s2",
    restaurantId: "r3",
    name: "Coorgi Pepper Mushroom Fry",
    description: "Fresh button mushrooms tossed with fresh ground black pepper, curry leaves, and local Coorg spices.",
    price: 189,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 10,
    available: true
  },
  {
    id: "v2_r3",
    restaurantId: "r3",
    name: "Cold Brew Vietnamese Coffee",
    description: "18-hour cold steeped Arabica coffee mixed with sweet condensed milk, served over ice.",
    price: 139,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 4,
    available: true,
    isPopular: true
  },
  {
    id: "d2",
    restaurantId: "r3",
    name: "Salted Caramel Cheesecake",
    description: "New York style baked cheesecake layered with sea salted caramel sauce on cracker base.",
    price: 199,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=500&auto=format&fit=crop",
    isVeg: true,
    prepTime: 7,
    available: true,
    isPopular: true
  }
];

export const customerReviews = [
  {
    id: 1,
    name: "Aarav Mehta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
    rating: 5,
    comment: "The BiteCraft chatbot predicted my wait time perfectly! It said 17 minutes, and my order was ready exactly in 17 minutes.",
    date: "Yesterday"
  },
  {
    id: 2,
    name: "Neha Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
    rating: 5,
    comment: "I used the BiteCraft assistant to track my pizza status post-checkout. Super easy to navigate and highly responsive UI.",
    date: "3 days ago"
  },
  {
    id: 3,
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
    rating: 4,
    comment: "The Double Smash Burger was extremely juicy. The live queue tracker is a game changer for crowded weekends.",
    date: "1 week ago"
  }
];

export const chatbotQA = [
  {
    keywords: ["where", "track", "status", "order"],
    answer: "You can track your order live using your Order Number. Please type your Order Number (e.g., #1054) or check our 'Track Order' page."
  },
  {
    keywords: ["how long", "time", "duration", "wait", "delay"],
    answer: "Our average preparation time is 10-15 minutes, depending on the restaurant selected. If you have an active order, please provide the 4-digit ID."
  },
  {
    keywords: ["offer", "discount", "coupon", "deal", "promo"],
    answer: "Get 15% off on your first order with code: **AICRAFT15** on our cart page!"
  },
  {
    keywords: ["menu", "food", "popular", "special"],
    answer: "We offer customized menus. Each BiteCraft outlet has its own specialty like Truffle Sourdough Pizzas, Crystal Dim Sum, or Crispy Ghee Roast Masala Dosas."
  },
  {
    keywords: ["hour", "open", "close", "time"],
    answer: "Our outlets are open daily from morning/noon until 10:00 PM or 11:00 PM."
  },
  {
    keywords: ["book", "table", "reserve", "reservation"],
    answer: "You can book a table by using the Table Reservation section in our About page. We hold tables for 15 minutes."
  },
  {
    keywords: ["cancel", "refund"],
    answer: "Orders can be cancelled free of charge within 2 minutes of placement. For cancellations or refund requests, please contact our support desk directly at support@bitecraft.ai."
  }
];
