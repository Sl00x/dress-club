import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  title: string;
  icon: string;
  color: string;
  value: string;
  onPress?: () => void;
}
export const ValueCard = ({ title, color, value, onPress, icon }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full border border-black/10 rounded-xl p-4 "
    >
      <View className="flex flex-row justify-between items-center">
        <View className="relative">
          <View
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: color }}
          >
            <RemixIcon name={icon} color="black" size={20} />
          </View>
        </View>
        <View className="flex flex-col items-end">
          <Text className="text-3xl font-semibold">{value}</Text>
          <Text className="text-md text-black/50">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
