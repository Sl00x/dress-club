import { startRotationAnimation } from '@/utils/loader.utils';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { Logo } from '../Logo/Logo';

const LoadingPage = () => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(1000, rotationDegree);
  }, [rotationDegree]);

  return (
    <View className="w-full h-full bg-black flex flex-col items-center justify-between py-20">
      <View />
      <Logo height={100} light />

      <Animated.View
        className="animate-spin"
        style={{
          transform: [
            {
              rotateZ: rotationDegree.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        <RemixIcon name="ri-loader-5-line" color="white" size={32} />
      </Animated.View>
    </View>
  );
};
export default LoadingPage;
