'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { register } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';
import GoogleLoginButton from '@/components/ui/GoogleLoginButton'; // ⬅ IMPORT HERE



const RegisterSideImage =
  "https://images.bewakoof.com/uploads/grid/app/1x1-graphic-edition-women-1762163207.jpg";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      await dispatch(
        register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        })
      ).unwrap();

      toast.success('Account created successfully!');
      router.push('/');
    } catch (err) {
      toast.error(err || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* LEFT IMAGE SIDE */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />

        <Image
          src={RegisterSideImage}
          alt="Fashion Banner"
          className="object-cover w-full h-full"
          fill
          priority
        />

        <div className="absolute inset-0 flex flex-col justify-center items-start z-20 p-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Create <span className="block">Account</span>
          </h1>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">
            Join our fashion community and unlock exclusive member benefits.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <div className="space-y-4">

            <GoogleLoginButton />

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">
                  Or with email
                </span>
              </div>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                name: 'name',
                type: 'text',
                placeholder: 'Full Name',
                required: true,
              },
              {
                name: 'email',
                type: 'email',
                placeholder: 'Email Address',
                required: true,
              },
              {
                name: 'phone',
                type: 'tel',
                placeholder: 'Phone Number',
                required: true,
              },
              {
                name: 'password',
                type: 'password',
                placeholder: 'Password (min 6 chars)',
                required: true,
                minLength: 6,
              },
              {
                name: 'confirmPassword',
                type: 'password',
                placeholder: 'Confirm Password',
                required: true,
              },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            By creating an account, you agree to our{' '}
            <Link
              href="/terms"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Terms
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
    
  );
}
