import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Layout from './components/Layout';
import FloatingBot from './components/FloatingBot';

// Client Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import TrackOrder from './pages/TrackOrder';
import ChatbotPage from './pages/ChatbotPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminOrderDetails from './pages/Admin/OrderDetails';
import AdminAnalytics from './pages/Admin/Analytics';

export default function App() {
  return (
    <Router>
      <OrderProvider>
        <CartProvider>
          <Layout>
            <Routes>
              {/* Client Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<Confirmation />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/order/:id" element={<AdminOrderDetails />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
            </Routes>
            
            {/* Global Floating AI Assistant Widget */}
            <FloatingBot />
          </Layout>
        </CartProvider>
      </OrderProvider>
    </Router>
  );
}
