import clsx from 'clsx';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  checked?: boolean;
  label: string;
  onSelect: () => void;
}

export const SmallCheckButton = ({ checked, label, onSelect }: Props) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className={clsx(
        'p-2 rounded-md px-4',
        checked ? 'bg-black ' : 'bg-black/10'
      )}
    >
      <Text
        className={clsx(checked ? 'text-white font-semibold' : 'text-black')}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
