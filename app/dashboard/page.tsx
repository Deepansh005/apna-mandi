'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Poppins } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { FiMapPin, FiSearch, FiShoppingCart, FiUser, FiX, FiZap } from 'react-icons/fi';
import { MdMenu, MdStar, MdStarHalf, MdStarOutline } from 'react-icons/md';

// Font Configuration
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

// Interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  unit?: string;
  rating?: number;
  reviewCount?: number;
  tag?: 'Best Seller' | 'Organic' | 'New';
}

// Reusable Star Rating Component
const StarRating = ({ rating = 0, reviewCount = 0 }: { rating?: number; reviewCount?: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className="flex items-center mt-2">
      {[...Array(fullStars)].map((_, i) => <MdStar key={`full-${i}`} className="text-amber-400" />)}
      {halfStar === 1 && <MdStarHalf className="text-amber-400" />}
      {[...Array(emptyStars)].map((_, i) => <MdStarOutline key={`empty-${i}`} className="text-amber-400" />)}
      <a href="#" className="text-gray-500 hover:underline ml-2 text-sm font-medium">
        {reviewCount} ratings
      </a>
    </div>
  );
};

export default function ApnaMandiPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on desktop

  useEffect(() => {
    // On mobile, you might want to default to closed
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('products').select<"*", Product>("*");

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        const tags: Product['tag'][] = ['Best Seller', 'Organic', 'New'];
        const productsWithEnhancements = data.map((product, index) => ({
          ...product,
          rating: parseFloat((Math.random() * (5 - 3.8) + 3.8).toFixed(1)),
          reviewCount: Math.floor(Math.random() * 300) + 20,
          tag: index < 3 ? tags[index] : undefined,
        }));
        setProducts(productsWithEnhancements);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const deals = products.slice(0, 3);
  const allProducts = products.slice(3);

  return (
    <div className={`${poppins.className} bg-gray-100 h-screen flex flex-col`}>
      {/* --- NAVBAR --- */}
      <nav className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between shadow-lg z-20 flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-full hover:bg-gray-700 transition-colors" title="Toggle menu" aria-label="Toggle menu">
            <MdMenu size={24} />
          </button>
          <Link href="/dashboard" className="text-2xl font-bold text-green-400">Apna Mandi</Link>
        </div>
        <div className="flex-grow mx-4 hidden md:flex">
          <input type="text" placeholder="Search for fresh produce..." className="w-full px-4 py-2 rounded-l-full focus:outline-none text-black bg-gray-200 focus:bg-white focus:ring-2 focus:ring-green-400 transition" />
          <button className="bg-green-500 px-5 rounded-r-full text-white hover:bg-green-600 transition-colors" title="Search"><FiSearch size={20} /></button>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors" title="Search" aria-label="Search"><FiSearch size={22} /></button>
          <Link href="/account" className="hidden lg:block hover:text-green-400 transition-colors font-semibold">Account</Link>
          <Link href="/plans" className="hidden lg:block hover:text-green-400 transition-colors font-semibold">Plans</Link>
          <Link href="/cart" className="relative cursor-pointer p-2 rounded-full hover:bg-gray-700 transition-colors">
            <FiShoppingCart size={24} />
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span key={cart.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }} className="absolute -top-1 -right-1 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </nav>

      {/* This is the main container for the sidebar and content */}
      <div className="flex flex-grow overflow-hidden">
        {/* --- SIDEBAR (Push Style) --- */}
        <aside className={`flex-shrink-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
          <div className="h-full flex flex-col">
            <div className="bg-gray-900 text-white p-5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center space-x-3"><div className="p-2 bg-green-500 rounded-full"><FiUser className="text-xl" /></div><p className="font-semibold text-lg">Hello, Sign in</p></div>
              <button onClick={() => setSidebarOpen(false)} className="text-white text-xl p-2 rounded-full hover:bg-gray-700 transition-colors" title="Close menu"><FiX /></button>
            </div>
            <nav className="p-4 space-y-2 text-base font-medium overflow-y-auto">
              <h3 className="font-bold text-gray-500 mb-2 px-3 text-sm uppercase tracking-wider">Shop By Category</h3>
              <Link href="#" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">Fresh Picks</Link>
              <Link href="#" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">Vegetables</Link>
              <Link href="#" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">Fruits</Link>
              <hr className="my-4"/>
              <h3 className="font-bold text-gray-500 mb-2 px-3 text-sm uppercase tracking-wider">Help & Settings</h3>
              <Link href="/account" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">Your Account</Link>
              <Link href="/orders" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">My Orders</Link>
              <Link href="/plans" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">Subscription Plans</Link>
              <Link href="#" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">Sign Out</Link>
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT (Scrollable) --- */}
        <main className="flex-grow overflow-y-auto p-6 md:p-8">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2"><FiZap className="text-green-500" /> Deals of the Day</h2>
            <p className="text-gray-500 mb-6">Don&apos;t miss out on these limited-time offers!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {deals.map((product) => (
                <motion.div key={product.id} whileHover={{ y: -8, scale: 1.03 }} className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all group">
                  <div className="relative">
                    <Image src={`/${product.image}`} alt={product.name} width={400} height={300} className="h-56 w-full object-cover"/>
                    {product.tag && <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-3 rounded-full">{product.tag}</div>}
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{product.name}</h3>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                    <p className="text-gray-800 text-2xl font-bold my-4">₹{product.price}<span className="text-base font-normal text-gray-500"> / {product.unit || 'kg'}</span></p>
                    <button onClick={() => addToCart(product)} className="mt-auto bg-green-500 text-white font-bold w-full py-3 rounded-lg group-hover:bg-gray-800 transition-colors">Add to Cart</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">All Fresh Produce</h2>
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }} className="flex flex-col gap-4">
              {allProducts.map((product) => (
                <motion.div key={product.id} variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -50 } }} whileHover={{ scale: 1.01, boxShadow: "0px 10px 20px rgba(0,0,0,0.08)" }} className="flex flex-col md:flex-row items-center bg-white p-4 rounded-xl shadow-md w-full border border-transparent hover:border-green-400 transition-all">
                  <Image src={`/${product.image}`} alt={product.name} width={150} height={150} className="rounded-lg h-32 w-32 object-cover flex-shrink-0"/>
                  <div className="flex-grow text-center md:text-left md:px-6 mt-4 md:mt-0">
                    <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                    <p className="text-sm text-gray-500 mt-2 hidden sm:block">Sourced directly from certified local farms.</p>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 w-full md:w-48 flex flex-col items-stretch">
                    <div className="text-center md:text-right mb-2">
                      <p className="text-xl font-bold text-gray-800">₹{product.price}</p>
                      <p className="text-gray-500 text-sm">/ {product.unit || 'kg'}</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addToCart(product)} className="bg-green-100 text-green-800 font-semibold w-full py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition-colors">Add to Cart</motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}