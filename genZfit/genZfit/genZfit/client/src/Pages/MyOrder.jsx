import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get(`/api/order/user?userId=${user._id}`);
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  // Define theme colors (easily adjustable)
  const theme = {
    bg: "bg-[#fffaf0]",
    cardBg: "bg-white",
    border: "border-[#e8dccb]",
    accent: "#b5835a",
    textPrimary: "#3a3a3a",
    textSecondary: "#6a6a6a",
    statusDelivered: "text-green-700",
    statusCancelled: "text-red-600",
    statusPending: "text-[#b5835a]",
  };

  return (
    <div className={`mt-24 px-4 md:px-10 lg:px-20 pb-20 ${theme.bg} min-h-screen`}>
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold uppercase ${theme.textPrimary}`}>
          My <span style={{ color: theme.accent }}>Orders</span>
        </h2>
        <div className="mt-2 w-20 h-1 rounded-full mx-auto" style={{ backgroundColor: theme.accent }} />
      </div>

      {/* No Orders */}
      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders yet.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className={`shadow-md border rounded-xl mb-10 overflow-hidden ${theme.cardBg} ${theme.border}`}
          >
            {/* Order Header */}
            <div className={`px-6 py-4 flex flex-wrap md:justify-between gap-4 text-sm font-medium ${theme.textSecondary} bg-[#f9f4ee]`}>
              <span>
                Order ID: <span className={`font-semibold ${theme.textPrimary}`}>{order._id}</span>
              </span>
              <span>
                Payment: <span className="capitalize">{order.paymentType}</span>
              </span>
              <span>
                Total: <span className={`font-semibold ${theme.textPrimary}`}>{currency}{order.amount}</span>
              </span>
              <span>
                Date: <span className="text-[#5c5c5c]">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </span>
            </div>

            {/* Order Items */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 flex flex-col md:flex-row md:items-center gap-6 ${order.items.length !== idx + 1 ? "border-b border-[#f0e6d8]" : ""}`}
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-20 h-20 p-2 rounded-lg border ${theme.border} ${theme.bg}`}>
                    <img
                      src={item.product?.images?.[0] || item.product?.image?.[0] || '/placeholder.png'}
                      alt={item.product?.name || 'Product'}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.png'; }}
                    />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>{item.product?.name}</h3>
                    <p className={`text-sm ${theme.textSecondary}`}>Category: {item.product?.category || "N/A"}</p>
                  </div>
                </div>

                {/* Quantity & Status */}
                <div className={`flex flex-col text-sm min-w-[140px] ${theme.textSecondary}`}>
                  <span>Quantity: <span className={`font-medium ${theme.textPrimary}`}>{item.quantity}</span></span>
                  <span>
                    Status:{" "}
                    <span className={`font-medium ${
                      order.status === "Delivered"
                        ? theme.statusDelivered
                        : order.status === "Cancelled"
                        ? theme.statusCancelled
                        : theme.statusPending
                    }`}>
                      {order.status || "Processing"}
                    </span>
                  </span>
                </div>

                {/* Price */}
                <div className={`text-lg font-bold`} style={{ color: theme.accent }}>
                  {currency} {( (item.product?.offerPrice ?? item.product?.offerprice ?? item.product?.price ?? 0) * (Number(item.quantity) || 0) ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder;
