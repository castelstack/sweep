'use client';

import {
  Loader2,
  Wallet,
  LockKeyhole,
  Bot,
  TrendingUp,
  List as ListIcon,
  BarChart,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import {
  useGetTradeConfig,
  useUpdateTradeConfig,
} from '@/services/useAuthServices';
import { Input } from '@/components/input';
import { useRouter } from 'next/router';

export default function EditTradeConfigCard() {
  const { query, push } = useRouter();

  const walletAddress = (query.walletAddress as string) ?? '';
  const password = (query.pwd as string) ?? '';

  const { data, refetch } = useGetTradeConfig(walletAddress, password);
  const { mutateAsync, isPending } = useUpdateTradeConfig();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      walletAddress: '',
      collectionId: '',
      buyingPercentage: 10,
      listPercentage: 5,
      rankingPercentage: 15,
      password: '',
      isActive: false, // <-- add isActive here
    },
    validationSchema: Yup.object({
      walletAddress: Yup.string().required('Required'),
      collectionId: Yup.string().required('Required'),
      buyingPercentage: Yup.number().required('Required'),
      listPercentage: Yup.number().min(0).max(100).required('Required'),
      rankingPercentage: Yup.number().min(0).max(100).required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
      isActive: Yup.boolean(), // validation for isActive toggle
    }),
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        toast.success('Trade config updated successfully!');
        push({
          pathname: '/bot',
          query: {
            walletAddress: values.walletAddress,
            pwd: values.password,
          },
        });
        refetch();
      } catch (error) {
        console.error('Error updating trade config:', error);
        toast.error('Failed to update trade config. Please try again.');
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
  if (data) {
    // Only update formik values if they differ to prevent infinite loop
    if (
      formik.values.walletAddress !== (data.walletAddress || '') ||
      formik.values.collectionId !== (data.collectionId || '') ||
      formik.values.buyingPercentage !== (data.buyingPercentage || 10) ||
      formik.values.listPercentage !== (data.listPercentage || 5) ||
      formik.values.rankingPercentage !== (data.rankingPercentage || 15) ||
      formik.values.password !== (password || '') ||
      formik.values.isActive !== (data.isActive ?? false)
    ) {
      formik.setValues({
        walletAddress: data.walletAddress || '',
        collectionId: data.collectionId || '',
        buyingPercentage: data.buyingPercentage || 10,
        listPercentage: data.listPercentage || 5,
        rankingPercentage: data.rankingPercentage || 15,
        password: password || '',
        isActive: data.isActive ?? false,
      });
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [data, password]);

  if (!walletAddress || !password) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4'>
        <p className='text-red-500 text-center text-lg'>
          Missing wallet address or password in URL
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen mint-bg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse'></div>

        <form
          onSubmit={formik.handleSubmit}
          className='relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl min-w-[600px]'
        >
          <div className='flex items-center justify-center mb-8'>
            <div className='flex items-center gap-3'>
              <Bot className='w-8 h-8 text-cyan-400' />
              <h1 className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
               UPDATE BOT CONFIG
              </h1>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            <Input
              label='Wallet Address'
              icon={<Wallet className='w-4 h-4 text-cyan-400' />}
              className='col-span-full'
              {...formik.getFieldProps('walletAddress')}
              error={
                formik.touched.walletAddress && formik.errors.walletAddress
              }
            />

            <Input
              label='Collection ID'
              icon={<Bot className='w-4 h-4 text-blue-400' />}
              className='col-span-full'
              {...formik.getFieldProps('collectionId')}
              error={formik.touched.collectionId && formik.errors.collectionId}
            />
            <Input
              label='Buying %'
              type='number'
              icon={<TrendingUp className='w-4 h-4 text-green-400' />}
              {...formik.getFieldProps('buyingPercentage')}
              error={
                formik.touched.buyingPercentage &&
                formik.errors.buyingPercentage
              }
            />
            <Input
              label='List %'
              type='number'
              icon={<ListIcon className='w-4 h-4 text-yellow-400' />}
              {...formik.getFieldProps('listPercentage')}
              error={
                formik.touched.listPercentage && formik.errors.listPercentage
              }
            />
            <Input
              label='Ranking %'
              type='number'
              icon={<BarChart className='w-4 h-4 text-indigo-400' />}
              {...formik.getFieldProps('rankingPercentage')}
              error={
                formik.touched.rankingPercentage &&
                formik.errors.rankingPercentage
              }
            />
            <Input
              label='Password'
              disabled
              type={showPassword ? 'text' : 'password'}
              icon={<LockKeyhole className='w-4 h-4 text-pink-400' />}
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
            />

            {/* Toggle for isActive */}
            <div className='col-span-full flex items-center space-x-3'>
              <input
                type='checkbox'
                id='isActive'
                checked={formik.values.isActive}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='isActive'
                className='w-5 h-5 rounded border-gray-600 bg-gray-800 text-cyan-400 focus:ring-cyan-400'
              />
              <label htmlFor='isActive' className='text-white select-none'>
                Active
              </label>
            </div>
          </div>

          <button
            type='submit'
            disabled={isPending}
            className='w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25 transform hover:scale-105'
          >
            {isPending ? (
              <span className='flex items-center justify-center gap-2'>
                <Loader2 className='w-5 h-5 animate-spin' />
                Submitting...
              </span>
            ) : (
              'Update Config'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
