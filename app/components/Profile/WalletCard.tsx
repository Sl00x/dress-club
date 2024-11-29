import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  onSwitch?: () => void;
}

export const WalletCard = ({ onSwitch }: Props) => {
  return (
    <View className="w-full border border-black/10 rounded-xl p-4 flex flex-row justify-between items-center">
      <View className="relative pb-4">
        <View className="bg-black w-14 h-14 flex items-center justify-center rounded-lg">
          <RemixIcon name="ri-wallet-3-line" color="white" size={40} />
        </View>
        <TouchableOpacity
          onPress={onSwitch}
          className="absolute bottom-0 -right-4 bg-purple-500 w-10 h-10 flex items-center justify-center rounded-lg border-2 border-white"
        >
          <RemixIcon name="ri-arrow-left-right-fill" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-end">
        <Text className="text-3xl font-semibold">0.00 €</Text>
        <Text className="text-sm text-black/50">Mon portefeuille</Text>
      </View>
    </View>
  );
};
