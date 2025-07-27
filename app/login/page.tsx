'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Sign in the user with their email and password
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // If there's an error, show it to the user
      alert('Login failed: ' + error.message);
    } else {
      // If login is successful, redirect to the dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-gray-100 items-center justify-between flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-8 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-green-600">Apna Mandi</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-md mx-auto lg:mx-0">
            Your daily mandi for fresh fruits & vegetables. Trusted by vendors. Delivered with care.
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 mt-8 lg:mt-0">
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Log in to your account</h2>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              Log in
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/forgot-password">
              <span className="text-sm text-green-600 hover:underline">Forgot password?</span>
            </Link>
          </div>

          <hr className="my-5" />

          <div className="text-center">
            <p className="text-sm">
              <span className="text-gray-600 font-medium">don&#39;t have an account?</span>{' '}
              <Link href="/signup" className="text-green-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
