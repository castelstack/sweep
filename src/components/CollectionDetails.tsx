'use client';

import { useGetNFtCollection } from '@/services/useAuthServices';
import { BadgeCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function NFTCollectionCard({
  collectionId,
}: {
  collectionId: string;
}) {
  const { data, isLoading, isError } = useGetNFtCollection({
    id: collectionId,
  });
  console.log(data);
  if (!collectionId) {
    return (
      <div className=' flex items-center justify-center  px-4'>
        <p className='text-red-500 text-center text-lg'>
          Missing collection ID in URL
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className=' flex items-center justify-center  px-4'>
        <Loader2 className='w-8 h-8 text-white animate-spin' />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className=' flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4'>
        <p className='text-red-500 text-center text-lg'>
          Failed to load collection data.
        </p>
      </div>
    );
  }

  const {
    slug,
    title,
    cover_url,
    supply,
    verified,
    floor,
    usd_volume,
    volume,
  } = data;

  return (
    <div className='relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 shadow-2xl w-full'>
      <div className='flex items-center gap-4 mb-6'>
        <Image
          src={cover_url}
          alt={title}
          width={64}
          height={64}
          className='rounded-xl border border-gray-700 object-cover'
        />
        <div>
          <h1 className='text-3xl font-bold text-white flex items-center gap-2'>
            {title}
            {verified && <BadgeCheck className='w-6 h-6 text-green-400' />}
          </h1>
          <p className='text-sm text-gray-400 truncate w-[200px]'>{slug}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 text-white'>
        <div>
          <p className='text-gray-400 text-sm'>Supply</p>
          <p className='font-semibold'>{supply.toLocaleString()}</p>
        </div>
        <div>
          <p className='text-gray-400 text-sm'>Floor Price (SUI)</p>
          <p className='font-semibold'>{(floor / 1e9).toFixed(2)} SUI</p>
        </div>
        <div>
          <p className='text-gray-400 text-sm'>24h Volume (USD)</p>
          <p className='font-semibold'>
            $
            {usd_volume.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div>
          <p className='text-gray-400 text-sm'>24h Volume (SUI)</p>
          <p className='font-semibold'>{(volume / 1e9).toFixed(2)} SUI</p>
        </div>
      </div>
    </div>
  );
}
