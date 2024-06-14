import LoadingPage from '@/components/LoadingPage/LoadingPage';
import { useUserHook } from '@/features/hooks/user-hook';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

const IndexPage = () => {
  const { user, isSuccess } = useUserHook();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (user === null) return router.push('/(auth)/login');
      if (isSuccess || user) return router.push('/(root)/home');
    }, 1000);
  }, [isSuccess, user]);
  return <LoadingPage />;
};
export default IndexPage;
