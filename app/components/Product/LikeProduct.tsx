import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  liked?: boolean;
}

export const LikeProduct = ({ liked }: Props) => {
  return (
    <TouchableOpacity className=" px-2 py-1 flex flex-col items-center rounded-full">
      <RemixIcon name={liked ? 'ri-heart-fill' : 'ri-heart-line'} />
      <Text className="text-black text-sm">O</Text>
    </TouchableOpacity>
  );
};
