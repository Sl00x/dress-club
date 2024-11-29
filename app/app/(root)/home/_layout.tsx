import { LogoHeader } from '@/components/Header/LogoHeader';
import { Slot } from 'expo-router';
import { View } from 'react-native';

const HomeLayout = () => {
  return (
    <View className="h-full w-full">
      <LogoHeader />
      <View className="flex-1 px-8 py-2">
        <Slot />
      </View>
    </View>
  );
};
export default HomeLayout;
