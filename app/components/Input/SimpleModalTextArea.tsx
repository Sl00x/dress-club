import clsx from 'clsx';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ModalScreen from '../Modal/Modal';

interface InputPickerProps {
  label: string;
  value?: string;
  placeholder: string;
  onCloseWhenItemPressed?: boolean;
}

export const SimplePicker = (props: InputPickerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalScreen
        title={props.label}
        open={open}
        onClose={() => setOpen(false)}
      ></ModalScreen>
      <View className="w-full p-4 flex flex-row justify-between items-center border-b border-black/20">
        <Text className="font-semibold uppercase text-[16px] flex-1">
          {props.label}
        </Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            className={clsx(
              'text-[16px]',
              props.value?.length! > 0 ? 'text-black' : 'text-black/50'
            )}
          >
            {props.value?.length! > 0 ? props.value : props.placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
