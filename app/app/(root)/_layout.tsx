import { BottomNavigation } from '@/components/Navigation/BottomNavigation';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RootLayout = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <StatusBar style="inverted" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex flex-col flex-1 h-screen w-screen"
      >
        <View className="flex-1">
          <Slot />
        </View>
      </KeyboardAvoidingView>
      <View style={{ paddingBottom: bottom }}>
        <BottomNavigation />
      </View>
    </View>
  );
};

export default RootLayout;
