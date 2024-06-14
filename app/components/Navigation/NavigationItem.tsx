import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  link: () => void;
  active: boolean;
  name: string;
  icon: string;
  main?: boolean;
}

export const NavigationItem = ({
  link,
  active = false,
  icon,
  name,
  main,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={link}
      className=" flex flex-col items-center justify-center"
    >
      <View className={clsx('flex flex-col items-center')}>
        <RemixIcon
          name={icon}
          size={25}
          color={active ? 'black' : 'rgba(0,0,0,.5)'}
        />
        {/* <Text
          className={clsx(
            'uppercase',
            active ? 'font-semibold text-black' : 'opacity-50'
          )}
        >
          {name}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};
