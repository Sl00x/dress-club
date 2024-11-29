import { Image } from 'react-native';

interface Props {
  light?: boolean;
  height: number;
}

export const Logo = ({ light, height }: Props) => {
  return (
    <Image
      source={
        light
          ? require('../../assets/images/logo.png')
          : require('../../assets/images/black_logo.png')
      }
      style={{ height: height }}
      resizeMode="contain"
    />
  );
};
