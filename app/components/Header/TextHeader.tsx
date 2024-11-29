import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React, { ReactElement } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../Button/Button';
import ProgressBar from '../Loaders/BarLoader';

interface Props {
  title: string;
  canGoBack?: boolean;
  loading?: boolean;
  empty?: boolean;
  children?: ReactElement | ReactElement[];
  onBack?: () => void;
}
export const TextHeader = ({
  title,
  canGoBack = true,
  loading,
  empty,
  children,
  onBack,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex flex-col border-b border-black/10">
      <StatusBar barStyle="light-content" />
      <View
        className={clsx('px-4 flex flex-row justify-between items-center py-2')}
        style={{
          paddingTop: top,
        }}
      >
        {canGoBack ? (
          <TouchableOpacity
            className="p-2"
            onPress={() => (onBack ? onBack() : router.back())}
          >
            <RemixIcon name="ri-arrow-left-line" />
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <Text className="font-semibold text-lg uppercase">{title}</Text>
        <RemixIcon name="ri-arrow-left-line" color="rgba(0,0,0,0)" />
      </View>
      {!loading && empty && (
        <View className="flex flex-col px-8 pb-4">
          <Text className="text-lg font-semibold">Nothing found !</Text>
          <Text className="text-sm text-black/50">
            Nothing was found on this page.
          </Text>
          <View className="mt-4">
            <Button label="Go back" />
          </View>
        </View>
      )}
      {loading && <ProgressBar isIndeterminate color="black" />}
      {children}
    </View>
  );
};
