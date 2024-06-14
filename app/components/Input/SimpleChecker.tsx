import clsx from 'clsx';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface InputProps {
  label: string;
  checked?: boolean;
  onCheck?: (value: boolean) => void;
}

export const SimpleChecker = (props: InputProps) => {
  const [check, setCheck] = useState(props.checked);

  return (
    <View className="w-full p-4 border-b border-black/20 flex flex-row justify-between items-center">
      <Text className="font-semibold uppercase text-[16px]">{props.label}</Text>
      <TouchableOpacity
        onPress={() => {
          setCheck((prev) => !prev);
          props.onCheck?.(check!);
        }}
        className={clsx(
          'border-2 border-black/50 aspect-square h-5',
          check && 'bg-black'
        )}
      />
    </View>
  );
};
