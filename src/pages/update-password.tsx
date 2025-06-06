'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useUpdateTradePassword } from '@/services/useAuthServices';
import { Input } from '@/components/input';
import { LockKeyhole, Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ChangePasswordCard() {
  const { query, push } = useRouter();

  // Extract walletAddress and pwd from URL query params
  const walletAddress = query.walletAddress as string ?? '';
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { mutateAsync, isPending } = useUpdateTradePassword();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync({
          walletAddress,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        push({
          pathname: '/bot',
          query: {
            walletAddress: walletAddress as string,
            pwd: values.newPassword,
          },
        });
        toast.success('Password updated successfully!');
        resetForm();
      } catch (error) {
        console.error('Error updating password:', error);
        toast.error('Failed to update password. Please try again.');
      }
    },
  });

  const toggleShow = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className='min-h-screen mint-bg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <form
        onSubmit={formik.handleSubmit}
        className='relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl min-w-[400px]'
      >
        <h2 className='text-3xl font-bold mb-8 text-center text-cyan-400'>
          Change Password
        </h2>

        <div className='flex flex-col gap-6'>
          <Input
            label='Current Password'
            type={showPasswords.current ? 'text' : 'password'}
            icon={<LockKeyhole className='w-4 h-4 text-pink-400' />}
            {...formik.getFieldProps('currentPassword')}
            error={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
            rightElement={
              <button
                type='button'
                onClick={() => toggleShow('current')}
                className='text-sm text-cyan-300 hover:underline px-2'
              >
                {showPasswords.current ? 'Hide' : 'Show'}
              </button>
            }
          />

          <Input
            label='New Password'
            type={showPasswords.new ? 'text' : 'password'}
            icon={<LockKeyhole className='w-4 h-4 text-pink-400' />}
            {...formik.getFieldProps('newPassword')}
            error={formik.touched.newPassword && formik.errors.newPassword}
            rightElement={
              <button
                type='button'
                onClick={() => toggleShow('new')}
                className='text-sm text-cyan-300 hover:underline px-2'
              >
                {showPasswords.new ? 'Hide' : 'Show'}
              </button>
            }
          />

          <Input
            label='Confirm New Password'
            type={showPasswords.confirm ? 'text' : 'password'}
            icon={<LockKeyhole className='w-4 h-4 text-pink-400' />}
            {...formik.getFieldProps('confirmNewPassword')}
            error={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
            rightElement={
              <button
                type='button'
                onClick={() => toggleShow('confirm')}
                className='text-sm text-cyan-300 hover:underline px-2'
              >
                {showPasswords.confirm ? 'Hide' : 'Show'}
              </button>
            }
          />

          <button
            type='submit'
            disabled={isPending}
            className='w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25 transform hover:scale-105'
          >
            {isPending ? (
              <span className='flex items-center justify-center gap-2'>
                <Loader2 className='w-5 h-5 animate-spin' />
                Updating...
              </span>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
