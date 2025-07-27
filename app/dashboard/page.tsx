'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Tomatoes',
    price: 40,
    image:'/pexels-julia-nagy-568948-1327838.jpg',
  },
  {
    id: 2,
    name: 'Onion',
    price: 30,
    image:
      '/onion-1430062_1280.jpg',
  },
  {
    id: 3,
    name: 'Paneer',
    price: 120,
    image:
      'cheese-630511_1280.jpg',
  },
  {
    id: 4,
    name: 'Bell Peppers',
    price: 50,
    image:
      'bell-peppers-499068_1280.jpg',
  },
  {
    id: 5,
    name: 'Carrots',
    price: 25,
    image:
      'pexels-chokniti-khongchum-1197604-2280550.jpg',
  },
  {
    id: 6,
    name: 'Maida',
    price: 22,
    image:
      'pexels-klaus-nielsen-6287581.jpg',
  },
  {
    id: 7,
    name: 'Potatoes',
    price: 22,
    image:
      'pexels-victorino-2286776.jpg',
  },
  {
    id: 8,
    name: 'Red Pepper',
    price: 22,
    image:
      'red-pepper-7247194_1280.jpg',
  },
  {
    id: 9,
    name: 'Noodles',
    price: 22,
    image:
      '/noodles.jpg',
  },
];

export default function ApnaMandiPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Apna Mandi 🛒</div>
          <div className="flex gap-6 text-lg">
            <a href="#" className="hover:text-yellow-300">Home</a>
            <a href="#" className="hover:text-yellow-300">Cart ({cart.length})</a>
          </div>
        </div>
      </nav>

      {/* Hero & Products */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to Apna Mandi
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
key={product.id}
  // 👇 1. Make the card a vertical flex container
  className="flex flex-col bg-white p-4 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all"
>
  {/* 👇 2. Wrap content in a div that can grow */}
  <div className="flex-grow">
    <img
      src={product.image}
      alt={product.name}
      width={300}
      height={200}
      className="rounded-md mb-3 h-[200px] object-cover"
    />
    <h2 className="font-semibold text-lg">{product.name}</h2>
    <p className="text-gray-700 font-medium">₹{product.price} /kg</p>
  </div>

  {/* This button will now be pushed to the bottom */}
  <button
    onClick={() => addToCart(product)}
    className="mt-3 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg transition"
  >
    Add to Cart
  </button>
</div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">
          Your Cart ({cart.length})
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span>{item.name}</span>
                <span className="font-medium text-green-700">₹{item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
