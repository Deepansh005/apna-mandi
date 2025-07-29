'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Poppins } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, Product } from '../context/CartContext';

// Consistent Icons from the other pages
import {
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiX,
    FiZap,
    FiMenu,
    FiLogOut,
    FiHome,
    FiTag,
    FiSettings,
    FiHelpCircle,
    FiMapPin,      // <-- NEW: Location Icon
    FiGlobe,       // <-- NEW: Language Icon
    FiChevronDown  // <-- NEW: Dropdown Arrow Icon
} from 'react-icons/fi';
import { MdStar, MdStarHalf, MdStarOutline } from 'react-icons/md';

// Font Configuration
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

// Interface for extended product data (for dashboard display only)
interface DashboardProduct extends Product {
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
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => <MdStar key={`full-${i}`} className="text-yellow-400" />)}
            {halfStar === 1 && <MdStarHalf className="text-yellow-400" />}
            {[...Array(emptyStars)].map((_, i) => <MdStarOutline key={`empty-${i}`} className="text-yellow-400/50" />)}
            <span className="text-gray-400 ml-2 text-xs font-medium">
                ({reviewCount} reviews)
            </span>
        </div>
    );
};

// Notification component
const Notification: React.FC<{ message: string; onDismiss: () => void; }> = ({ message, onDismiss }) => {
    if (!message) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
            {message}
        </motion.div>
    );
};

