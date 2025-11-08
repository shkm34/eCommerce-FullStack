import Cart from '../models/Cart.js';
import Order from '../models/Oder.js';
import Product from '../models/Product.js';

// Generate unique order ID
const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
};

// Process checkout and create order
// routePOST /api/checkout
//   Public
export const processCheckout = async (req, res) => {
    try {

        const { name, email } = req.body

        // validate required fields
        if (!name || !email) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Name And Email are required'
                }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // get user cart
        const userId = 'guest-user-001'
        const cart = await Cart.findOne({ userId }).populate('items.productId')

        // check if cart is not empty
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty. Cannot proceed with checkout'
            })
        }

        // verify for stock availablity of items in cart
        for (const item of cart.items) {
            const product = await Product.findById(item.productId._id)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ${item.productId.name} not found`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}. Only ${product.stock} available`
                });
            }
        }

        // prepare cart items
        const orderItems = cart.items.map(
            item => ({
                productId: item.productId._id,
                name: item.productId.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total
            })
        )
        // generate order id
        const orderId = generateOrderId()
        // create order
        const order = await Order.create({
            orderId,
            cartItems: orderItems,
            total: cart.subTotal,
            userInfo: {
                name,
                email
            }
        })

        // update product stock
        for (const item of cart.items) {
            Product.findByIdAndUpdate(
                item.productId._id,
                {
                    $inc: { stock: -item.quantity }
                }
            )
        }

        // Clear the cart
        cart.items = [];
        cart.subTotal = 0;
        await cart.save();

        // Generate mock receipt
        const receipt = {
            success: true,
            message: 'Order placed successfully',
            receipt: {
                orderId: order.orderId,
                orderDate: order.createdAt,
                customer: {
                    name: order.userInfo.name,
                    email: order.userInfo.email
                },
                items: order.cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total
                })),
                subtotal: order.total,
                tax: 0, // Mock - no tax calculation
                shipping: 0, // Mock - free shipping
                total: order.total,
                paymentMethod: 'Mock Payment (No actual transaction)',
                paymentStatus: 'Completed',
                timestamp: new Date().toISOString()
            }
        };

        res.status(201).json(receipt);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing checkout',
            error: error.message
        });
    }
}

//  Get order by ID
// route -  GET /api/checkout/:orderId
// Public
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// Get all orders
// route - GET /api/checkout
//  Public
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};
