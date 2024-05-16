import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Animated, Modal, PanResponder, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  title: string;
  open?: boolean;
  full?: boolean;
  children?: ReactElement | ReactElement[];
  onClose?: () => void;
}

export default function ModalScreen({
  open,
  children,
  onClose,
  full,
  title,
}: Props) {
  const { bottom } = useSafeAreaInsets();

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

  const checkHeightToClose = full ? 10 : 100;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > checkHeightToClose) {
          if (onClose) onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      className="relative"
      transparent
      visible={open}
      onDismiss={onClose}
    >
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
        className={clsx(
          'absolute  bottom-0 space-y-3 flex flex-col w-full bg-white',
          full ? 'h-[90%]' : 'h-auto'
        )}
      >
        <View
          className="flex flex-row justify-center pt-10"
          {...panResponder.panHandlers}
        >
          <View className="bg-black shadow-md w-40 h-1 rounded-full" />
        </View>
        <View
          className="bg-white border border-black/10 w-ful flex-1 shadow-lg max-h-1/3 h-1/3 rounded-t-[20px]"
          style={{ paddingBottom: bottom }}
        >
          <View className="flex flex-row justify-center items-center border-b border-black/10 py-4">
            <Text className="text-lg uppercase font-semibold">{title}</Text>
          </View>
          <View className="p-4">{children}</View>
        </View>
      </Animated.View>
    </Modal>
  );
}
