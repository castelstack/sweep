'use client';

import { useGetTradeConfig } from '@/services/useAuthServices';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function BotConfigPage() {
  const { query, push } = useRouter();

  // Extract walletAddress and pwd from URL query params
  const walletAddress = query.walletAddress ?? '';
  const password = query.pwd ?? '';

  // Fetch bot config
  const { data, isLoading, isError, error, refetch } = useGetTradeConfig(
    walletAddress as string,
    password as string
  );
 console.log('Suiper Data:', data);
  useEffect(() => {
    if (!walletAddress || !password) {
      toast.error('Missing wallet address or password in URL');
    }
  }, [walletAddress, password]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center mint-bg px-4 py-8'>
      <div className='bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl w-full max-w-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          Your Bot Config
        </h1>

        {isLoading && (
          <p className='text-center text-cyan-400 animate-pulse'>Loading...</p>
        )}

        {isError && (
          <p className='text-center text-red-500'>
            Error loading config: {(error as Error)?.message || 'Unknown error'}
          </p>
        )}

        {data && (
          <>
            <div className='space-y-4 text-white mb-4'>
              <div>
                <strong>Wallet Address:</strong>{' '}
                <span className='break-all'>{data.walletAddress}</span>
              </div>
              <div>
                <strong>Collection ID:</strong> {data.collectionId}
              </div>
              <div>
                <strong>Buying %:</strong> {data.buyingPercentage}%
              </div>
              <div>
                <strong>List %:</strong> {data.listPercentage}%
              </div>
              <div>
                <strong>Ranking %:</strong> {data.rankingPercentage}%
              </div>
              <div>
                <strong>Active:</strong> {data.isActive ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Created At:</strong>{' '}
                {new Date(data.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Updated At:</strong>{' '}
                {new Date(data.updatedAt).toLocaleString()}
              </div>
            </div>

            {/* Refresh button */}
            <div className='flex justify-end mb-6'>
              <button
                onClick={() => refetch()}
                disabled={isLoading || !walletAddress || !password}
                className='px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition'
              >
                Refresh
              </button>
            </div>
          </>
        )}

        {/* CTAs */}
        <div className='mt-4 flex flex-col gap-4'>
          <button
            onClick={() =>
              push({
                pathname: '/update-bot',
                query: { walletAddress, pwd: password },
              })
            }
            disabled={!walletAddress || !password}
            className='w-full py-3 rounded-2xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25 transition-transform transform hover:scale-105'
          >
            Update Bot Config
          </button>

          <button
            onClick={() =>
              push({
                pathname: '/update-password',
                query: { walletAddress },
              })
            }
            disabled={!walletAddress || !password}
            className='w-full py-3 rounded-2xl font-bold text-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-pink-500/25 transition-transform transform hover:scale-105'
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
