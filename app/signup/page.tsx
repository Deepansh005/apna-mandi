// 'use client';

// import Link from 'next/link';

// export default function SignupPage() {
//   const handleGoogleSignup = () => {
//     console.log('Google Sign-Up button clicked (connect auth later)');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl sm:p-10">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

//         <form className="space-y-6">
//           <div className="relative">
//             <input
//               type="email"
//               placeholder="Email"
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="relative">
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition font-semibold"
//           >
//             Sign Up
//           </button>
//         </form>

//         <button
//           onClick={handleGoogleSignup}
//           className="mt-6 w-full border border-gray-300 hover:bg-gray-100 py-2.5 rounded-xl flex justify-center items-center gap-2 transition"
//         >
//           <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
//           Continue with Google
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{' '}
//           <Link href="/login" className="text-blue-600 hover:underline font-medium">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [showExtraForm, setShowExtraForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    business: '',
    password: '',
  });

  const handleGoogleClick = () => {
    // Simulate Google Auth flow here (e.g., Supabase / Firebase)
    // Then ask user for additional required fields
    setShowExtraForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contact || !formData.password) {
      alert('Please fill all required fields');
      return;
    }
    console.log('Form Submitted:', formData);
    // Save to Supabase or database
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-gray-100 items-center justify-between flex-col lg:flex-row">
        {/* Left Side - Brand Tagline */}
        <div className="w-full lg:w-1/2 p-8 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-green-600">Apna Mandi</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-md mx-auto lg:mx-0">
            Your daily mandi for fresh fruits & vegetables. Trusted by vendors. Delivered with care.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 mt-8 lg:mt-0">
          {!showExtraForm ? (
            <>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                />

                <input
                  type="text"
                  placeholder="Email address or Phone number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                />

                <input
                  type="text"
                  placeholder="Business name (if any)"
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                />

                <input
                  type="password"
                  placeholder="Create password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Sign up
                </button>
              </form>

              <hr className="my-5" />

              <div className="text-center space-y-3">
                <button
                  onClick={handleGoogleClick}
                  className="w-full border border-green-600 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition"
                >
                  Continue with Google
                </button>

                <p className="text-sm">
                  <span className="text-gray-600 font-medium">Already have an account?</span>{' '}
                  <Link
                    href="/login"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            // Extra fields shown after Google auth
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-center text-green-700">
                Complete Your Profile
              </h2>

              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              />

              <input
                type="text"
                name="contact"
                placeholder="Email address or Phone number"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              />

              <input
                type="text"
                name="business"
                placeholder="Business name (optional)"
                value={formData.business}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              />

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
              />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Complete Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
