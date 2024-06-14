import clsx from 'clsx';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Spinner } from '../Loaders/Spinner';

interface Props extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
  variant?: 'danger' | 'success' | 'info' | 'warning' | 'light';
}

export const Button = (props: Props) => {
  const variantClass = () => {
    switch (props.variant) {
      case 'light':
        return {
          container: 'bg-black/0 border border-black',
          text: 'text-black',
        };
      case 'danger':
        return { container: 'bg-red-200', text: 'text-red-700' };
      case 'success':
        return { container: 'bg-green-200', text: 'text-green-700' };
      case 'warning':
        return { container: 'bg-orange-200', text: 'text-orange-700' };
      case 'info':
        return { container: 'bg-blue-200', text: 'text-blue-700' };
      default:
        return { container: 'bg-black', text: 'text-white' };
    }
  };
  return (
    <TouchableOpacity
      className={clsx([
        'w-full p-3 rounded-lg flex flex-row justify-center items-center',
        variantClass().container,
      ])}
      {...props}
      disabled={props.loading}
    >
      {props.loading ? (
        <Spinner size={18} />
      ) : (
        <Text
          className={clsx([
            'font-semibold text-center uppercase',
            ,
            variantClass().text,
          ])}
        >
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
