import ViewLogs from '@/components/ViewLogs';
import { useGetCollectionTradeLog } from '@/services/useAuthServices'; // or wherever your logs are
import clsx from 'clsx';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/router';

export default function CollectionLogsPage() {
  const { query } = useRouter();
  console.log('Query params:', query);
  // Extract walletAddress and pwd from URL query params
  const collectionId = (query.collectionId as string) ?? '';
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetCollectionTradeLog({ collectionId });

  return (
    <div className='min-h-screen flex flex-col items-center justify-center mint-bg px-4 py-8'>
      <div className='bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl w-full max-w-4xl'>
        {isLoading && (
          <p className='text-center text-cyan-400 animate-pulse'>Loading...</p>
        )}

        {isError && (
          <p className='text-center text-red-500'>
            Error loading config: {(error as Error)?.message || 'Unknown error'}
          </p>
        )}
        {data && (
          <div className=' text-white'>
            <h1 className='text-xl font-bold mb-4 flex'>
              Collection Activity Logs{' '}
              <RefreshCcw
                size={18}
                onClick={() => refetch()}
                className={clsx(
                  'text-amber-500 m-2 cursor-pointer',
                  isFetching && 'animate-spin'
                )}
              />
            </h1>
            <ViewLogs logs={data} />
          </div>
        )}
      </div>
    </div>
  );
}
