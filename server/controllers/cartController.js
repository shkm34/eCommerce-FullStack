import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//  Add item to cart
// route -  POST /api/cart
//  Public
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity are required",
            });
        }

        // Validate quantity
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} items available in stock`,
            });
        }

        // Find or create cart for mock user
        const userId = "guest-user-001";
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // if product already exists in cart
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if product already in cart
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;

            if (product.stock < newQuantity) {
                return res.status(400).json({
                    success: false,
                    message: `Cannot add more. Only ${product.stock} items available`,
                });
            }

            cart.items[existingItemIndex].quantity = newQuantity;
            cart.items[existingItemIndex].total = product.price * newQuantity;
        } else {
            // Add new item to cart
            cart.items.push({
                productId: product._id,
                quantity,
                price: product.price,
                total: product.price * quantity,
            });
        }

        // Calculate subtotal
        cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);

        await cart.save();

        // Populate product details for response
        await cart.populate("items.productId");

        res.status(201).json({
            success: true,
            message: "Item added to cart successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding item to cart",
            error: error.message,
        });
    }
};

// Get cart
//route - GET /api/cart
// Public
export const getCart = async (req, res) => {
    try {
        const userId = "guest-user-001";
        let cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({
                success: true,
                data: {
                    items: [],
                    subTotal: 0,
                },
            });
        }

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching cart",
            error: error.message,
        });
    }
};

//  Update cart item quantity
// route - PUT /api/cart/:id
//  Public
export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params; // Cart item ID
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        const userId = "guest-user-001";
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Find the item in cart
        const itemIndex = cart.items.findIndex(
            (item) => item._id.toString() === id
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        // Check product stock
        const product = await Product.findById(cart.items[itemIndex].productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} items available in stock`,
            });
        }

        // Update quantity and total
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].total = product.price * quantity;

        // Recalculate subtotal
        cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);

        await cart.save();
        await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating cart item",
            error: error.message,
        });
    }
};

//  Remove item from cart
// route - DELETE /api/cart/:id
// Public
export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params; // Cart item ID
        const userId = "guest-user-001";

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Find item index
        const itemIndex = cart.items.findIndex(
            (item) => item._id.toString() === id
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        // Remove item from cart
        cart.items.splice(itemIndex, 1);

        // Recalculate subtotal
        cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);

        await cart.save();
        await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing item from cart",
            error: error.message,
        });
    }
};

//  Clear entire cart
// route - DELETE /api/cart
// Public
export const clearCart = async (req, res) => {
    try {
        const userId = "guest-user-001";

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = [];
        cart.subTotal = 0;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error clearing cart",
            error: error.message,
        });
    }
};
