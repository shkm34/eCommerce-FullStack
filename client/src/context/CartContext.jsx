import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subTotal: 0 });
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // update cart count when cart changes
  useEffect(() => {
    const count = cart.items?.reduce((total, item) => total + item.quantity, 0) || 0;
    setCartCount(count);
  }, [cart]);

  // fetch cart data
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCart(response.data || { items: [], subTotal: 0 });
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await cartService.addToCart(productId, quantity);
      setCart(response.data);
      toast.success('Item added to cart!');
      return response;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add item to cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await cartService.updateCartItem(itemId, quantity);
      setCart(response.data);
      toast.success('Cart updated!');
      return response;
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(error.message || 'Failed to update cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await cartService.removeFromCart(itemId);
      setCart(response.data);
      toast.success('Item removed from cart');
      return response;
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error(error.message || 'Failed to remove item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.clearCart();
      setCart(response.data);
      toast.success('Cart cleared!');
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error(error.message || 'Failed to clear cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.subTotal || 0;
  };

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
