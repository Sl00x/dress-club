import { Slot } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

const LoginLayout = () => {
  return (
    <KeyboardAvoidingView className="w-full h-full">
      <Slot />
    </KeyboardAvoidingView>
  );
};

export default LoginLayout;
