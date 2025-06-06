'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import Link from 'next/link';
import { Wallet, LockKeyhole } from 'lucide-react';
import { Input } from '@/components/input';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      walletAddress: '',
      password: '',
    },
    validationSchema: Yup.object({
      walletAddress: Yup.string().required('Wallet Address is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      push({
        pathname: '/bot',
        query: {
          walletAddress: values.walletAddress,
          pwd: values.password,
        },
      });
      toast.success('Login successful!');
    },
  });

  return (
    <div className='min-h-screen flex flex-col justify-center items-center home-bg px-4'>
      <form
        onSubmit={formik.handleSubmit}
        className='relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl w-full max-w-md'
      >
        <h1 className='mb-8 text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          Open Your Bot Config
        </h1>

        <Input
          label='Wallet Address'
          icon={<Wallet className='w-4 h-4 text-cyan-400' />}
          {...formik.getFieldProps('walletAddress')}
          error={formik.touched.walletAddress && formik.errors.walletAddress}
          className='mb-6'
        />

        <Input
          label='Password'
          type={showPassword ? 'text' : 'password'}
          icon={<LockKeyhole className='w-4 h-4 text-purple-400' />}
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
          rightElement={
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-sm text-cyan-300 hover:underline px-2'
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          }
          className='mb-6'
        />

        <button
          type='submit'
          disabled={formik.isSubmitting}
          className='w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25 transform hover:scale-105'
        >
          {'Login'}
        </button>
      </form>

      {/* CTA to create new config */}
      <div className='mt-8 text-center'>
        <p className='text-gray-300 mb-4'>Don’t have a config yet?</p>
        <Link
          href='/create'
          className='inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/25 transition-transform transform hover:scale-105'
        >
          Create Your Buy Bot Config
        </Link>
      </div>
    </div>
  );
}
