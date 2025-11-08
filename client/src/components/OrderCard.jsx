import { useState } from "react";
import { Link } from "react-router-dom";

function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.orderId}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">
              ₹{order.total.toLocaleString("en-IN")}
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-6">
        <div className="space-y-3">
          {order.cartItems
            .slice(0, isExpanded ? order.cartItems.length : 2)
            .map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} × ₹
                    {item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{item.total.toLocaleString("en-IN")}
                </p>
              </div>
            ))}
        </div>

        {/* Expand/Collapse Button */}
        {order.cartItems.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Show less
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                View {order.cartItems.length - 2} more items
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        )}

        {/* Customer Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="font-medium text-gray-900">{order.userInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">
                {order.userInfo.email}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/orders/${order.orderId}`}
          className="mt-6 block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          View Order Details
        </Link>
      </div>
    </div>
  );
}

export default OrderCard;
