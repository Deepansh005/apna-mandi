'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

// --- TYPE DEFINITIONS ---
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  unit?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// --- CONTEXT SHAPE ---
interface ICartContext {
    cartItems: CartItem[];
    addToCart: (product: Product) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, delta: number) => Promise<void>;
    cartCount: number;
    isLoading: boolean;
}

// --- CREATE CONTEXT ---
const CartContext = createContext<ICartContext | undefined>(undefined);

// --- PROVIDER COMPONENT ---
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Database Functions ---
    const fetchDBCart = useCallback(async (userId: string) => {
        setIsLoading(true);
        const { data: cartData, error } = await supabase
            .from('cart_items')
            .select('quantity, products(*)')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching DB cart:', error);
            setIsLoading(false);
            return;
        }

        if (!cartData) {
            setCartItems([]);
            setIsLoading(false);
            return;
        }

        const formattedCart = cartData.reduce<CartItem[]>((acc, item) => {
            if (item.products) {
                const productData = item.products as unknown as Product;
                acc.push({ ...productData, quantity: item.quantity });
            }
            return acc;
        }, []);
        
        setCartItems(formattedCart);
        setIsLoading(false);
    }, [supabase]);


    // --- Auth and Cart Loading Logic ---
    useEffect(() => {
        const loadInitialData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                await fetchDBCart(user.id);
            } else {
                const localCart = localStorage.getItem('guestCart');
                setCartItems(localCart ? JSON.parse(localCart) : []);
                setIsLoading(false);
            }
        };
        loadInitialData();
        
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (event === 'SIGNED_IN' && currentUser) {
                localStorage.removeItem('guestCart');
                fetchDBCart(currentUser.id);
            } else if (event === 'SIGNED_OUT') {
                setCartItems([]);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase, fetchDBCart]);


    // --- Local Storage Sync for Guests ---
    useEffect(() => {
        if (!user && !isLoading) {
            localStorage.setItem('guestCart', JSON.stringify(cartItems));
        }
    }, [cartItems, user, isLoading]);
    

    // --- PUBLIC CART ACTIONS (with Optimistic Updates) ---

    const addToCart = async (product: Product) => {
        const originalCart = [...cartItems];
        
        // Optimistically update the UI
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }

        if (user) {
            const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
            const { error } = await supabase
                .from('cart_items')
                .upsert({ 
                    user_id: user.id, 
                    product_id: product.id, 
                    quantity: newQuantity
                }, { onConflict: 'user_id, product_id' });

            if (error) {
                console.error("DB Error: Failed to add to cart. Reverting.", error);
                setCartItems(originalCart); // Revert on error
            }
        }
    };

    const removeFromCart = async (productId: number) => {
        const originalCart = [...cartItems];
        
        // Optimistically update the UI
        setCartItems(cartItems.filter(item => item.id !== productId));

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .match({ user_id: user.id, product_id: productId });
            
            if (error) {
                console.error("DB Error: Failed to remove from cart. Reverting.", error);
                setCartItems(originalCart); // Revert on error
            }
        }
    };
    
    const updateQuantity = async (productId: number, delta: number) => {
        const originalCart = [...cartItems];
        const itemToUpdate = cartItems.find(item => item.id === productId);
        if (!itemToUpdate) return;

        const newQuantity = Math.max(1, itemToUpdate.quantity + delta);

        // Optimistically update the UI
        setCartItems(cartItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity })
                .match({ user_id: user.id, product_id: productId });
            
            if (error) {
                console.error("DB Error: Failed to update quantity. Reverting.", error);
                setCartItems(originalCart); // Revert on error
            }
        }
    };
    
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        isLoading,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// --- CUSTOM HOOK ---
export const useCart = (): ICartContext => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
