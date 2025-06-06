'use client';

import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { useGetSuiper } from '@/services/useAuthServices';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const { data } = useGetSuiper();
  console.log('Suiper Data:', data);
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} home-bg grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className='flex flex-col gap-[32px] row-start-2 items-center'>
        <Image
          src='/images/nft.gif'
          alt='NFT animation'
          width={380}
          height={38}
          priority
        />

        <Link href='/check-bot'>
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
        </Link>
      </main>
    </div>
  );
}
