import { useRouter, useSegments } from 'expo-router';
import { View } from 'react-native';
import { NavigationItem } from './NavigationItem';

import { NavigationItems } from '@/constants/navigation.const';

export const BottomNavigation = () => {
  const router = useRouter();
  const segments = useSegments();

  return (
    <View className="w-full px-6 flex flex-row space-x-4 justify-between items-center">
      {NavigationItems.map((navigation) => (
        <View key={navigation.identifier}>
          <NavigationItem
            link={() => {
              router.push(navigation.link);
            }}
            name={navigation.name}
            icon={navigation.icon}
            active={segments[1].toUpperCase() === navigation.identifier}
          />
        </View>
      ))}
    </View>
  );
};
