'use client';

// Imports from both versions, cleaned up
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // State from your branch for the core logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hooks from Aman's branch for UI enhancements
  const [touched, setTouched] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Hooks from your branch for functionality
  const router = useRouter();
  const supabase = createClient();

  // Keep Aman's useEffect to auto-focus the input field
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Keep YOUR handleLogin function - it has the correct Supabase logic
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
    // Keep Aman's overall layout structure
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-gray-100 items-center justify-between rounded-xl overflow-hidden">
        
        {/* Keep Aman's styled "Left Side" */}
        <div className="w-1/2 p-10">
          <h1 className="text-5xl font-bold text-green-600">Apna Mandi</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-md leading-relaxed">
            Your daily mandi for fresh fruits & vegetables. Trusted by vendors. Delivered with care.
          </p>
        </div>

        {/* Keep Aman's styled "Right Side" form container */}
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-xl">
          {/* Change onSubmit to use YOUR handleLogin function */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email Input: Use Aman's styling but connect to YOUR state */}
            <div>
              <input
                ref={emailInputRef}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)} // Keep Aman's validation trigger
                required
                className={`w-full px-4 py-3 rounded-lg placeholder-gray-500 border text-black transition duration-200
                  ${email ? 'border-green-500' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:shadow-lg`}
              />
              {!email && touched && (
                <p className="text-sm text-red-600 mt-1">This field is required.</p>
              )}
            </div>

            {/* Password Input: Use Aman's styling but connect to YOUR state */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(true)} // Keep Aman's validation trigger
                required
                className={`w-full px-4 py-3 rounded-lg placeholder-gray-500 border text-black transition duration-200
                  ${password ? 'border-green-500' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:shadow-lg`}
              />
              {!password && touched && (
                <p className="text-sm text-red-600 mt-1">Password is required.</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              Log in
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            {/* Use your link to the correct page */}
            <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Create Account */}
          <div className="text-center">
            {/* Use Aman's styled button but your link */}
            <Link
              href="/signup"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}