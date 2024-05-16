import { startRotationAnimation } from '@/utils/loader.utils';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  size: number;
  color?: string;
}

export const Spinner = ({ size = 14, color = 'white' }: Props) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(1000, rotationDegree);
  }, [rotationDegree]);
  return (
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
      <RemixIcon name="ri-loader-5-line" color={color} size={size} />
    </Animated.View>
  );
};
