import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, RefreshCw, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { chatbotQA } from '../data/mockData';

export default function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const { chatMessages, sendChatMessage, orders, activeOrderIds, selectedRestaurantId, clearChat } = useOrder();
  const chatEndRef = useRef(null);

  const isHiddenPage = location.pathname.startsWith('/admin') || location.pathname === '/chatbot';

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, isOpen]);

  if (isHiddenPage) return null;

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    sendChatMessage("customer", text);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't quite catch that. Try asking about your order status, wait times, offers, or menu.";
      const query = text.toLowerCase();

      const orderMatch = query.match(/#?(\d{4})/);
      if (orderMatch) {
        const orderId = orderMatch[1];
        const matchedOrder = orders.find(o => o.id === orderId && o.restaurantId === selectedRestaurantId);
        if (matchedOrder) {
          botResponse = `Order #${matchedOrder.id} update:\n\n• Status: ${matchedOrder.status}\n• Est. Ready: ${matchedOrder.estPrepTime > 0 ? `${matchedOrder.estPrepTime} minutes` : 'Ready!'}\n• Queue Position: ${matchedOrder.queuePosition}\n• Chef: ${matchedOrder.chef}`;
        } else {
          botResponse = `No order found with ID #${orderId} at this restaurant.`;
        }
      } else {
        for (const node of chatbotQA) {
          if (node.keywords.some(keyword => query.includes(keyword))) {
            botResponse = node.answer;
            break;
          }
        }
        if (query.includes("where is my order") || query.includes("track my order")) {
          const activeId = activeOrderIds[selectedRestaurantId];
          if (activeId) {
            const activeOrder = orders.find(o => o.id === activeId && o.restaurantId === selectedRestaurantId);
            if (activeOrder) {
              botResponse = `Your active order #${activeOrder.id} is currently ${activeOrder.status}.\nEst. completion: ${activeOrder.estPrepTime} minutes.\nQueue Position: ${activeOrder.queuePosition}.`;
            }
          } else {
            botResponse = "You don't have an active order. Type your 4-digit Order ID to track it.";
          }
        }
      }

      sendChatMessage("bot", botResponse);
      setIsTyping(false);
    }, 1200);
  };

  const quickSuggestions = ["Where is my order?", "How long will my order take?", "Today's offers", "Opening hours", "Book a table"];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-lg shadow-orange-500/30 hover:scale-105 transition-all group relative"
        >
          <Bot className="h-6 w-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-poppins font-medium text-sm whitespace-nowrap">
            BiteCraft Assistant
          </span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] h-[500px] sm:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl"><Bot className="h-5 w-5" /></div>
              <div>
                <h3 className="font-poppins font-semibold text-sm">BiteCraft Assistant</h3>
                <span className="text-[10px] text-orange-100 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span> Online
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={clearChat} className="p-1 hover:bg-white/15 rounded-lg text-white transition-colors"><RefreshCw className="h-4 w-4" /></button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/15 rounded-lg text-white transition-colors"><X className="h-5 w-5" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto custom-scrollbar bg-slate-50 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className="flex gap-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="h-7 w-7 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">AI</div>
                  )}
                  <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'bot' ? 'bg-white text-textDark border border-gray-100 rounded-tl-none shadow-sm' : 'bg-primary text-white rounded-tr-none shadow-sm'}`}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%] items-center">
                  <div className="h-7 w-7 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                  <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto custom-scrollbar shrink-0">
            {quickSuggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => handleSendMessage(suggestion)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-orange-50 hover:text-primary border border-gray-200 hover:border-orange-200 text-[11px] text-textMuted rounded-full whitespace-nowrap transition-all font-medium font-poppins shrink-0">
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything or enter Order ID..."
              className="flex-grow px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button type="submit" className="p-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="px-4 py-1.5 bg-slate-50 border-t border-gray-100 text-[10px] text-center text-textMuted flex items-center justify-between shrink-0">
            <span>Powered by BiteCraft AI Core v2.0</span>
            <Link to="/chatbot" onClick={() => setIsOpen(false)} className="text-primary font-semibold flex items-center gap-0.5 hover:underline">Full Page <ArrowRight className="h-2.5 w-2.5" /></Link>
          </div>
        </div>
      )}
    </div>
  );
}
