import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from './db.js';

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 2499,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
  },
  {
    name: 'Smart Watch',
    price: 4999,
    description: 'Fitness tracker with heart rate monitor and GPS',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
  },
  {
    name: 'Laptop Backpack',
    price: 1299,
    description: 'Water-resistant backpack with USB charging port',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'
  },
  {
    name: 'Mechanical Keyboard',
    price: 3499,
    description: 'RGB gaming keyboard with Cherry MX switches',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop'
  },
  {
    name: 'Bluetooth Speaker',
    price: 1899,
    description: 'Portable waterproof speaker with 12-hour playtime',
    thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
  },
  {
    name: 'Wireless Mouse',
    price: 899,
    description: 'Ergonomic wireless mouse with precision tracking',
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop'
  },
  {
    name: 'Phone Stand',
    price: 499,
    description: 'Adjustable aluminum phone stand for desk',
    thumbnail: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop'
  },
  {
    name: 'USB-C Hub',
    price: 1599,
    description: '7-in-1 USB-C hub with HDMI and card reader',
    thumbnail: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products inserted successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
