import { useState } from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setIsUpdating(true);
      await updateQuantity(item._id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      await removeFromCart(item._id);
    } catch (error) {
      console.error("Failed to remove item:", error);
      setIsRemoving(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-3 sm:p-4 flex gap-3 sm:gap-4 transition-opacity ${
        isRemoving ? "opacity-50" : ""
      }`}
    >
      {/* Product Image */}
      <div className="shrink-0">
        <img
          src={item.productId?.thumbnail}
          alt={item.productId?.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
        />
      </div>

      {/* Wrapper for Details & Controls */}

      <div className="flex-1 flex flex-col sm:flex-row">
        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {item.productId?.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item.productId?.description}
          </p>
          <p className="text-base sm:text-lg font-bold text-indigo-600 mt-2">
            ₹{item.price?.toLocaleString("en-IN")}
          </p>
        </div>
        {/* Quantity Controls & Remove Button */}
        <div className="flex flex-col items-start sm:items-end justify-between mt-4 sm:mt-0">
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Remove item"
          >
            <svg
              // Smaller icon on mobile
              className="w-7 h-7 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                // Smaller buttons on mobile
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-indigo-600 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <span className="text-base sm:text-lg font-semibold w-8 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-indigo-600 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <p className="text-base sm:text-lg font-bold text-gray-900 mt-0 sm:mt-2">
              ₹{item.total?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
