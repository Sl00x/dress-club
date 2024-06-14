import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/TextInput';
import { Logo } from '@/components/Logo/Logo';
import { ToastType, useToast } from '@/components/Toaster/Toaster';
import { useRegisterMutation } from '@/features/api/root-api';
import { useUserHook } from '@/features/hooks/user-hook';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginPage = () => {
  const { login, loginLoading } = useUserHook();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [register] = useRegisterMutation();
  const notify = useToast();

  const handleRegister = () => {
    register({
      email,
      password,
      firstname,
      lastname,
      phone,
    })
      .unwrap()
      .then((data) => {
        login({ email, password });
      })
      .catch((error) => {
        notify.toast(
          ToastType.ERROR,
          "Une erreur c'est produite lors de la création du compte."
        );
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ android: undefined, ios: 'padding' })}
      className="h-full w-full flex-1 flex flex-col justify-center items-center  space-y-6 px-4"
    >
      <Logo height={100} />
      <View className="w-full flex flex-col space-y-6 px-10">
        <View className="w-full flex flex-row space-x-2 items-center">
          <View className="flex-1">
            <Input
              label="Prénom"
              onChangeText={setFirstname}
              spellCheck={false}
              placeholder="John"
              keyboardType="default"
            />
          </View>
          <View className="flex-1">
            <Input
              label="Nom"
              onChangeText={setLastname}
              spellCheck={false}
              placeholder="Doe"
              keyboardType="default"
            />
          </View>
        </View>
        <View>
          <Input
            label="Adresse mail"
            icon="ri-at-line"
            value={email}
            onChangeText={setEmail}
            textContentType={'none'}
            spellCheck={false}
            keyboardType="email-address"
          />
        </View>
        <View>
          <Input
            label="Numéro de téléphone"
            onChangeText={setPhone}
            spellCheck={false}
            placeholder="0612345678"
            icon="ri-phone-line"
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <Input
            label="Mot de passe"
            icon="ri-lock-line"
            onChangeText={setPassword}
            secureTextEntry={true}
            spellCheck={false}
            placeholder=""
            keyboardType="visible-password"
          />
        </View>
        <View>
          <Button
            label="Valider"
            loading={loginLoading}
            onPress={() => {
              handleRegister();
            }}
          />
        </View>
        <View className="flex flex-col items-center space-x-2">
          <Text className="text-sm">Vous disposez déjà d'un compte ?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="font-semibold text-sm">
              Connectez-vous maintenant !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;