export default function ApnaMandiDashboard() {
    const [products, setProducts] = useState<DashboardProduct[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notification, setNotification] = useState('');
    
    // --- NEW: State for language dropdown ---
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState({ code: 'EN', name: 'English' });

    // --- USE GLOBAL CART CONTEXT ---
    const { addToCart, cartCount } = useCart();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setSidebarOpen(false);
        }
        const fetchProducts = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('products').select<"*", Product>("*");

            if (error) {
                console.error('Error fetching products:', error);
            } else if (data) {
                const tags: DashboardProduct['tag'][] = ['Best Seller', 'Organic', 'New'];
                const productsWithEnhancements: DashboardProduct[] = data.map((product, index) => ({
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

    const handleAddToCart = (product: Product) => {
        addToCart(product); // Use context's addToCart
        setNotification(`${product.name} added to cart!`);
    };

    const deals = products.slice(0, 4);
    const allProducts = products.slice(4);
    
    const languages = [
        { code: 'EN', name: 'English' },
        { code: 'HI', name: 'हिंदी' },
        { code: 'PA', name: 'ਪੰਜਾਬੀ' },
    ];

    return (
        <div className={`${poppins.className} bg-gray-900 text-gray-200 h-screen flex overflow-hidden`}>
            <AnimatePresence>
                {notification && <Notification message={notification} onDismiss={() => setNotification('')} />}
            </AnimatePresence>

            {/* --- SIDEBAR --- */}
            <aside className={`absolute md:relative z-30 bg-gray-800/50 backdrop-blur-lg transition-all duration-300 ease-in-out h-full flex flex-col ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <Link href="/dashboard" className="text-2xl font-extrabold">
                        <span style={{ color: '#FFC700' }}>Apna</span>
                        <span style={{ color: '#004D40' }}>Mandi</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors">
                        <FiX />
                    </button>
                </div>
                <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
                    <h3 className="font-bold text-yellow-400 mb-2 px-3 text-sm uppercase tracking-wider">Menu</h3>
                    <Link href="/dashboard" className="flex items-center gap-3 py-2 px-3 rounded-lg bg-green-500/20 text-white font-semibold transition-colors"><FiHome /> Dashboard</Link>
                    <Link href="/cart" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"><FiShoppingCart /> My Cart</Link>
                    <Link href="/plans" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"><FiTag /> Deals & Plans</Link>
                    <hr className="my-4 border-gray-700"/>
                    <h3 className="font-bold text-yellow-400 mb-2 px-3 text-sm uppercase tracking-wider">Account</h3>
                    <Link href="/account" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"><FiUser /> Profile</Link>
                    <Link href="/settings" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"><FiSettings /> Settings</Link>
                    <Link href="/help" className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"><FiHelpCircle /> Help Center</Link>
                </nav>
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                    <Link href="#" className="flex items-center gap-3 py-2 px-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors font-semibold"><FiLogOut /> Sign Out</Link>
                </div>
            </aside>

            <div className="flex flex-col flex-grow overflow-hidden">
                {/* --- NAVBAR (Updated) --- */}
                <header className="bg-gray-800/30 backdrop-blur-lg px-6 py-3 flex items-center justify-between flex-shrink-0 z-20 border-b border-gray-700/50">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-full hover:bg-gray-700 transition-colors" title="Toggle menu">
                            <FiMenu size={22} />
                        </button>
                        {/* --- Location/Pincode Display --- */}
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                            <FiMapPin className="text-yellow-400"/>
                            <div className="flex flex-col -space-y-1">
                                <span className="font-semibold text-white">Deliver to 110001</span>
                                <span className="text-xs">New Delhi Area</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="relative hidden md:flex">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search for products..." className="w-full max-w-xs bg-gray-900/50 border border-gray-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition" />
                        </div>
                        <button className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors" title="Search"><FiSearch size={20} /></button>
                        
                        {/* --- Language Dropdown --- */}
                        <div className="relative">
                            <button onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)} className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                <FiGlobe size={20}/>
                                <span className="hidden sm:inline font-semibold text-sm">{selectedLanguage.code}</span>
                                <FiChevronDown size={16} className={`transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {languageDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute top-full right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
                                    >
                                        {languages.map(lang => (
                                            <button 
                                                key={lang.code}
                                                onClick={() => { setSelectedLanguage(lang); setLanguageDropdownOpen(false); }} 
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/80 transition-colors"
                                            >
                                                {lang.name} ({lang.code})
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-700 transition-colors">
                            <FiShoppingCart size={22} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }} className="absolute -top-1 -right-1 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                        <div className="w-px h-6 bg-gray-700 hidden sm:block"></div>
                        <Link href="/account" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
                            <FiUser size={22}/>
                            <span className="hidden lg:block font-semibold">My Account</span>
                        </Link>
                    </div>
                </header>

                {/* --- MAIN CONTENT (Scrollable) --- */}
                <main className="flex-grow overflow-y-auto p-6 md:p-8">
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2"><FiZap className="text-yellow-400" /> Today&apos;s Hottest Deals</h2>
                        <p className="text-gray-400 mb-6">Fresh picks at prices you&apos;ll love. Grab them before they&apos;re gone!</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {deals.map((product) => (
                                <motion.div key={product.id} whileHover={{ y: -5, scale: 1.03 }} className="flex flex-col bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden transition-all group border border-gray-700 hover:border-yellow-400/50">
                                    <div className="relative">
                                        <img src={`/${product.image}`} alt={product.name} width={400} height={300} className="h-48 w-full object-cover"/>
                                        {product.tag && <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">{product.tag}</div>}
                                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <h3 className="absolute bottom-3 left-4 text-white text-lg font-bold">{product.name}</h3>
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                                        <p className="text-white text-2xl font-bold my-3">₹{product.price}<span className="text-base font-normal text-gray-400"> / {product.unit || 'kg'}</span></p>
                                        <button onClick={() => handleAddToCart(product)} className="mt-auto bg-gradient-to-r from-yellow-500 to-green-600 text-white font-bold w-full py-2.5 rounded-lg group-hover:from-yellow-400 group-hover:to-green-500 transition-all duration-300 hover:scale-105">Add to Cart</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">Explore All Produce</h2>
                        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } }, hidden: {} }} className="flex flex-col gap-4">
                            {allProducts.map((product) => (
                                <motion.div key={product.id} variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -30 } }} whileHover={{ scale: 1.01, backgroundColor: 'rgba(31, 41, 55, 0.8)' }} className="flex flex-col md:flex-row items-center bg-gray-800/50 p-4 rounded-xl w-full border border-gray-700 hover:border-green-500/50 transition-all">
                                    <img src={`/${product.image}`} alt={product.name} width={150} height={150} className="rounded-lg h-28 w-28 object-cover flex-shrink-0"/>
                                    <div className="flex-grow text-center md:text-left md:px-6 mt-4 md:mt-0">
                                        <h2 className="text-xl font-bold text-white">{product.name}</h2>
                                        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                                        <p className="text-sm text-gray-400 mt-2 hidden sm:block">Sourced directly from certified local farms for ultimate freshness.</p>
                                    </div>
                                    <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 w-full md:w-48 flex flex-col items-stretch">
                                        <div className="text-center md:text-right mb-2">
                                            <p className="text-xl font-bold text-white">₹{product.price}</p>
                                            <p className="text-gray-400 text-sm">/ {product.unit || 'kg'}</p>
                                        </div>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAddToCart(product)} className="bg-green-900/50 border border-green-500 text-green-400 font-semibold w-full py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition-colors">Add to Cart</motion.button>
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
