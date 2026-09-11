const BASE_URL = 'https://online-food-order-zwe3.onrender.com/api';

// Helper to get token
export const getAuthToken = () => localStorage.getItem('food_order_jwt');

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('food_order_jwt', token);
  } else {
    localStorage.removeItem('food_order_jwt');
  }
};

export const getStoredUser = () => {
  const user = localStorage.getItem('food_order_user');
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem('food_order_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('food_order_user');
  }
};

// Generic fetch wrapper with Authorization header
async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

// API Functions
export const api = {
  // Authentication
  login: async (username, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (data.token) {
      setAuthToken(data.token);
      setStoredUser({
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        role: data.role
      });
    }
    return data;
  },

  register: async (userData) => {
    return await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  getCurrentUser: async () => {
    return await request('/auth/me');
  },

  logout: () => {
    setAuthToken(null);
    setStoredUser(null);
  },

  // Restaurants
  getRestaurants: async () => {
    return await request('/restaurants');
  },

  getFeaturedRestaurants: async () => {
    return await request('/restaurants/featured');
  },

  // Food Items
  getAllFoods: async () => {
    return await request('/foods');
  },

  getFoodsByCategory: async (category) => {
    if (!category || category === 'All') {
      return await request('/foods');
    }
    return await request(`/foods/category/${encodeURIComponent(category)}`);
  },

  getFoodsByRestaurant: async (restaurantId) => {
    return await request(`/foods/restaurant/${restaurantId}`);
  },

  searchFoods: async (query) => {
    return await request(`/foods/search?q=${encodeURIComponent(query)}`);
  },

  // Orders
  placeOrder: async (orderPayload) => {
    return await request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
  },

  getMyOrders: async () => {
    return await request('/orders/my-orders');
  },

  updateOrderStatus: async (orderId, status) => {
    return await request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }
};
