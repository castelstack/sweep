'use client';

import { Input } from '@/components/input';
import { useCreateTradeConfig } from '@/services/useAuthServices';
import { useWallet } from '@suiet/wallet-kit';
import { useFormik } from 'formik';
import {
  BarChart,
  Bot,
  List as ListIcon,
  Loader2,
  LockKeyhole,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

export default function CreateTradeConfigCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isPending } = useCreateTradeConfig();
  const { push } = useRouter();
  const { account } = useWallet();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formikRef: any = useRef(null);

  const formik = useFormik({
    initialValues: {
      walletAddress: account?.address || '',
      privateKey: '',
      collectionId: '',
      buyingPercentage: 10,
      listPercentage: 5,
      rankingPercentage: 15,
      password: '',
      // confirmPassword: '',
    },
    validationSchema: Yup.object({
      walletAddress: Yup.string().required('Required'),
      privateKey: Yup.string().required('Required'),
      collectionId: Yup.string().required('Required'),
      buyingPercentage: Yup.number().required('Required'),
      listPercentage: Yup.number().min(0).max(100).required('Required'),
      rankingPercentage: Yup.number().min(0).max(100).required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
      // confirmPassword: Yup.string()
      //   .oneOf([Yup.ref('password')], 'Passwords must match')
      //   .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form data:', values);
        await mutateAsync(values);
        resetForm();
        toast.success('Trade config created successfully!');
      } catch (error) {
        console.error('Error creating trade config:', error);
        toast.error('Failed to create trade config. Please try again.');
      }
    },
  });



  return (
    <div className='min-h-screen mint-bg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse'></div>

        <form
          ref={formikRef}
          onSubmit={formik.handleSubmit}
          className='relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl min-w-[600px]'
        >
          <div className='flex items-center justify-center mb-8'>
            <div className='flex items-center gap-3'>
              <Bot className='w-8 h-8 text-cyan-400' />
              <h1 className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                CREATE BUY BOT CONFIG
              </h1>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            <Input
              label='Wallet Address'
              // disabled={account?.address ? true : false}
              icon={<Wallet className='w-4 h-4 text-cyan-400' />}
              {...formik.getFieldProps('walletAddress')}
              error={
                formik.touched.walletAddress && formik.errors.walletAddress
              }
            />
            <Input
              label='Private Key'
              type='password'
              icon={<LockKeyhole className='w-4 h-4 text-purple-400' />}
              {...formik.getFieldProps('privateKey')}
              error={formik.touched.privateKey && formik.errors.privateKey}
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
            {/* <Input
              label='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              icon={<LockKeyhole className='w-4 h-4 text-pink-400' />}
              {...formik.getFieldProps('confirmPassword')}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            /> */}
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
              'Create Config'
            )}
          </button>
          <button
            type='button'
            onClick={() =>
              push({
                pathname: '/check-bot',
              })
            }
            className='w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300  text-green-500  shadow-lg hover:shadow-green-500/25 transform hover:scale-105'
          >
            Check Existing Bot
          </button>
        </form>
      </div>
    </div>
  );
}
