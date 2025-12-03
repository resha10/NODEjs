import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    removeFromeCart,
    cartItems,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    SetCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectAddress, setSelectAdress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const currency = "₹"; // Use INR

  const getCart = () => {
    const tempArray = Object.keys(cartItems)
      .map((key) => {
        const product = products.find((item) => item._id === key);
        if (product) product.quantity = cartItems[key];
        return product;
      })
      .filter(Boolean);
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.address);
        if (data.address.length > 0) setSelectAdress(data.address[0]);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const PlaceOrder = async () => {
    try {
      if (!selectAddress) return toast.error("Please select address");

      const payload = {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectAddress._id,
      };

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", payload);
        if (data.success) {
          toast.success(data.message);
          SetCartItems({});
          navigate("/my-orders");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post("/api/order/stripe", payload);
        if (data.success) {
          SetCartItems({});
          window.location.replace(data.url);
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  if (!products.length || !cartItems) return null;

  return (
    <section className="bg-[#f4f1ed] min-h-screen py-16 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 max-w-4xl bg-white border border-[#e5e3e0] p-6 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-[#2c2c2c] mb-6">
            Shopping Cart{" "}
            <span className="text-[#b5835a] text-base font-medium">
              ({getCartCount()} {getCartCount() === 1 ? "Item" : "Items"})
            </span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-[#555] text-base font-medium pb-2 border-b border-gray-300">
            <p className="text-left">Product Details</p>
            <p className="text-center">Price</p>
            <p className="text-center">Action</p>
          </div>

          {cartArray.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-700 text-sm md:text-base py-4 border-b border-[#f0efed]"
            >
              <div className="flex items-center gap-5">
                <div
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`
                    );
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-[#ddd] rounded hover:scale-105 transition-transform bg-[#f7f6f2]"
                >
                  <img
                    src={
                      product.images?.length
                        ? product.images[0]
                        : product.image
                        ? product.image
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    className="max-w-full h-full object-cover rounded"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#2c2c2c]">{product.name}</p>
                  <div className="text-gray-500/80 flex items-center gap-3 mt-1 text-sm">
                    <p>Type: {product.category}</p>
                    <div className="flex items-center gap-1">
                      <p>Qty:</p>
                      <select
                        onChange={(e) =>
                          updateCartItem(product._id, Number(e.target.value))
                        }
                        value={cartItems[product._id]}
                        className="border border-gray-300 rounded px-1 py-0.5 outline-none focus:ring-2 focus:ring-[#b5835a]"
                      >
                        {Array(Math.max(cartItems[product._id], 9))
                          .fill("")
                          .map((_, idx) => (
                            <option key={idx} value={idx + 1}>
                              {idx + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-[#b5835a] font-medium">
                {currency}
                {((product.offerPrice || product.price || 0) * product.quantity).toLocaleString(
                  "en-IN"
                )}
              </p>

              {/* Updated Action Button */}
              <button
                onClick={() => removeFromeCart(product._id)}
                className="mx-auto hover:scale-110 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="flex items-center gap-2 text-[#b5835a] font-medium mt-6 hover:translate-x-1 transition-transform"
          >
            <img
              src={assets.arrow_right_icon_colored}
              alt="arrow"
              className="w-5 h-5"
            />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="max-w-[360px] w-full bg-white border border-[#e5e3e0] p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#2c2c2c] mb-4">
            Order Summary
          </h2>
          <div className="space-y-5 text-[#3a3a3a]">
            {/* Address */}
            <div>
              <p className="text-sm font-medium uppercase mb-2 text-[#b5835a]">
                Delivery Address
              </p>
              <div className="relative flex justify-between items-start">
                <p className="text-gray-600">
                  {selectAddress
                    ? `${selectAddress.street}, ${selectAddress.city}, ${selectAddress.state}, ${selectAddress.country}`
                    : "No address found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-[#b5835a] hover:underline"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute top-10 left-0 w-full bg-white border border-gray-300 text-sm rounded shadow-md z-10">
                    {addresses.map((address, index) => (
                      <p
                        key={address.id || index}
                        onClick={() => {
                          setSelectAdress(address);
                          setShowAddress(false);
                        }}
                        className="p-2 hover:bg-[#f4f1ed] cursor-pointer"
                      >
                        {address.street}, {address.city}, {address.state},{" "}
                        {address.country}
                      </p>
                    ))}
                    <p
                      onClick={() => navigate("/add-address")}
                      className="text-[#b5835a] text-center p-2 cursor-pointer hover:bg-[#f4f1ed] rounded-b"
                    >
                      Add Address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm font-medium uppercase mt-4 mb-1 text-[#b5835a]">
                Payment Method
              </p>
              <select
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b5835a]"
              >
                <option value="COD">Cash On Delivery</option>
              </select>
            </div>

            <hr className="border-[#e5e3e0] my-3" />

            {/* Totals */}
            <div className="space-y-2 text-gray-700 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {getCartAmount().toLocaleString("en-IN")}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>
                  {currency}
                  {(getCartAmount() * 0.02).toLocaleString("en-IN")}
                </span>
              </p>
              <p className="flex justify-between text-lg font-semibold mt-3 text-[#2c2c2c]">
                <span>Total Amount:</span>
                <span>
                  {currency}
                  {(getCartAmount() * 1.02).toLocaleString("en-IN")}
                </span>
              </p>
            </div>

            <button
              onClick={PlaceOrder}
              className="btn w-full py-3 mt-4 uppercase"
            >
              {paymentOption === "COD"
                ? "Place Order"
                : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
