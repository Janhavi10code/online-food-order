import React, { useState, useEffect, useMemo } from 'react';
import { api, getStoredUser } from './api';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CuisineTabs from './components/CuisineTabs';
import RestaurantCard from './components/RestaurantCard';
import FoodCard from './components/FoodCard';
import FoodDetailModal from './components/FoodDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import AuthModal from './components/AuthModal';
import NotificationCenter from './components/NotificationCenter';
import { Sparkles, Utensils, X, ChefHat, Filter, Info, RefreshCw } from 'lucide-react';

export default function App() {
  // Global App States
  const [user, setUser] = useState(getStoredUser());
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtering & Browsing States
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('food_order_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedFoodForDetail, setSelectedFoodForDetail] = useState(null);

  // Toast / Message Notifications System ("show me msg")
  const [notifications, setNotifications] = useState([]);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('food_order_cart', JSON.stringify(cart));
  }, [cart]);

  // Audio / Sound synthesizer for notifications using Web Audio API
  const playChime = (type = 'success') => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const freq = type === 'order' ? 659.25 : type === 'error' ? 220 : 523.25; // E5, A3, or C5
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext might be restricted until user interaction
    }
  };

  // Add Notification Function
  const addNotification = (title, text, type = 'success') => {
    playChime(type);
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newMsg = { id, title, text, type, timestamp: new Date() };

    setNotifications((prev) => [newMsg, ...prev.slice(0, 4)]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  };

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // Initial Load: Fetch Restaurants, Foods and User Profile
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [restData, foodData] = await Promise.all([
        api.getRestaurants().catch(() => []),
        api.getAllFoods().catch(() => []),
      ]);

      setRestaurants(restData);
      setFoods(foodData);

      if (user) {
        api.getMyOrders().then(setOrders).catch(() => {});
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();

    // Welcome Notification
    setTimeout(() => {
      addNotification(
        'Welcome to FeastFlow!',
        'Explore South Indian, Maharashtrian, Chinese & Western culinary specialties with instant 25m delivery.',
        'info'
      );
    }, 1200);
  }, []);

  // Reload user orders when user state changes
  useEffect(() => {
    if (user) {
      api.getMyOrders().then(setOrders).catch(() => {});
    } else {
      setOrders([]);
    }
  }, [user]);

  // Cuisine counts
  const cuisineCounts = useMemo(() => {
    const counts = { All: foods.length };
    foods.forEach((f) => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, [foods]);

  // Filtered Food Items
  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      // 1. Cuisine Filter
      if (activeCuisine !== 'All' && food.category.toLowerCase() !== activeCuisine.toLowerCase()) {
        return false;
      }
      // 2. Selected Restaurant Filter
      if (selectedRestaurant && food.restaurant?.id !== selectedRestaurant.id) {
        return false;
      }
      // 3. Pure Veg Filter
      if (isVegOnly && !food.isVeg) {
        return false;
      }
      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = food.name?.toLowerCase().includes(q);
        const matchesDesc = food.description?.toLowerCase().includes(q);
        const matchesCategory = food.category?.toLowerCase().includes(q);
        const matchesRest = food.restaurant?.name?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesRest) {
          return false;
        }
      }
      return true;
    });
  }, [foods, activeCuisine, selectedRestaurant, isVegOnly, searchQuery]);

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.food.price * item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (food, specialInstructions = '') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.food.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { food, quantity: 1, specialInstructions }];
    });

    addNotification(
      'Added to Cart',
      `"${food.name}" from ${food.restaurant?.name || 'Kitchen'} added to your cart (₹${food.price}).`,
      'success'
    );
  };

  const handleRemoveFromCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.food.id === food.id);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.food.id === food.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.food.id !== food.id);
    });

    addNotification(
      'Cart Updated',
      `Updated quantity for "${food.name}".`,
      'info'
    );
  };

  const handleRemoveItem = (foodId) => {
    const item = cart.find((i) => i.food.id === foodId);
    setCart((prev) => prev.filter((i) => i.food.id !== foodId));
    if (item) {
      addNotification('Removed', `"${item.food.name}" removed from cart.`, 'info');
    }
  };

  const handleUpdateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(foodId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.food.id === foodId ? { ...item, quantity } : item))
      );
    }
  };

  // Auth Handlers
  const handleLoginSuccess = async (username, password) => {
    const authData = await api.login(username, password);
    setUser({
      id: authData.id,
      username: authData.username,
      email: authData.email,
      fullName: authData.fullName,
      phone: authData.phone,
      address: authData.address,
      role: authData.role,
    });

    addNotification(
      'Sign In Successful',
      `Welcome back, ${authData.fullName || authData.username}! Ready to order.`,
      'success'
    );
  };

  const handleRegisterSuccess = async (userData) => {
    await api.register(userData);
    addNotification(
      'Account Created',
      `Welcome ${userData.fullName}! Your account has been registered successfully.`,
      'success'
    );
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    addNotification('Logged Out', 'You have been signed out safely.', 'info');
  };

  // Order Placement & Live Status Tracking
  const handleOrderSuccess = async (orderPayload) => {
    const order = await api.placeOrder(orderPayload);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    // Refresh orders
    const updatedOrders = await api.getMyOrders().catch(() => [order]);
    setOrders(updatedOrders);

    addNotification(
      `Order ${order.orderNumber} Confirmed!`,
      `Your order from ${order.restaurant?.name || 'Restaurant'} has been sent to the chef! ETA: ${order.estimatedDeliveryMinutes || 25} mins.`,
      'order'
    );

    setIsOrdersOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));

      const statusLabels = {
        PREPARING: '🍳 Chef is now preparing your delicious food in the kitchen!',
        OUT_FOR_DELIVERY: '🛵 Delivery hero has picked up your food and is speeding to your address!',
        DELIVERED: '🎉 Order Delivered! Enjoy your meal. Rate your experience!',
      };

      addNotification(
        `Order Update: ${updated.orderNumber}`,
        statusLabels[newStatus] || `Status updated to ${newStatus}`,
        'order'
      );
    } catch (err) {
      addNotification('Update Failed', err.message, 'error');
    }
  };

  // Trigger Demo Notification for User ("show me msg")
  const handleTriggerDemoMsg = () => {
    const demoMsgs = [
      { title: 'Special South Indian Offer!', text: 'Order Ghee Roast Mysore Masala Dosa and get authentic Filter Coffee at 50% off!', type: 'order' },
      { title: 'Maharashtrian Special Alert!', text: 'Piping hot Kolhapuri Kat Misal Pav is trending in Pune right now! Order now.', type: 'success' },
      { title: 'Chinese Wok Master Special!', text: 'Steamed Crystal Dim Sums freshly prepared with hot chili garlic oil.', type: 'info' },
      { title: 'Western Bistro Night!', text: 'Smoked BBQ Double Smash Cheeseburger with crispy loaded fries is ready to ship in 20m.', type: 'order' },
    ];
    const pick = demoMsgs[Math.floor(Math.random() * demoMsgs.length)];
    addNotification(pick.title, pick.text, pick.type);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Stack ("show me msg") */}
      <NotificationCenter
        notifications={notifications}
        onDismiss={handleDismissNotification}
      />

      {/* Main Navbar */}
      <Navbar
        user={user}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isVegOnly={isVegOnly}
        onToggleVeg={() => {
          setIsVegOnly(!isVegOnly);
          addNotification(
            !isVegOnly ? 'Veg Only Enabled' : 'Showing All Dishes',
            !isVegOnly ? 'Showing 100% pure vegetarian authentic dishes.' : 'Showing vegetarian and non-vegetarian delicacies.',
            'info'
          );
        }}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onTriggerDemoMsg={handleTriggerDemoMsg}
      />

      {/* Main Content Area */}
      <main className="container-fluid" style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* Hero Banner with Promotional Offers */}
        <HeroBanner
          activeCuisine={activeCuisine}
          onSelectCuisine={(cuisine) => {
            setActiveCuisine(cuisine);
            setSelectedRestaurant(null);
            window.scrollTo({ top: 580, behavior: 'smooth' });
          }}
        />

        {/* Featured Restaurants Row */}
        <section style={{ margin: '2rem 0' }}>
          <div className="flex-col-mobile text-center-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                Featured <span className="gradient-text">Specialty Kitchens</span>
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Top-rated regional culinary masters with fast preparation and delivery
              </p>
            </div>

            {selectedRestaurant && (
              <button
                onClick={() => setSelectedRestaurant(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
                <span>Clear Restaurant Filter</span>
              </button>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {restaurants.map((rest) => (
              <RestaurantCard
                key={rest.id}
                restaurant={rest}
                isSelected={selectedRestaurant?.id === rest.id}
                onSelect={(r) => {
                  if (selectedRestaurant?.id === r.id) {
                    setSelectedRestaurant(null);
                    addNotification('Showing All Restaurants', 'Showing foods from all kitchens.', 'info');
                  } else {
                    setSelectedRestaurant(r);
                    addNotification(
                      `Filtered by ${r.name}`,
                      `Showing specialty dishes from ${r.name} (${r.deliveryTimeMinutes} min delivery).`,
                      'info'
                    );
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Cuisine Variety Selector */}
        <CuisineTabs
          activeCuisine={activeCuisine}
          onSelectCuisine={(cat) => {
            setActiveCuisine(cat);
            setSelectedRestaurant(null);
          }}
          counts={cuisineCounts}
        />

        {/* Active Filter Status Bar */}
        {(activeCuisine !== 'All' || selectedRestaurant || isVegOnly || searchQuery) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '14px',
              marginBottom: '1.5rem',
              fontSize: '13px',
              color: '#fbbf24',
              flexWrap: 'wrap',
            }}
          >
            <Filter size={15} />
            <span>Active Filters:</span>
            {activeCuisine !== 'All' && (
              <span style={{ background: '#f59e0b', color: '#000000', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>
                {activeCuisine}
              </span>
            )}
            {selectedRestaurant && (
              <span style={{ background: '#3b82f6', color: '#ffffff', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>
                {selectedRestaurant.name}
              </span>
            )}
            {isVegOnly && (
              <span style={{ background: '#10b981', color: '#ffffff', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>
                Veg Only
              </span>
            )}
            {searchQuery && (
              <span style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', padding: '2px 8px', borderRadius: '8px', fontWeight: '700' }}>
                "{searchQuery}"
              </span>
            )}

            <button
              onClick={() => {
                setActiveCuisine('All');
                setSelectedRestaurant(null);
                setIsVegOnly(false);
                setSearchQuery('');
              }}
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        <section>
          <div className="flex-col-mobile text-center-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800' }}>
              {activeCuisine === 'All' ? 'Popular Dishes' : `${activeCuisine} Specialties`}
              <span style={{ fontSize: '15px', color: '#94a3b8', fontWeight: '500', marginLeft: '8px' }}>
                ({filteredFoods.length} {filteredFoods.length === 1 ? 'dish' : 'dishes'} found)
              </span>
            </h2>
          </div>

          {filteredFoods.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'var(--bg-card)',
                borderRadius: '24px',
                border: '1px solid var(--border-glass)',
              }}
            >
              <Utensils size={48} color="#64748b" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                No dishes matched your criteria
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>
                Try switching the cuisine tab, turning off Veg Only, or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setActiveCuisine('All');
                  setSelectedRestaurant(null);
                  setIsVegOnly(false);
                  setSearchQuery('');
                }}
                className="gradient-btn"
                style={{ padding: '10px 24px', borderRadius: '12px', fontSize: '14px' }}
              >
                Show All Dishes
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filteredFoods.map((food) => {
                const cartItem = cart.find((i) => i.food.id === food.id);
                const qty = cartItem ? cartItem.quantity : 0;

                return (
                  <FoodCard
                    key={food.id}
                    food={food}
                    quantityInCart={qty}
                    onAddToCart={(f) => handleAddToCart(f)}
                    onRemoveFromCart={(f) => handleRemoveFromCart(f)}
                    onOpenDetails={(f) => setSelectedFoodForDetail(f)}
                  />
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-glass)',
          background: 'rgba(9, 13, 22, 0.95)',
          padding: '2.5rem 0 1.5rem',
          marginTop: 'auto',
        }}
      >
        <div className="container-fluid footer-flex" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="flex-col-mobile text-center-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="justify-center-mobile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles color="#ffffff" size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                Feast<span className="gradient-text">Flow</span>
              </span>
            </div>

            <div className="justify-center-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#94a3b8' }}>
              <span>South Indian</span>
              <span>•</span>
              <span>Maharashtrian</span>
              <span>•</span>
              <span>Chinese</span>
              <span>•</span>
              <span>Western</span>
            </div>
          </div>

          <div
            className="flex-col-mobile text-center-mobile"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '12px',
              color: '#64748b',
            }}
          >
            <p>© 2026 FeastFlow Gourmet Delivery. Built with Spring Boot 4, Spring Security, MySQL & React.js</p>
            <p>Ready to satisfy your cravings 24/7</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Food Detail Modal */}
      <FoodDetailModal
        food={selectedFoodForDetail}
        onClose={() => setSelectedFoodForDetail(null)}
        onAddToCart={(f, instructions) => {
          handleAddToCart(f, instructions);
          setSelectedFoodForDetail(null);
        }}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        user={user}
        cartItems={cart}
        onOrderSuccess={handleOrderSuccess}
        onRequireAuth={() => {
          setIsCheckoutOpen(false);
          setIsAuthOpen(true);
          addNotification('Sign In Required', 'Please sign in or register to complete checkout.', 'info');
        }}
      />

      {/* 4. Order History & Live Tracking Modal */}
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      {/* 5. Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}
