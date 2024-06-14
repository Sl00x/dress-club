import { useChat } from '@/features/hooks/message-hook';
import { useUserHook } from '@/features/hooks/user-hook';
import clsx from 'clsx';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatPage = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useUserHook();
  const { id, name, color } = useLocalSearchParams();
  const { messages, joinRoom, sendMessage } = useChat();
  const router = useRouter();
  const [currentText, setCurrentText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    joinRoom(id as string);
  }, [id, joinRoom]);

  const handleSendMessage = () => {
    if (currentText.length < 1) return;
    sendMessage({
      authorId: user?.id!,
      receiverId: id as string,
      message: currentText,
    });
    setCurrentText('');
  };

  return (
    <View
      className="h-full"
      style={{
        backgroundColor: (color as string).replace('_', '#') || 'white',
      }}
    >
      <View style={{ paddingTop: top }}>
        <View className="flex flex-col space-y-4 py-4">
          <View className="flex flex-row w-full justify-center space-x-2 items-center px-4">
            <Text className="flex-1 text-xl font-semibold text-black">
              {name}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1 flex flex-col bg-white px-4 pt-2 shadow-xl">
        <FlatList
          className="flex-1"
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          ref={flatListRef}
          onContentSizeChange={() => {
            if (flatListRef && flatListRef.current)
              flatListRef.current.scrollToEnd({
                animated: true,
              });
          }}
          renderItem={({ item }) => (
            <View
              className={clsx(
                'w-full flex flex-row',
                item.authorId === user?.id! ? 'justify-end' : 'justify-start'
              )}
            >
              <View
                className={clsx(
                  'mb-2 max-w-1/2 w-auto p-3 px-4',
                  item.authorId === user?.id!
                    ? 'rounded-t-xl rounded-l-xl'
                    : 'rounded-t-xl rounded-r-xl'
                )}
                style={{
                  backgroundColor:
                    item.authorId === user?.id!
                      ? '#1B1F3B'
                      : 'rgba(0,0,0,0.10)',
                }}
              >
                <Text
                  className={clsx(
                    item.authorId === user?.id! ? 'text-white' : 'text-black'
                  )}
                >
                  {item.message}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View className="p-2 bg-white border-t border-black/10">
        <View className="bg-black/10 rounded-full p-2  flex flex-row items-center">
          <TextInput
            className="flex-1 bg-opacity-0 pl-2"
            keyboardType="default"
            returnKeyType="done"
            placeholder="Entrer un message..."
            onChangeText={setCurrentText}
            value={currentText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            className="p-2 rounded-full flex flex-row justify-center items-center shadow-sm"
            style={{
              elevation: 8,
              backgroundColor: (color as string).replace('_', '#'),
            }}
          >
            <RemixIcon name="ri-send-plane-fill" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatPage;
