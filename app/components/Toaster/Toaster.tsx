import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Animated, Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastContextType = {
  toast: (type: ToastType, message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface Props {
  children: ReactElement | ReactElement[];
}

export enum ToastType {
  SUCCESS,
  ERROR,
  BLACK,
  WHITE,
  WARNING,
  INFO,
}

export const ToastProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const [opacity] = useState(new Animated.Value(0));
  const [type, setType] = useState<ToastType | null>(null);
  const { bottom } = useSafeAreaInsets();
  const [timeout, setTime] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (message) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        timeOut = setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setMessage(null);
            setType(null);
          });
        }, 2000);
      });
    }
    return () => clearTimeout(timeOut);
  }, [message, opacity]);

  const toast = (type: ToastType, message: string) => {
    setMessage(message);
    setType(type);
  };

  const typeToast = () => {
    switch (type) {
      case ToastType.BLACK:
        return (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-black p-4 z-[1000]"
            style={[
              {
                opacity,
                paddingBottom: bottom + Platform.OS === 'android' ? 100 : 0,
              },
            ]}
          >
            <Text className="text-white text-lg">{message}</Text>
          </Animated.View>
        );

      case ToastType.WHITE:
        return (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-white p-4"
            style={[{ opacity, paddingBottom: bottom }]}
          >
            <Text className="text-black text-lg">{message}</Text>
          </Animated.View>
        );
      case ToastType.SUCCESS:
        return (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-green-400 p-4 py-6"
            style={[{ opacity, paddingBottom: bottom }]}
          >
            <Text className="text-white text-lg">{message}</Text>
          </Animated.View>
        );
      case ToastType.ERROR:
        return (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-red-400 p-4"
            style={[{ opacity, paddingBottom: bottom }]}
          >
            <Text className="text-white text-lg">{message}</Text>
          </Animated.View>
        );
      case ToastType.INFO:
        return (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-blue-400 p-4"
            style={[{ opacity, paddingBottom: bottom }]}
          >
            <Text className="text-black text-lg">{message}</Text>
          </Animated.View>
        );
      case ToastType.WARNING:
        return (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-orange-300 p-4"
            style={[{ opacity, paddingBottom: bottom }]}
          >
            <Text className="text-black text-lg">{message}</Text>
          </Animated.View>
        );
    }
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && <>{typeToast()}</>}
    </ToastContext.Provider>
  );
};
