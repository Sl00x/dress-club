import { Slot } from 'expo-router';
import { View } from 'react-native';

const AuthLayout = () => {
  return (
    <View className="w-full h-full">
      <Slot />
    </View>
  );
};

export default AuthLayout;
