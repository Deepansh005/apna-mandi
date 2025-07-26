'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Trigger reset logic (e.g., Supabase/Magic link here)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-2">
          Forgot Your Password?
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your registered email address and we’ll send you instructions to reset your password.
        </p>

        {!submitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-medium">
            ✅ Reset link sent to your email.
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-green-600 hover:underline">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
