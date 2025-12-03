import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-[#f5f1ea]">
      <div className="md:p-10 p-4 space-y-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-taupe-700">Orders</h2>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white rounded-full 
                       bg-gradient-to-r from-taupe-600 to-beige-700
                       hover:from-beige-700 hover:to-taupe-600
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src={assets.refresh_icon}
              alt="refresh"
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No orders found</p>
          </div>
        ) : (
          orders.map(
            (order, index) =>
              order && (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-2xl 
                             border border-[#d6c8b8] bg-white shadow-md hover:shadow-lg transform hover:scale-105 
                             transition-all duration-300"
                >
                  <div className="flex gap-5 max-w-80">
                    <img
                      className="w-12 h-12 object-cover"
                      src={assets.box_icon}
                      alt="boxIcon"
                    />
                    <div>
                      {order.items &&
                        order.items.map((item, idx) => (
                          <div key={idx} className="flex flex-col">
                            <p className="font-medium text-taupe-700">
                              {item.product?.name || 'Product Name Not Available'}{' '}
                              <span className="text-[#a1887f]">
                                x {item.quantity || 0}
                              </span>
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="text-sm md:text-base text-[#7a6a5f] space-y-1">
                    <p className="text-taupe-800">
                      {order.address?.firstName || 'N/A'}{' '}
                      {order.address?.lastName || 'N/A'}
                    </p>
                    <p>
                      {order.address?.street || 'N/A'},{' '}
                      {order.address?.city || 'N/A'}
                    </p>
                    <p>
                      {order.address?.state || 'N/A'},{' '}
                      {order.address?.zipcode || 'N/A'},{' '}
                      {order.address?.country || 'N/A'}
                    </p>
                    <p>{order.address?.phone || 'N/A'}</p>
                  </div>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
