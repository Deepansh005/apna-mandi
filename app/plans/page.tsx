"use client";

import React from 'react';

const SubscriptionPlans = () => {
  const plans = [
    {
      name: 'Basic',
      emoji: '🟢',
      price: 'FREE',
      bg: 'bg-green-100 border-green-00',
      features: [
        'Order any time',
        'Real-time delivery updates',
        'Manual payment per delivery'
      ],
      cta: 'Upgrade to Pro'
    },
    {
      name: 'Premium',
      emoji: '🔵',
      price: '₹499 / month',
      bg: 'bg-blue-100 border-blue-300',
      features: [
        'All Pro features',
        'Dedicated service runner',
        'Discounted raw material prices',
        'Weekly pre-scheduling'
      ],
      cta: 'Upgrade to Premium'
    }
  ];

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-orange-700">Fuel Your Stall with the Right Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border rounded-2xl p-6 shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col justify-between ${plan.bg}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">{plan.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name} Plan</h3>
              <p className="text-lg text-gray-700 font-semibold mb-4">{plan.price}</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-6 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
            </div>
            <button
              className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-300"
              disabled={plan.cta === 'Coming Soon'}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
