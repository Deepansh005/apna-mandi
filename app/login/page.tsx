'use client';

import React, { useState, useEffect, useRef } from 'react';
// Using react-icons for a wider and more accessible range of icons.
// Make sure to install it: npm install react-icons
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
// You can keep using next/link and next/navigation as they are framework-specific
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Assuming your Supabase client setup is in this path
import { createClient } from '@/utils/supabase/client';

// A dedicated component for form input fields, consistent with the signup page
import { ChangeEvent, RefObject } from 'react';

interface FormInputProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  refProp?: RefObject<HTMLInputElement | null>;
}

const FormInput: React.FC<FormInputProps> = ({
  icon: Icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  refProp,
}) => (
  <div className="relative flex items-center">
    <Icon className="absolute left-4 h-5 w-5 text-gray-400" />
    <input
      ref={refProp}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-full border border-gray-600 bg-gray-800/50 py-3 pl-12 pr-4 text-gray-200 placeholder-gray-400 transition-all duration-300 ease-in-out focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
    />
  </div>
);

// A custom component for displaying success or error messages, consistent with the signup page
interface NotificationProps {
    message: string;
    type: 'success' | 'error' | '';
    onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onDismiss }) => {
    const baseClasses = "fixed top-5 right-5 w-full max-w-sm p-4 rounded-lg shadow-lg text-white transform transition-all duration-500 ease-in-out";
    const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500",
        "": "",
    };

    // Automatically dismiss after 5 seconds
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [onDismiss, message]);

    if (!message) return null;

    return (
        <div className={`${baseClasses} ${typeClasses[type]} animate-slide-in-right`}>
            <div className="flex items-center justify-between">
                <p>{message}</p>
                <button onClick={onDismiss} className="ml-4 font-bold text-xl">&times;</button>
            </div>
        </div>
    );
};


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: '' | 'success' | 'error' }>({ message: '', type: '' });
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // Auto-focus the email input on component mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleGoogleClick = () => {
    // This can be implemented later with Supabase's provider sign-in
    setNotification({ message: 'Google Sign-in is coming soon!', type: 'error' });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setNotification({ message: 'Please enter both email and password.', type: 'error' });
      return;
    }

    // Sign in the user with their email and password
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // If there's an error, show it to the user via the notification component
      setNotification({ message: `Login failed: ${error.message}`, type: 'error' });
    } else {
      // If login is successful, redirect to the dashboard
      // A success message could be shown here, but redirecting is usually preferred for UX
      router.push('/dashboard');
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <Notification 
        message={notification.message} 
        type={notification.type}
        onDismiss={() => setNotification({ message: '', type: '' })}
      />

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 px-4">
        {/* Background decorative elements */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-green-400/20 blur-3xl"></div>

        <div className="relative z-10 flex w-full max-w-5xl items-center justify-between rounded-2xl bg-black/20 p-2 shadow-2xl backdrop-blur-xl lg:flex-row flex-col">
          {/* Left Side: Branding */}
          <div className="flex w-full flex-col items-center justify-center p-8 text-center lg:w-1/2 lg:items-start lg:text-left">
            <h1 className="text-6xl font-black text-white">
              <span style={{ color: '#FFC700' }}>Apna</span>
              <span style={{ color: '#004D40' }}> Mandi</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-gray-300">
              Your daily mandi for fresh fruits & vegetables. Trusted by vendors. Delivered with care.
            </p>
            <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-green-500"></div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full max-w-md rounded-xl bg-gray-900/60 p-8">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">Welcome Back</h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <FormInput refProp={emailInputRef} icon={HiOutlineMail} type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <FormInput icon={HiOutlineLockClosed} type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 hover:underline">
                    Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-yellow-500 to-green-600 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30"
              >
                Log In
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 flex-shrink text-sm text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleClick}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-600 bg-gray-800/50 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-gray-800"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-yellow-400 hover:text-yellow-300 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
