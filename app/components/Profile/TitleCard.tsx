import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  title: string;
  icon: string;
  color: string;

  onPress?: () => void;
}
export const TitleCard = ({ title, color, onPress, icon }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full border border-black/10 rounded-xl p-4 "
    >
      <View className="flex flex-row justify-start space-x-2 items-center">
        <View className="relative">
          <View
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: color }}
          >
            <RemixIcon name={icon} color="black" size={20} />
          </View>
        </View>
        <Text className="text-lg text-black font-semibold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
