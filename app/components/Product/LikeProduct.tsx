import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  liked?: boolean;
  count?: number;
  onPress?: () => void;
}

export const LikeProduct = ({ liked, onPress, count }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" px-2 py-1 flex flex-col items-center rounded-full"
    >
      <RemixIcon name={liked ? 'ri-heart-fill' : 'ri-heart-line'} />
      <Text className="text-black text-sm">{count || 0}</Text>
    </TouchableOpacity>
  );
};
