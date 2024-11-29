import { Spinner } from '@/components/Loaders/Spinner';
import { useChat } from '@/features/hooks/message-hook';
import { useUserHook } from '@/features/hooks/user-hook';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatPage = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useUserHook();
  const { users, isLoading } = useChat();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="h-full bg-white flex flex-col justify-center items-center">
        <Spinner size={32} color="black" />
        <Text>Chargement</Text>
      </View>
    );
  }
  return (
    <View className="h-full bg-[#EFE9AE]">
      <View style={{ paddingTop: top }}>
        <View className="flex flex-col space-y-4 py-4">
          <View className="flex flex-row w-full justify-center space-x-2 items-center px-4">
            <Text className="flex-1 text-xl font-semibold text-black">
              Messages
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-1 bg-white p-4 h-full">
        <FlatList
          className="h-full"
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(
                  `/(root)/notifications/private?id=${item.id}&name=${
                    item.firstname
                  } ${item.lastname}&color=${item.color?.replaceAll('#', '_')}`
                );
              }}
              className="flex flex-row space-x-2 items-center p-2 "
            >
              <View
                className="w-10 h-10 rounded-full flex flex-row justify-center items-center"
                style={{ backgroundColor: item.color }}
              >
                <Text className="font-bold">
                  {item?.firstname![0]}
                  {item?.lastname![0]}
                </Text>
              </View>
              <Text className="font-semibold text-lg">
                {item.firstname} {item.lastname}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ChatPage;
