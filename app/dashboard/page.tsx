'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiMapPin, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { MdLanguage, MdMenu, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Tomatoes', price: 40, image: '/pexels-julia-nagy-568948-1327838.jpg' },
  { id: 2, name: 'Onion', price: 30, image: '/onion-1430062_1280.jpg' },
  { id: 3, name: 'Paneer', price: 120, image: '/cheese-630511_1280.jpg' },
  { id: 4, name: 'Bell Peppers', price: 50, image: '/bell-peppers-499068_1280.jpg' },
  { id: 5, name: 'Carrots', price: 25, image: '/pexels-chokniti-khongchum-1197604-2280550.jpg' },
  { id: 6, name: 'Maida', price: 22, image: '/pexels-klaus-nielsen-6287581.jpg' },
  { id: 7, name: 'Potatoes', price: 22, image: '/pexels-victorino-2286776.jpg' },
  { id: 8, name: 'Red Pepper', price: 22, image: '/red-pepper-7247194_1280.jpg' },
  { id: 9, name: 'Noodles', price: 22, image: '/noodles.jpg' },
];

const languages = ['English', 'Hindi', 'Marathi', 'Telugu'];

export default function ApnaMandiDashboard() {
  const [cart, setCart] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className={`bg-gray-100 min-h-screen ${sidebarOpen ? 'overflow-hidden' : ''}`}>
      {/* Navbar */}
      <nav className="bg-[#232f3e] text-white px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <MdMenu size={24} />
          </button>
          <div className="text-2xl font-bold text-orange-400">Apna Mandi</div>
          <div className="hidden md:flex items-center text-sm text-gray-300">
            <FiMapPin className="mr-1 text-lg" />
            <div>
              <div>Delivering to Delhi 110001</div>
              <div className="font-semibold hover:text-white cursor-pointer">Update location</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-grow mx-4 hidden md:flex">
  <input
    type="text"
    placeholder="Search fresh fruits, vegetables and more"
    className="w-full px-3 py-2 rounded-l-md focus:outline-none text-black bg-white placeholder-gray-500"
  />
  <button className="bg-orange-400 px-4 rounded-r-md text-white">
    <FiSearch />
  </button>
</div>


        {/* Right */}
        <div className="flex items-center gap-4 text-sm relative">
          {/* Language Selector */}
          <div className="relative cursor-pointer">
            <div className="flex items-center gap-1" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
              <MdLanguage className="text-xl" />
              <span>{selectedLang.slice(0, 2).toUpperCase()}</span>
              {langDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
            {langDropdownOpen && (
              <div className="absolute bg-white text-black top-8 right-0 rounded shadow z-50">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hover:underline cursor-pointer">
            <div>Hello, Sign in</div>
            <div className="font-bold">Account & Lists</div>
          </div>

          <div className="hover:underline cursor-pointer">
            <div>Explore</div>
            <div className="font-bold">Our Plans</div>
          </div>

          <div className="relative cursor-pointer">
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 rounded-full px-1">
              {cart.length}
            </span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-72 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="bg-[#232f3e] text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiUser className="text-xl" />
            <p className="font-semibold">Hello, Sign in</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white text-xl">
            <FiX />
          </button>
        </div>

        <div className="p-4 space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">Fresh Picks</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Image src="/vegetables.jpg" alt="Vegetables" width={24} height={24} />
                <span>Vegetables</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image src="/fruits.jpg" alt="Fruits" width={24} height={24} />
                <span>Fruits</span>
              </li>
              <li>Organic Produce</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-2">Bulk Buying</h3>
            <ul className="space-y-2">
              <li>Vendor Orders</li>
              <li>Subscription Plans</li>
              <li>Monthly Combos</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Help & Info</h3>
            <ul className="space-y-2">
              <li>Track Orders</li>
              <li>Customer Service</li>
              <li>Explore Plans</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Backdrop when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-400 backdrop-sm z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Apna Mandi</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white p-4 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="flex-grow">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-md mb-3 h-[200px] object-cover"
                />
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-700 font-medium">₹{product.price} /kg</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
