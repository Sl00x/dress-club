import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  color: string;
}

export const OfferCard = ({ color }: Props) => {
  return (
    <View className="w-full border flex-1 border-black/10 rounded-xl p-4 ">
      <View className="flex flex-row justify-between border-b border-black/10 pb-2 ">
        <View className="relative">
          <View
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: color,
            }}
          >
            <RemixIcon name="ri-coin-line" color="black" size={20} />
          </View>
        </View>
        <View className="flex flex-col items-end">
          <Text className="text-2xl font-semibold">0</Text>
          <Text className="text-sm text-black/50">Offres</Text>
        </View>
      </View>
      <View className="flex flex-col flex-1 items-center">
        <View className="flex-1 p-2">
          <Text className="text-black/50">Aucun offres</Text>
        </View>
        <TouchableOpacity>
          <Text>Voir tout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
