'use client';
import { RiShoppingBag2Line } from '@remixicon/react';
import Link from 'next/link';
import { useGetAllCategoryQuery } from '../../features/api/root-api';
import { useUserHook } from '../../features/hooks/user-hook';
import { LogoText } from '../Logo/LogoText';
import { Avatar } from '../User/Avatar';

export const TopNavigation = () => {
  const { user } = useUserHook();
  const { data } = useGetAllCategoryQuery();

  return (
    <div className='flex flex-col px-20 space-y-4 border-b border-black/10'>
      <div className='flex flex-row justify-between w-full pt-5'>
        <LogoText />
        <div className='flex flex-row items-center space-x-6'>
          <RiShoppingBag2Line />
          <Link href={''} className='bg-black text-white rounded-md p-2 px-4'>
            Vendre
          </Link>
          <Avatar user={user} />
        </div>
      </div>
      <div className='flex flex-row space-x-10 items-center pb-5'>
        <span className='cursor-pointer text-black/50 hover:text-black'>Tous les produits</span>
        {data?.map((category) => (
          <span className='cursor-pointer text-black/50 hover:text-black'>{category.name}</span>
        ))}
      </div>
    </div>
  );
};
