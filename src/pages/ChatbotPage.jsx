import React, { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { chatbotQA } from '../data/mockData';
import { Bot, Send, RefreshCw, HelpCircle, Sparkles, Clock, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatbotPage() {
  const { chatMessages, sendChatMessage, orders, activeOrderIds, selectedRestaurantId, clearChat } = useOrder();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    sendChatMessage("customer", text);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm sorry, I couldn't understand that. You can ask about order status, wait times, today's special, or table bookings.";
      const query = text.toLowerCase();

      const orderMatch = query.match(/#?(\d{4})/);
      if (orderMatch) {
        const orderId = orderMatch[1];
        const matchedOrder = orders.find(o => o.id === orderId && o.restaurantId === selectedRestaurantId);
        if (matchedOrder) {
          botResponse = `Order #${matchedOrder.id} update:\n\n• Status: ${matchedOrder.status}\n• Est. Ready: ${matchedOrder.estPrepTime > 0 ? `${matchedOrder.estPrepTime} minutes` : 'Ready!'}\n• Queue Position: ${matchedOrder.queuePosition}\n• Chef: ${matchedOrder.chef}`;
        } else {
          botResponse = `No order with ID #${orderId} found at this restaurant. Please double-check your ID.`;
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
              botResponse = `Your active order #${activeOrder.id} is currently ${activeOrder.status}.\nEst. completion: ${activeOrder.estPrepTime} minutes.\nQueue Position: #${activeOrder.queuePosition}.`;
            }
          } else {
            botResponse = "You don't have an active order here. Type your 4-digit Order ID to track it.";
          }
        }
      }

      sendChatMessage("bot", botResponse);
      setIsTyping(false);
    }, 1200);
  };

  const quickPrompts = [
    { label: "Where is my order?", icon: Compass },
    { label: "How long will it take?", icon: Clock },
    { label: "Today's offers", icon: Sparkles },
    { label: "Book a table", icon: HelpCircle }
  ];

  const faqTopics = [
    "Refund policy", "Opening hours", "Dietary options", "Allergies", "Delivery zones", "Loyalty program"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 font-inter text-left">
      {/* Left Sidebar: FAQ quick links */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-premium p-6 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-poppins font-bold text-sm text-textDark">FAQ Topics</h3>
          </div>
          <div className="space-y-2">
            {faqTopics.map((topic) => (
              <button key={topic} onClick={() => handleSendMessage(topic)}
                className="w-full text-left px-4 py-2.5 bg-slate-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 hover:text-primary text-textMuted text-xs font-medium rounded-xl transition-all font-poppins">
                {topic}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-5 text-white text-left space-y-2">
          <Bot className="h-7 w-7" />
          <h4 className="font-poppins font-bold text-sm">BiteCraft Assistant</h4>
          <p className="text-[11px] text-white/80 font-light leading-relaxed">
            Ask me anything — track orders, discover menu items, check specials, or report an issue. I'm available 24/7.
          </p>
          <Link to="/track-order" className="mt-2 block text-center bg-white/20 hover:bg-white/30 border border-white/20 rounded-xl py-2 text-[11px] font-bold transition-colors">
            Track Your Order →
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="lg:col-span-9 flex flex-col bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden" style={{ height: '75vh', minHeight: '500px' }}>
        {/* Chat Header */}
        <div className="p-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary text-white rounded-2xl"><Bot className="h-5 w-5" /></div>
            <div>
              <h1 className="font-poppins font-bold text-lg text-textDark">BiteCraft Assistant</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-textMuted">Online · AI-Powered Customer Support</span>
              </div>
            </div>
          </div>
          <button onClick={clearChat} className="p-2 hover:bg-slate-100 rounded-xl text-textMuted hover:text-textDark transition-colors flex items-center gap-1.5 text-xs font-semibold font-poppins">
            <RefreshCw className="h-4 w-4" /> Clear
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-5 overflow-y-auto bg-slate-50/40 custom-scrollbar space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div className="flex gap-2.5 items-end max-w-[80%]">
                {msg.sender === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'bot'
                    ? 'bg-white text-textDark border border-gray-100 rounded-bl-none shadow-sm'
                    : 'bg-primary text-white rounded-br-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-[9px] mt-1 block ${msg.sender === 'bot' ? 'text-textMuted' : 'text-white/70'}`}>
                    {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2.5 items-center">
                <div className="h-8 w-8 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                <div className="px-4 py-3 bg-white border border-gray-100 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto custom-scrollbar shrink-0">
          {quickPrompts.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => handleSendMessage(label)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 hover:text-primary text-[11px] text-textMuted font-medium rounded-full whitespace-nowrap transition-all font-poppins flex items-center gap-1 shrink-0">
              <Icon className="h-3 w-3" /> {label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
          className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message or Order ID..."
            className="flex-grow px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
          <button type="submit" className="p-3 bg-primary hover:bg-primary-hover text-white rounded-2xl transition-colors shadow-md shadow-orange-500/15">
            <Send className="h-5 w-5" />
          </button>
        </form>

        <div className="px-4 py-2 bg-slate-50 border-t border-gray-100 text-[10px] text-center text-textMuted shrink-0">
          Powered by BiteCraft AI Core v2.0 · Responses may not always be 100% accurate.
        </div>
      </div>
    </div>
  );
}
