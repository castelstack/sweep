import React, { useEffect } from 'react';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/router';
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, account } = useWallet();
  const { push } = useRouter();
  useEffect(() => {
     if (status === 'disconnected' && !account?.address) {
      push('/');
    }
  }, [status, account?.address, push]);

  return (
    <div className='relative min-h-screen bg-gray-900 text-white'>
      {/* Top-right connect wallet section */}
      <div
        className={clsx(
          'absolute top-4 right-4 z-50',
          status === 'connected' &&
            account?.address &&
            'bg-cyan-500 rounded-md !text-sm'
        )}
      >
        <ConnectButton
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '250px',
            height: '48px',
            boxShadow: 'none',
            transition: 'transform 0.2s ease-in-out',
          }}
          className='focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          <div className='cursor-pointer'>
            <Image
              src={'/images/connect-btn-hover.png'}
              alt='Connect Button'
              width={250}
              height={48}
              priority
              className='hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out'
            />
          </div>
        </ConnectButton>
      </div>

      {/* App content */}
      <main className=''>{children}</main>
    </div>
  );
};
