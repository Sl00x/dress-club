import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

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
        className="relative w-full h-full rounded-md flex flex-col justify-center items-center"
        colors={props.colors}
        start={{ x: 0, y: 0 }}
      >
        <Text className="text-white text-lg font-bold uppercase p-6">
          {props.label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
