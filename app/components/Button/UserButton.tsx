import { User } from '@/interfaces/user.interface';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  user?: User | null;
  onPress?: () => void;
}

export const UserButton = ({ user, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-300 rounded-full w-10 h-10 flex flex-row items-center justify-center"
    >
      <Text className="font-bold">
        {`${user?.firstname?.[0].toLocaleUpperCase()}${user?.lastname?.[0].toLocaleUpperCase()}`}
      </Text>
    </TouchableOpacity>
  );
};
