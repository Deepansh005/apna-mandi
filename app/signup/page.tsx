'use client';

import Link from 'next/link';

export default function SignupPage() {
  const handleGoogleSignup = () => {
    console.log('Google Sign-Up button clicked (connect auth later)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <form className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="mt-6 w-full border border-gray-300 hover:bg-gray-100 py-2.5 rounded-xl flex justify-center items-center gap-2 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
