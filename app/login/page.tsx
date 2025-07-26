'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-gray-100 items-center justify-between">
        {/* Left Side - Brand Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-5xl font-bold text-green-600">Apna Mandi</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-md">
            Your daily mandi for fresh fruits & vegetables. Trusted by vendors. Delivered with care.
          </p>
        </div>

        {/* Right Side - Login Box */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address or phone number"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Log in
            </button>
          </form>

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
