import clsx from 'clsx';
import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props extends TextInputProps {
  label: string;
  rightLabel?: string;
  icon?: string;
}

export const Input = (props: Props) => {
  return (
    <KeyboardAvoidingView className="flex flex-col space-y-2">
      <Text className="font-medium">{props.label}</Text>
      <View
        className={clsx(
          'border border-black/10 p-3 rounded-md flex flex-row space-x-2 items-center',
          !props.icon && 'py-4'
        )}
      >
        <TextInput
          placeholder="johndoad@mail.com"
          placeholderTextColor={'rgba(0,0,0,0.5)'}
          style={{
            flex: 1,
            fontSize: 16,
          }}
          {...props}
        />
        {props.icon && <RemixIcon name={props.icon} color="rgba(0,0,0,0.5)" />}
        {props.rightLabel && (
          <Text className="font-bold text-black/50 uppercase">
            {props.rightLabel}
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
