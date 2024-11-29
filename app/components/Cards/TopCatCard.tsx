import clsx from 'clsx';
import { Image } from 'expo-image';
import {
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  image: ImageSourcePropType;
  name: string;
  likes: number;
  light?: boolean;
}

export const TopCatCard = ({ image, name, likes, light }: Props) => {
  return (
    <TouchableOpacity className="relative w-full h-auto aspect-square rounded-xl">
      <Image
        recyclingKey={name}
        cachePolicy="memory"
        source={image}
        className="absolute z-1 w-full h-full rounded-lg"
      />
      <View className="absolute z-2 top-4 right-4 bg-black p-2 rounded-full">
        <Text className="text-white text-xs font-semibold">Tendance</Text>
      </View>
      <View className="absolute z-2 bottom-4 left-4 flex flex-col space-y-2">
        <Text className={clsx('text-xl font-semibold', light && 'text-white')}>
          {name}
        </Text>
        <View className="flex flex-row items-center space-x-1">
          <Text
            className={clsx(
              'text-sm opacity-50 font-medium',
              light && 'text-white'
            )}
          >
            {likes}
          </Text>
          <RemixIcon
            name="ri-heart-line"
            color={light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
            size={16}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
