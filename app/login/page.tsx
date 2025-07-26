'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!emailOrPhone || !password) return;

    // login logic here
    console.log('Logging in:', { emailOrPhone, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-gray-100 items-center justify-between">
        {/* Left Side */}
        <div className="w-1/2 p-8">
          <h1 className="text-5xl font-bold text-green-600">Apna Mandi</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-md">
            Your daily mandi for fresh fruits & vegetables. Trusted by vendors. Delivered with care.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email or Phone */}
            <div>
              <input
                type="text"
                placeholder="Email address or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition border
                  ${emailOrPhone
                    ? 'border-green-500 focus:ring-2 focus:ring-green-400'
                    : 'border-gray-300'}`
                }
              />
              {!emailOrPhone && touched && (
                <p className="text-sm text-red-600 mt-1">This field is required.</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition border
                  ${password
                    ? 'border-green-500 focus:ring-2 focus:ring-green-400'
                    : 'border-gray-300'}`
                }
              />
              {!password && touched && (
                <p className="text-sm text-red-600 mt-1">Password is required.</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Log in
            </button>
          </form>

          {/* Other Links */}
          <div className="text-center mt-3">
            <Link href="#" className="text-sm text-green-600 hover:underline">
              Forgotten password?
            </Link>
          </div>

          <hr className="my-5" />

          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
