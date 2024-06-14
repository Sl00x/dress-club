import { useUserHook } from '@/features/hooks/user-hook';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserButton } from '../Button/UserButton';

export const LogoHeader = () => {
  const { top } = useSafeAreaInsets();

  const { user, logout } = useUserHook();
  const router = useRouter();
  return (
    <View
      className="px-4 flex flex-row justify-between items-center"
      style={{
        paddingTop: top,
      }}
    >
      <TouchableOpacity onPress={() => router.push('/subcat' as any)}>
        <RemixIcon name="ri-shopping-bag-2-line" />
      </TouchableOpacity>
      <Image
        className="object-center"
        source={require('../../assets/images/black_logo.png')}
        style={{ height: 100 }}
        resizeMode="center"
      />
      <UserButton user={user} onPress={() => router.push('/(root)/profile')} />
    </View>
  );
};
