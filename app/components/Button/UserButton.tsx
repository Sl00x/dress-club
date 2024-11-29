import { User } from '@/interfaces/user.interface';
import clsx from 'clsx';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  user?: User | null;
  onPress?: () => void;
}

export const UserButton = ({ user, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-300 rounded-full w-10 h-10 flex flex-row items-center justify-center"
    >
      <Text className="font-bold">
        {`${user?.firstname?.[0].toLocaleUpperCase()}${user?.lastname?.[0].toLocaleUpperCase()}`}
      </Text>
    </TouchableOpacity>
  );
};

export const Avatar = ({ user }: Props) => {
  return (
    <View
      className={clsx(
        'rounded-full w-12 h-12 flex flex-row items-center justify-center bg-blue-300'
      )}
    >
      <Text className="font-bold text-xl">
        {`${user?.firstname?.[0].toLocaleUpperCase()}${user?.lastname?.[0].toLocaleUpperCase()}`}
      </Text>
    </View>
  );
};
