import { LinearGradient } from 'expo-linear-gradient';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
  colors: string[];
  icon: string;
}

export const SquareGradientButton = (props: Props) => {
  return (
    <TouchableOpacity
      className="aspect-square flex-1"
      {...props}
      disabled={props.loading}
    >
      <LinearGradient
        className="relative w-full h-full rounded-md flex flex-col"
        colors={props.colors}
        start={{ x: 0, y: 0 }}
      >
        <Text className="text-white text-lg font-bold uppercase p-6">
          {props.label}
        </Text>
        <View className="absolute z-10 bottom-0 left-0 pb-4">
          <RemixIcon
            name={props.icon}
            color="rgba(255,255,255,0.30)"
            size={100}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
