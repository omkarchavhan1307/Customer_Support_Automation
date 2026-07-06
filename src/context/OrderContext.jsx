import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { restaurants, menuItems } from '../data/mockData';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

// Initialize the GenAI client with environment API key or user provided key
const apiKey = process.env.API_KEY || '';
let ai = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log("BiteCraft AI: GoogleGenAI client successfully initialized.");
  } catch (err) {
    console.error("BiteCraft AI: Failed to initialize GoogleGenAI:", err);
  }
} else {
  console.warn("BiteCraft AI: API_KEY is not defined. Chatbot will fall back to static friendly messages.");
}

const INITIAL_ORDERS = [
  {
    id: "1054",
    restaurantId: "r1",
    customer: {
      name: "Aarav Mehta",
      email: "aarav@gmail.com",
      phone: "+91 98765 00123",
      address: "Flat 402, Oakwood Apts, Bengaluru",
      type: "Delivery"
    },
    items: [
      { id: "p1", name: "Truffle Mushroom Fusion Pizza", price: 389, quantity: 1 },
      { id: "v2", name: "Cold Brew Vietnamese Coffee", price: 139, quantity: 1 }
    ],
    total: 554,
    status: "Preparing",
    queuePosition: 2,
    chef: "Chef Vikram",
    estPrepTime: 12,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "1053",
    restaurantId: "r2",
    customer: {
      name: "Neha Sharma",
      email: "neha.sharma@yahoo.com",
      phone: "+91 98212 34567",
      address: "Table 4 (Dine-in)",
      type: "Pickup"
    },
    items: [
      { id: "c1", name: "Sichuan Chilli Garlic Noodles", price: 229, quantity: 2 },
      { id: "v1_r2", name: "Watermelon Mint Mojito Cooler", price: 119, quantity: 1 }
    ],
    total: 606,
    status: "Cooking",
    queuePosition: 1,
    chef: "Chef Ananya",
    estPrepTime: 7,
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: "1052",
    restaurantId: "r3",
    customer: {
      name: "Rohan Joshi",
      email: "rohan.joshi@outlook.com",
      phone: "+91 88776 55443",
      address: "Sec 3, Lane B, Bengaluru",
      type: "Delivery"
    },
    items: [
      { id: "s1", name: "Ghee Roast Paper Masala Dosa", price: 149, quantity: 1 }
    ],
    total: 156,
    status: "Ready",
    queuePosition: 0,
    chef: "Chef Vikram",
    estPrepTime: 0,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bitecraft_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() => {
    return localStorage.getItem('bitecraft_selected_restaurant_id') || 'r1';
  });

  const [activeOrderIds, setActiveOrderIds] = useState(() => {
    const saved = localStorage.getItem('bitecraft_active_order_ids');
    return saved ? JSON.parse(saved) : {}; // mapping: { r1: "1054", r2: "1053" }
  });

  const [chatMessagesByRestaurant, setChatMessagesByRestaurant] = useState(() => {
    const saved = localStorage.getItem('bitecraft_chat_by_restaurant');
    return saved ? JSON.parse(saved) : {
      r1: [{ id: 1, sender: "bot", text: "Hello 👋\nI'm BiteCraft Assistant.\nHow can I help you today?", time: new Date().toISOString() }],
      r2: [{ id: 1, sender: "bot", text: "Hello 👋\nI'm BiteCraft Assistant.\nHow can I help you today?", time: new Date().toISOString() }],
      r3: [{ id: 1, sender: "bot", text: "Hello 👋\nI'm BiteCraft Assistant.\nHow can I help you today?", time: new Date().toISOString() }]
    };
  });

  // Admin selected restaurant ID (set upon logging in as admin)
  const [adminRestaurantId, setAdminRestaurantId] = useState(() => {
    return localStorage.getItem('bitecraft_admin_restaurant_id') || 'r1';
  });

  useEffect(() => {
    localStorage.setItem('bitecraft_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bitecraft_selected_restaurant_id', selectedRestaurantId);
  }, [selectedRestaurantId]);

  useEffect(() => {
    localStorage.setItem('bitecraft_active_order_ids', JSON.stringify(activeOrderIds));
  }, [activeOrderIds]);

  useEffect(() => {
    localStorage.setItem('bitecraft_chat_by_restaurant', JSON.stringify(chatMessagesByRestaurant));
  }, [chatMessagesByRestaurant]);

  useEffect(() => {
    localStorage.setItem('bitecraft_admin_restaurant_id', adminRestaurantId);
  }, [adminRestaurantId]);

  const placeOrder = (customerDetails, cartItems, totalAmount) => {
    const newId = String(1000 + orders.length + 1);
    const chefs = ["Chef Vikram", "Chef Ananya", "Chef Vivek"];
    const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
    const maxPrepTime = cartItems.reduce((max, item) => Math.max(max, item.prepTime || 15), 0);

    const newOrder = {
      id: newId,
      restaurantId: selectedRestaurantId,
      customer: customerDetails,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalAmount,
      status: "Order Received",
      queuePosition: orders.filter(o => o.restaurantId === selectedRestaurantId && ["Order Received", "Preparing", "Cooking", "Packing"].includes(o.status)).length + 1,
      chef: randomChef,
      estPrepTime: maxPrepTime,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderIds(prev => ({ ...prev, [selectedRestaurantId]: newId }));
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => {
      // Find the order to get its restaurantId
      const targetOrder = prev.find(o => o.id === orderId);
      if (!targetOrder) return prev;
      const restId = targetOrder.restaurantId;

      const updated = prev.map(order => {
        if (order.id === orderId) {
          let queuePos = order.queuePosition;
          let estTime = order.estPrepTime;

          if (["Ready", "Completed", "Cancelled"].includes(newStatus)) {
            queuePos = 0;
            estTime = 0;
          } else if (newStatus === "Cooking") {
            estTime = Math.max(1, Math.round(order.estPrepTime * 0.6));
          } else if (newStatus === "Packing") {
            estTime = Math.min(3, order.estPrepTime);
          }

          return {
            ...order,
            status: newStatus,
            queuePosition: queuePos,
            estPrepTime: estTime
          };
        }
        return order;
      });

      // Recalculate queue positions for orders in the same restaurant
      if (["Ready", "Completed", "Cancelled"].includes(newStatus)) {
        let counter = 1;
        return updated.map(o => {
          if (o.restaurantId === restId && ["Order Received", "Preparing", "Cooking", "Packing"].includes(o.status)) {
            return { ...o, queuePosition: counter++ };
          }
          return o;
        });
      }
      return updated;
    });
  };

  const sendChatMessage = (sender, text) => {
    const newMessage = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toISOString()
    };
    
    setChatMessagesByRestaurant(prev => {
      const currentList = prev[selectedRestaurantId] || [];
      return {
        ...prev,
        [selectedRestaurantId]: [...currentList, newMessage]
      };
    });
  };

  const clearChat = () => {
    setChatMessagesByRestaurant(prev => ({
      ...prev,
      [selectedRestaurantId]: [
        { id: Date.now(), sender: "bot", text: "Hello 👋\nI'm BiteCraft Assistant.\nHow can I help you today?", time: new Date().toISOString() }
      ]
    }));
  };

  const getActiveOrder = () => {
    const activeId = activeOrderIds[selectedRestaurantId];
    return orders.find(o => o.id === activeId && o.restaurantId === selectedRestaurantId);
  };

  const getAIChatbotResponse = async (userText) => {
    try {
      if (!ai) {
        console.warn("BiteCraft AI: GoogleGenAI client is not initialized. Using fallback response.");
        return "Sorry, I couldn't process that right now — please ask our staff.";
      }

      // Gather current restaurant and menu info
      const currentRest = restaurants.find(r => r.id === selectedRestaurantId);
      const restName = currentRest ? currentRest.name : "BiteCraft Restaurant";
      const restSpecial = currentRest ? currentRest.specialty : "";
      const restLocation = currentRest ? currentRest.location : "";
      const restHours = currentRest ? currentRest.openingHours : "";
      const restSpecialItem = currentRest ? `${currentRest.todaySpecial.name} (Price: ₹${currentRest.todaySpecial.price}): ${currentRest.todaySpecial.description}` : "";

      // Scoped order data
      const activeOrderId = activeOrderIds[selectedRestaurantId];
      const activeOrder = orders.find(o => o.id === activeOrderId && o.restaurantId === selectedRestaurantId);
      const restaurantOrders = orders.filter(o => o.restaurantId === selectedRestaurantId);
      const restMenuItems = menuItems.filter(item => item.restaurantId === selectedRestaurantId);

      // Construct brief details about orders and menu
      const orderInfo = activeOrder ? `
Active Order Details:
- Order ID: #${activeOrder.id}
- Status: ${activeOrder.status}
- Est. Wait/Prep Time: ${activeOrder.estPrepTime} minutes
- Queue Position: #${activeOrder.queuePosition}
- Chef: ${activeOrder.chef}
- Customer Name: ${activeOrder.customer.name}
- Items: ${activeOrder.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
- Total: ₹${activeOrder.total}
` : "No active order for this customer session currently.";

      const otherOrdersInfo = restaurantOrders.length > 0 ? `
Other orders registered at this restaurant (use if client asks about an order ID like #${restaurantOrders.map(o => o.id).join(', #')}):
${restaurantOrders.map(o => `- Order #${o.id}: Status is "${o.status}", Prep Time is ${o.estPrepTime}m, Queue is #${o.queuePosition}, Chef is ${o.chef}, Customer: ${o.customer.name}`).join('\n')}
` : "";

      const menuInfo = `
Menu items:
${restMenuItems.map(item => `- ${item.name} (${item.isVeg ? 'Veg' : 'Non-Veg'}, Price: ₹${item.price}, Prep time: ${item.prepTime}m) - ${item.description} (${item.available ? 'Available' : 'Sold Out'})`).join('\n')}
`;

      const promptContext = `You are a helpful restaurant customer support chatbot. Answer briefly and clearly using this placeholder order info:

Restaurant Profile:
- Name: ${restName}
- Specialty: ${restSpecial}
- Location: ${restLocation}
- Hours: ${restHours}
- Today's Chef Special: ${restSpecialItem}

=== ORDERS CONTEXT ===
${orderInfo}
${otherOrdersInfo}

=== MENU CONTEXT ===
${menuInfo}

Rules:
- Keep the response short, concise, and friendly (maximum 3 sentences).
- Answer on behalf of ${restName}.
- Refer to active orders and details above when asked about order status, wait times, or menu options.
- If they ask for today's offers/deals, mention coupon code "AICRAFT15" for 15% discount.
`;

      // Conversational memory from state
      const recentChat = chatMessagesByRestaurant[selectedRestaurantId] || [];
      const chatHistory = recentChat.slice(-8).map(msg => ({
        role: msg.sender === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: promptContext }] },
          ...chatHistory,
          { role: 'user', parts: [{ text: userText }] }
        ]
      });

      return response.text || "Sorry, I couldn't process that right now — please ask our staff.";
    } catch (error) {
      console.error("BiteCraft AI Response Generation Error:", error);
      return "Sorry, I couldn't process that right now — please ask our staff.";
    }
  };

  return (
    <OrderContext.Provider value={{
      orders,
      selectedRestaurantId,
      setSelectedRestaurantId,
      activeOrderIds,
      setActiveOrderIds,
      chatMessages: chatMessagesByRestaurant[selectedRestaurantId] || [],
      adminRestaurantId,
      setAdminRestaurantId,
      placeOrder,
      updateOrderStatus,
      sendChatMessage,
      clearChat,
      getActiveOrder,
      getAIChatbotResponse
    }}>
      {children}
    </OrderContext.Provider>
  );
};
