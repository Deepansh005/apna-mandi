'use client';

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiStar, FiZap, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

// --- FONT CONFIGURATION ---
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

// --- PLAN DATA ---
const plans = [
  {
    name: 'Basic PLan',
    price: 'Free',
    description: 'Perfect for getting started and exploring the market.',
    features: [
      'List up to 10 products',
      'Standard transaction fees',
      'Basic sales analytics',
      'Community support',
    ],
    cta: 'Continue with Basic',
    isPopular: false,
    theme: {
        bg: 'bg-gray-800/50',
        button: 'bg-gray-600 hover:bg-gray-500',
        borderColor: 'border-gray-700'
    }
  },
  {
    name: 'Pro Plan',
    price: '₹499',
    period: '/ month',
    description: 'For growing businesses looking to scale their reach.',
    features: [
      'Unlimited product listings',
      'Preset Weekly Oders',
      'Lower transaction fees',
      'Featured "Best Seller" tags',
      'priority in delivery queue',
      'Priority customer support',
    ],
    cta: 'Choose Pro Plan',
    isPopular: true,
    theme: {
        bg: 'bg-green-900/40',
        button: 'bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-400 hover:to-green-400',
        borderColor: 'border-green-500'
    }
  },
  {
    name: 'Exclusive Plan',
    price: '₹999',
    period: '/ month',
    description: 'The ultimate package for market leaders.',
    features: [
      'All Pro features',
      'Preset Monthly Oders',
      'Zero transaction fees',
      'Personalized delivery partner',
      'Early access to new features',
      'Exclusive vendor events',
    ],
    cta: 'Become Exclusive',
    isPopular: false,
    theme: {
        bg: 'bg-gray-800/50',
        button: 'bg-gray-600 hover:bg-gray-500',
        borderColor: 'border-gray-700'
    }
  },
];

// --- MAIN COMPONENT ---
export default function SubscriptionPlansPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className={`${poppins.className} bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-8`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Find the Perfect Plan
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Unlock powerful features to grow your business on Apna Mandi. From basic listings to enterprise-level tools.
          </p>
        </motion.div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${plan.theme.bg} ${plan.theme.borderColor} ${plan.isPopular ? 'shadow-2xl shadow-green-500/20' : 'hover:border-yellow-400/50'}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="bg-green-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase flex items-center gap-1">
                        <FiStar size={12}/> Most Popular
                    </div>
                </div>
              )}

              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                <p className="text-gray-400 mt-1 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 font-medium">{plan.period}</span>}
                </div>

                <ul className="space-y-4">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                      <FiCheckCircle className="text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full mt-10 py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 text-white ${plan.theme.button}`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
