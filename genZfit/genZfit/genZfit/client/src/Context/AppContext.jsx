import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [showUserLogin, SetShowUserLogin] = useState(false);
  const [products, SetProducts] = useState([]);
  const [cartItems, SetCartItems] = useState({});
  const [searchQuery, SetSearchQuery] = useState({});

  // Fetch seller auth
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
        setSellerProfile(data.profile || null);
      } else {
        setIsSeller(false);
        setSellerProfile(null);
      }
    } catch (error) {
      setIsSeller(false);
      setSellerProfile(null);
    }
  };

  // Fetch user auth
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
        SetCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
        SetCartItems({});
      }
    } catch (error) {
      setUser(null);
      SetCartItems({});
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        const normalizedProducts = data.products.map(product => ({
          ...product,
          inStock: product.stock > 0,
          offerprice: product.offerPrice || product.offerprice || product.price,
          image: product.images?.[0] || product.image || '',
        }));
        SetProducts(normalizedProducts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cart functions
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    SetCartItems(cartData);
    toast.success("Added To Cart.");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    SetCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      SetCartItems(cartData);
      toast.success("Removed from Cart");
    }
  };

  const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find(p => p._id === id);
      if (product) total += (product.offerprice || product.price) * qty;
      return total;
    }, 0);
  };

  // Initial fetch
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // Update cart in DB when user changes
  useEffect(() => {
    if (!user) return;
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    updateCart();
  }, [cartItems]);

  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        sellerProfile,
        setSellerProfile,
        showUserLogin,
        SetShowUserLogin,
        products,
        SetProducts,
        cartItems,
        SetCartItems,
        searchQuery,
        SetSearchQuery,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        getCartCount,
        getCartAmount,
        fetchProducts,
        axios,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
