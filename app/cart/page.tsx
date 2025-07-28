'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiTag } from 'react-icons/fi';
import { useCart, CartItem } from '../context/CartContext'; // 1. IMPORT a`useCart` hook

// --- FONT CONFIGURATION ---
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Props interface for OrderSummary component
interface OrderSummaryProps {
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    promoCode: string;
    setPromoCode: React.Dispatch<React.SetStateAction<string>>;
    applyPromoCode: () => void;
    promoError: string;
}

// --- MAIN CART COMPONENT ---
export default function ShoppingCartPage() {
    // 2. GET ALL DATA FROM THE GLOBAL CONTEXT
    const { cartItems, updateQuantity, removeFromCart, isLoading } = useCart(); 
    
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');

    // --- CALCULATIONS ---
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = subtotal > 500 || subtotal === 0 ? 0 : 50;
    const total = subtotal - discount + shippingFee;

    const applyPromoCode = () => {
        setPromoError('');
        if (promoCode.toUpperCase() === 'FRESH50') {
            setDiscount(50);
        } else if (promoCode.toUpperCase() === 'APNA10') {
            setDiscount(subtotal * 0.10); // 10% discount
        } else {
            setPromoError('Invalid promo code.');
            setDiscount(0);
        }
    };

    return (
        <div className={`${poppins.className} bg-gray-900 text-gray-200 min-h-screen`}>
            <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                
                {/* Header */}
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Link href="/dashboard" className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-6 group w-fit">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Shopping</span>
                    </Link>
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Your Cart</h1>
                        <AnimatePresence>
                            <motion.span 
                                key={cartItems.length}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="font-semibold text-green-400"
                            >
                                ({cartItems.length} items)
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </motion.div>
                
                <hr className="my-8 border-gray-700" />
                
                {/* 3. Handle loading state and empty cart */}
                {isLoading ? (
                    <p className="text-center text-lg text-gray-400 py-20">Loading Your Cart...</p>
                ) : cartItems.length === 0 ? (
                    <EmptyCartState />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <CartItemRow 
                                        key={item.id} 
                                        item={item} 
                                        onUpdateQuantity={updateQuantity} // Use context function
                                        onRemove={removeFromCart}       // Use context function
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <OrderSummary 
                            subtotal={subtotal} 
                            shippingFee={shippingFee} 
                            discount={discount}
                            total={total}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            applyPromoCode={applyPromoCode}
                            promoError={promoError}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS (No changes needed here) ---

const CartItemRow = ({ item, onUpdateQuantity, onRemove }: { item: CartItem; onUpdateQuantity: (id: number, delta: number) => void; onRemove: (id: number) => void; }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
        className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800/60 p-4 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors"
    >
        <img src={`/${item.image}`} alt={item.name} width={100} height={100} className="rounded-lg object-cover h-24 w-24 sm:h-20 sm:w-20 flex-shrink-0" />
        <div className="flex-grow text-center sm:text-left">
            <h3 className="font-bold text-lg text-white">{item.name}</h3>
            <p className="text-gray-400 text-sm">₹{item.price.toFixed(2)} / {item.unit}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 bg-gray-900/70 rounded-full border border-gray-600 p-1">
            <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Decrease quantity"><FiMinus size={16} /></button>
            <span className="font-bold w-8 text-center text-lg">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Increase quantity"><FiPlus size={16} /></button>
        </div>
        <p className="font-bold text-white text-lg w-28 text-right hidden sm:block">₹{(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => onRemove(item.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10" aria-label="Remove item">
            <FiTrash2 size={20} />
        </button>
    </motion.div>
);

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shippingFee, discount, total, promoCode, setPromoCode, applyPromoCode, promoError }) => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gray-800 rounded-2xl p-6 sticky top-8 border border-gray-700 shadow-xl shadow-black/20">
        <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-4 mb-4">Order Summary</h2>
        <div className="mb-4">
            <label htmlFor="promo" className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <FiTag className="text-yellow-400"/> Add Promo Code
            </label>
            <div className="flex gap-2">
                <input 
                    id="promo"
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g., FRESH50"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
                />
                <button onClick={applyPromoCode} className="bg-yellow-500 text-gray-900 font-bold px-4 rounded-lg hover:bg-yellow-400 transition-colors">
                    Apply
                </button>
            </div>
            <AnimatePresence>
            {promoError && (
                <motion.p 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-red-400 text-xs mt-2"
                >
                    {promoError}
                </motion.p>
            )}
            </AnimatePresence>
        </div>
        <div className="space-y-3 text-gray-300">
            <div className="flex justify-between"><span>Subtotal</span> <span className="font-medium text-white">₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping Fee</span> <span className="font-medium text-white">{shippingFee === 0 ? 'Free' : `₹${shippingFee.toFixed(2)}`}</span></div>
             <AnimatePresence>
                {discount > 0 && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex justify-between text-green-400"
                    >
                        <span>Discount</span>
                        <span>- ₹{discount.toFixed(2)}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        <hr className="my-4 border-gray-600 border-dashed" />
        <div className="flex justify-between text-xl font-bold text-white mb-6">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-yellow-500 to-green-600 text-white font-bold py-3 rounded-lg text-lg transition-all shadow-lg hover:shadow-yellow-500/20 focus:outline-none focus:ring-4 focus:ring-yellow-400/50">
            Proceed to Checkout
        </motion.button>
    </motion.div>
);

const EmptyCartState = () => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-center py-20 bg-gray-800/40 rounded-2xl border border-dashed border-gray-700 flex flex-col items-center"
    >
        <FiShoppingCart size={60} className="mx-auto text-gray-600 mb-4" />
        <h2 className="text-3xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-gray-400 mt-2 mb-6 max-w-sm">Looks like you haven&apos;t added any fresh goodies yet. Let&apos;s fix that!</p>
        <Link href="/dashboard">
            <motion.button 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }} 
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-green-900/50"
            >
                Start Shopping
            </motion.button>
        </Link>
    </motion.div>
);
