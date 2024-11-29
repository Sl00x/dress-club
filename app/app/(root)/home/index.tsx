import { useToast } from '@/components/Toaster/Toaster';
import { useUserHook } from '@/features/hooks/user-hook';
import { useWeb3Modal } from '@web3modal/wagmi-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { useAccount } from 'wagmi';

const HomePage = () => {
  const { toast } = useToast();
  const { logout } = useUserHook();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <View className="h-full w-ful space-y-3">
      <Text>Home Page</Text>
    </View>
  );
};

export default HomePage;
