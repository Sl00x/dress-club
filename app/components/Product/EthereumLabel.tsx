import React from 'react';
import { Text, View } from 'react-native';
import { useAccount } from 'wagmi';

export const EthereumLabel = () => {
  const { address } = useAccount();
  return (
    <View className=" px-2 py-1 flex flex-row items-center space-x-1 rounded-full bg-purple-300/50">
      <Text className="text-purple-800 text-[10px] font-extrabold">ETH</Text>
      {address && <View className="w-2 h-2 bg-green-500 rounded-full" />}
    </View>
  );
};
