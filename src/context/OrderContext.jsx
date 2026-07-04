import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

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
      getActiveOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};
