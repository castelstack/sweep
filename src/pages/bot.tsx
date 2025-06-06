'use client';

import NFTCollectionCard from '@/components/CollectionDetails';
import { useGetTradeConfig } from '@/services/useAuthServices';
import clsx from 'clsx';
import { RefreshCcw } from 'lucide-react';
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
      <div className='bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl w-full max-w-2xl'>
        {data && <NFTCollectionCard collectionId={data?.collectionId} />}

        {isLoading && (
          <p className='text-center text-cyan-400 animate-pulse'>Loading...</p>
        )}

        {isError && (
          <p className='text-center text-red-500'>
            Error loading config: {(error as Error)?.message || 'Unknown error'}
          </p>
        )}

        {data && (
          <div className='bg-gray-900 border border-gray-700 rounded-2xl p-6 mt-5 shadow-xl text-white space-y-6'>
            <div className='flex  justify-items-center justify-center items-center'>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center'>
                Bot Configuration Details
              </h2>

              <RefreshCcw
                size={18}
                onClick={() => refetch()}
                className={clsx(
                  'text-amber-500 m-2 cursor-pointer',
                  isLoading && 'animate-spin'
                )}
              />
            </div>
            <div className='text-center mb-6'>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  data?.isActive
                    ? 'bg-green-600/20 text-green-400 border border-green-400/50'
                    : 'bg-red-600/20 text-red-400 border border-red-400/50'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    data?.isActive ? 'bg-green-400' : 'bg-red-400'
                  }`}
                ></span>
                Bot is {data?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base'>
              <InfoRow label='Wallet Address' value={data.walletAddress} wrap />
              <InfoRow label='Collection ID' value={data.collectionId} />
              <InfoRow label='Buying %' value={`${data.buyingPercentage}%`} />
              <InfoRow label='List %' value={`${data.listPercentage}%`} />
              <InfoRow label='Ranking %' value={`${data.rankingPercentage}%`} />
              <InfoRow
                label='Created At'
                value={new Date(data.createdAt).toLocaleString()}
              />
              <InfoRow
                label='Updated At'
                value={new Date(data.updatedAt).toLocaleString()}
              />
            </div>
          </div>
        )}

        {data && (
          <>
            {/* CTAs */}
            <div className='mt-6 grid md:grid-cols-2 gap-4'>
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
          </>
        )}
        {isError && (
          <button
            onClick={() =>
              push({
                pathname: '/check-bot',
              })
            }
            className='w-full py-3 mt-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-pink-500/25 transition-transform transform hover:scale-105'
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

const InfoRow = ({
  label,
  value,
  wrap = false,
}: {
  label: string;
  value: string | number;
  wrap?: boolean;
}) => (
  <div className='flex flex-col'>
    <span className='text-gray-400 text-sm mb-1'>{label}</span>
    <span className={`${wrap ? 'break-all' : ''} font-medium text-white`}>
      {value}
    </span>
  </div>
);
