import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Spinner } from '../Loaders/Spinner';

interface Props extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
}

export const Button = (props: Props) => {
  return (
    <TouchableOpacity
      className="w-full bg-black p-4 rounded-lg flex flex-row justify-center items-center"
      {...props}
      disabled={props.loading}
    >
      {props.loading ? (
        <Spinner size={18} />
      ) : (
        <Text className="text-white font-semibold text-center uppercase">
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
