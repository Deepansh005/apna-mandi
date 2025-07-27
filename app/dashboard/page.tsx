'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
// Note: Make sure you have installed react-icons
// Run: npm install react-icons
import { FiMapPin, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { MdLanguage, MdMenu, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  unit?: string; // Added optional 'unit' property
}

// The hardcoded 'products' array has been removed to fix the error.

export default function ApnaMandiPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const languageOptions = ['English', 'Hindi', 'Marathi', 'Tamil', 'Bengali'];

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('products').select<"*", Product>("*");

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className={`bg-slate-50 min-h-screen ${sidebarOpen ? 'overflow-hidden' : ''}`}>
      {/* Navbar */}
      <nav className="bg-emerald-800 text-white px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-30">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-1 rounded-md hover:bg-emerald-700" title="Open menu">
            <MdMenu size={24} />
          </button>
          <Link href="/dashboard" className="text-2xl font-bold text-amber-400">Apna Mandi</Link>
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
          <button className="bg-amber-500 px-4 rounded-r-md text-white hover:bg-amber-600" title="Search">
            <FiSearch aria-label="Search" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm relative">
          {/* Language Selector */}
          <div className="relative">
            <button className="flex items-center gap-1 cursor-pointer" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
              <MdLanguage className="text-xl" />
              <span>{selectedLang.slice(0, 2).toUpperCase()}</span>
              {langDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            {langDropdownOpen && (
              <div className="absolute bg-white text-black top-8 right-0 rounded shadow-lg z-50">
                {languageOptions.map((lang) => (
                  <div key={lang} onClick={() => { setSelectedLang(lang); setLangDropdownOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/account" className="hover:underline cursor-pointer text-left">
            <div>Hello, Sign in</div>
            <div className="font-bold">Account & Lists</div>
          </Link>
          <Link href="/plans" className="hover:underline cursor-pointer text-left">
            <div>Explore</div>
            <div className="font-bold">Our Plans</div>
          </Link>
          <Link href="/cart" className="relative cursor-pointer">
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 rounded-full px-1.5 py-0.5">
              {cart.length}
            </span>
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-72 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiUser className="text-xl" />
            <p className="font-semibold">Hello, Sign in</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white text-xl p-1 rounded-full hover:bg-emerald-800" title="Close menu">
            <FiX />
          </button>
        </div>
        <nav className="p-4 space-y-1 text-base">
            <h3 className="font-bold text-gray-800 mb-2 px-3 text-sm uppercase">Shop By Category</h3>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Fresh Picks</Link>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Vegetables</Link>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Fruits</Link>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Organic Produce</Link>
            <hr className="my-4"/>
            <h3 className="font-bold text-gray-800 mb-2 px-3 text-sm uppercase">Vendor Tools</h3>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Bulk Buying</Link>
            <Link href="/orders" className="block py-2 px-3 rounded-md hover:bg-gray-100">My Orders</Link>
            <Link href="/plans" className="block py-2 px-3 rounded-md hover:bg-gray-100">Subscription Plans</Link>
            <hr className="my-4"/>
            <h3 className="font-bold text-gray-800 mb-2 px-3 text-sm uppercase">Help & Settings</h3>
            <Link href="/account" className="block py-2 px-3 rounded-md hover:bg-gray-100">Your Account</Link>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Customer Service</Link>
            <Link href="#" className="block py-2 px-3 rounded-md hover:bg-gray-100">Sign Out</Link>
        </nav>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Today&#39;s Fresh Arrivals</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col bg-white p-4 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all">
              <div className="flex-grow">
                <Image
                  src={`/${product.image}`}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-md mb-3 h-[200px] w-full object-cover"
                />
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-700 font-semibold">₹{product.price} / {product.unit || 'kg'}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg font-semibold transition"
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
