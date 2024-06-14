// @ts-ignore
import '@walletconnect/react-native-compat';

// @ts-ignore

import { BottomNavigation } from '@/components/Navigation/BottomNavigation';
import { ChatProvider } from '@/features/hooks/message-hook';
import { useUserHook } from '@/features/hooks/user-hook';
import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RootLayout = () => {
  const { bottom } = useSafeAreaInsets();
  const { user } = useUserHook();
  return (
    <View className="flex-1 flex flex-col ">
      <View className="flex-1 flex flex-col">
        <ChatProvider userId={user?.id!}>
          <Slot />
        </ChatProvider>
      </View>

      <View style={{ paddingBottom: bottom }}>
        <BottomNavigation />
      </View>
    </View>
  );
};

export default RootLayout;
