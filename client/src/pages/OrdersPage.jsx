import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import { checkoutService } from '../services/checkoutService';
import OrderCard from '../components/OrderCard';
import toast from 'react-hot-toast';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await checkoutService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (!orders) {
  return (
    <div className="w-full flex justify-center py-12 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-12 text-center max-w-lg w-full">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You have no orders
        </h2>
        <p className="text-gray-600 mb-6">
          All your future orders will appear here.
        </p>
        <Link
          to="/cart"
          className="inline-block bg-blue-600 text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-2 text-gray-600">
            View all your past orders and track their status
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-red-800 font-medium">Error Loading Orders</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            <p className="text-gray-600">
              Total Orders: <span className="font-semibold">{orders.length}</span>
            </p>
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              No Orders Yet
            </h2>
            <p className="mt-2 text-gray-600">
              You haven't placed any orders. Start shopping to see your order history!
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
