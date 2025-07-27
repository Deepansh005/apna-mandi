"use client";

import React, { useState } from "react";

const products = [
  {
    id: 1,
    title: "Fresh Potatoes (10kg)",
    price: 120,
    image: "pexels-victorino-2286776.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "Noodles (1kg pack)",
    price: 22,
    image: "/noodles.jpg",
    quantity: 1,
  },
  {
    id: 3,
    title: "Maida (1kg)",
    price: 22,
    image: "pexels-klaus-nielsen-6287581.jpg",
    quantity: 1, // 
  },
];

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState(products);

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 50;
  const finalAmount = total - discount;

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-center text-3xl font-semibold text-green-900 uppercase mb-6">
              Your Cart
            </h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-6 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-xl border"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-green-800 font-bold text-lg">
                        {item.title}
                      </h5>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-600 font-bold text-lg"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center mt-3 gap-4">
                    <p className="font-bold text-lg text-gray-800">
                      ₹{item.price}
                    </p>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-gray-700 hover:text-black font-bold"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center font-bold bg-transparent text-gray-800"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-green-600 hover:text-green-800 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <hr className="my-6 border-green-600" />
            <div className="flex justify-between font-bold text-gray-800 text-lg">
              <p>Discount:</p>
              <p>₹{discount}</p>
            </div>
            <div className="flex justify-between bg-green-600 text-white px-4 py-3 mt-4 rounded text-lg font-bold">
              <h5>Total:</h5>
              <h5>₹{finalAmount}</h5>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-center text-3xl font-extrabold text-green-900 uppercase mb-6">
              Payment
            </h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-800 text-sm">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg font-bold text-gray-800"
                  placeholder="1234 5678 9012 3457"
                  maxLength={19}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-800 text-sm">
                  Name on Card
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg font-bold text-gray-800"
                  placeholder="Ramesh Kumar"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-bold text-gray-800 text-sm">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg font-bold text-gray-800"
                    placeholder="01/26"
                    maxLength={7}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold text-gray-800 text-sm">
                    CVV
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-lg font-bold text-gray-800"
                    placeholder="•••"
                    maxLength={3}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-6">
                By placing your order, you agree to Apna Mandi's{" "}
                <a href="#" className="text-green-700 underline font-bold">
                  terms and conditions
                </a>
                .
              </p>
              <button
                type="button"
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold text-lg transition duration-200"
              >
                Confirm & Pay
              </button>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-green-700 hover:underline flex items-center font-bold text-md"
                >
                  ← Back to shopping
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
