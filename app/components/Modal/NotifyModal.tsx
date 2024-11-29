import clsx from 'clsx';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../Button/Button';

interface Props {
  title: string;
  open?: boolean;
  full?: boolean;
  children?: ReactElement | ReactElement[];
  onClose?: () => void;
}

export default function NotifyModal({
  open,
  children,
  onClose,
  full,
  title,
}: Props) {
  const { top, bottom } = useSafeAreaInsets();

  const [visible, setVisible] = useState(open);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [open, translateY]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      className="relative"
      visible={open}
      onDismiss={onClose}
    >
      <Animated.View
        className={clsx(
          'absolute top-0 space-y-3 flex flex-col w-full bg-white h-full'
        )}
      >
        <View className="bg-white w-ful flex-1 rounded-t-[20px]">
          <View
            className="flex flex-row justify-between items-center border-b border-black/10 py-4 px-4"
            style={{
              paddingTop: top,
            }}
          >
            <RemixIcon name="ri-close-line" color="rgba(0,0,0,0)" />
            <Text className="text-lg uppercase font-semibold">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <RemixIcon name="ri-close-line" color="black" />
            </TouchableOpacity>
          </View>
          <View className="p-4 flex-1" style={{ paddingBottom: bottom + 10 }}>
            <View className="flex-1">{children}</View>
            <View>
              <Button variant="danger" label="fermer" onPress={onClose} />
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
