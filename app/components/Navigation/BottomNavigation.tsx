import { useRouter, useSegments } from 'expo-router';
import { Platform, View } from 'react-native';
import { NavigationItem } from './NavigationItem';

import { NavigationItems } from '@/constants/navigation.const';
import clsx from 'clsx';
import React from 'react';

export const BottomNavigation = () => {
  const router = useRouter();
  const segments = useSegments();

  return (
    <View
      className={clsx(
        'w-full px-6  pt-6 flex flex-row justify-between items-center bg-white',
        Platform.OS === 'android' && 'pb-6'
      )}
    >
      {NavigationItems.map((navigation) => (
        <View key={navigation.identifier}>
          <NavigationItem
            link={() => {
              router.push(navigation.link);
            }}
            name={navigation.name}
            main={navigation.main}
            icon={navigation.icon}
            active={segments[1].toUpperCase() === navigation.identifier}
          />
        </View>
      ))}
    </View>
  );
};
