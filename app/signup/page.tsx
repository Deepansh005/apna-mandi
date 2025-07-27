'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [showExtraForm, setShowExtraForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    business: '',
    password: '',
  });

  const router = useRouter();
  const supabase = createClient();

  const handleGoogleClick = () => {
    setShowExtraForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit and save to Supabase
  const handleFinalSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.fullName || !formData.contact || !formData.password) {
    alert('Please fill all required fields');
    return;
  }

  // 1. Create user in Supabase Auth, passing metadata
  const { data, error } = await supabase.auth.signUp({
    email: formData.contact,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
        business: formData.business,
        contact: formData.contact,
      },
    },
  });

  if (error) {
    alert('Signup failed: ' + error.message);
    return;
  }

  // 2. Redirect to login page after successful signup
  alert('Success! Please check your email to confirm your account.');
  router.push('/login');
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

        {/* Signup Form */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 mt-8 lg:mt-0">
          {!showExtraForm ? (
            <>
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Business name (if any)"
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg"
                />

                <input
                  type="password"
                  placeholder="Create password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
                >
                  Sign up
                </button>
              </form>

              <hr className="my-5" />

              <div className="text-center space-y-3">
                <button
                  onClick={handleGoogleClick}
                  className="w-full border border-green-600 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50"
                >
                  Continue with Google
                </button>

                <p className="text-sm">
                  <span className="text-gray-600 font-medium">Already have an account?</span>{' '}
                  <Link href="/login" className="text-green-600 font-semibold hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-center text-green-700">
                Complete Your Profile
              </h2>
              {/* Same fields as above */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
