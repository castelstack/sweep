import clsx from 'clsx';
import React from 'react';

type Log = {
  _id: string;
  walletAddress: string;
  collectionId: string;
  tradeParameters: {
    rankingPercentage: number;
    buyingPercentage: number;
    listPercentage: number;
  };
  floorPrice: number;
  nftsFound: number;
  nftsBought: number;
  nftsListed: number;
  logType: string;
  createdAt: string;
};

type ViewLogsProps = {
  logs: Log[];
};

const ViewLogs: React.FC<ViewLogsProps> = ({ logs }) => {
  return (
    <div className='w-full p-4 space-y-4 overflow-y-auto max-h-[80vh]'>
      {logs.map((log) => (
        <div
          key={log._id}
          className='border border-gray-700 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-gray-800 shadow-md p-4 text-sm text-white'
        >
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between text-xs text-gray-400'>
              <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
              <span className='uppercase tracking-wide bg-gray-700 px-2 py-0.5 rounded text-[10px]'>
                {log.logType}
              </span>
            </div>

            <div className='text-gray-300 truncate'>
              <span className='font-semibold text-gray-400'>Wallet:</span>{' '}
              {log.walletAddress.slice(0, 6)}...{log.walletAddress.slice(-4)}
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 text-xs'>
              <div className='text-gray-300'>
                <span className='text-gray-500'>Floor:</span> Ξ{log.floorPrice}
              </div>
              <div
                className={clsx(
                  'text-xs',
                  log.nftsFound > 0
                    ? '!text-green-400 font-semibold'
                    : 'text-gray-300'
                )}
              >
                <span
                  className={clsx(
                    'text-xs',
                    log.nftsFound > 0
                      ? '!text-green-500 font-semibold'
                      : 'text-gray-500'
                  )}
                >
                  Found:
                </span>{' '}
                {log.nftsFound}
              </div>
              <div
                className={clsx(
                  'text-xs',
                  log.nftsBought > 0
                    ? 'text-amber-400 font-semibold'
                    : 'text-gray-300'
                )}
              >
                <span
                  className={clsx(
                    'text-xs',
                    log.nftsBought > 0
                      ? 'text-amber-500 font-semibold'
                      : 'text-gray-500'
                  )}
                >
                  Bought:
                </span>{' '}
                {log.nftsBought}
              </div>
              <div
                className={clsx(
                  'text-xs',
                  log.nftsListed > 0
                    ? 'text-cyan-400 font-semibold'
                    : 'text-gray-300'
                )}
              >
                <span
                  className={clsx(
                    'text-xs',
                    log.nftsListed > 0
                      ? 'text-cyan-500 font-semibold'
                      : 'text-gray-500'
                  )}
                >
                  Listed:
                </span>{' '}
                {log.nftsListed}
              </div>
              <div className='text-gray-300'>
                <span className='text-gray-500'>Buy %:</span>{' '}
                {log.tradeParameters.buyingPercentage}%
              </div>
              <div className='text-gray-300'>
                <span className='text-gray-500'>List %:</span>{' '}
                {log.tradeParameters.listPercentage}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewLogs;
