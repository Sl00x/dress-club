import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/TextInput';
import { Logo } from '@/components/Logo/Logo';
import { useUserHook } from '@/features/hooks/user-hook';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginPage = () => {
  const { login, loginLoading } = useUserHook();
  const [email, setEmail] = useState('johndoe@dressclub.fr');
  const [password, setPassword] = useState('Password123!');

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ android: undefined, ios: 'padding' })}
      className="h-full w-full flex-1 flex flex-col justify-center items-center  space-y-6 px-4"
    >
      <Logo height={100} />
      <View className="w-full flex flex-col space-y-6 px-10">
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
            label="Mot de passe"
            icon="ri-lock-line"
            onChangeText={setPassword}
            secureTextEntry={true}
            spellCheck={false}
            keyboardType="visible-password"
          />
        </View>
        <View>
          <Button
            label="Connexion"
            loading={loginLoading}
            onPress={() => {
              login({
                email,
                password,
              });
            }}
          />
        </View>
        <View className="flex flex-col items-center space-x-2">
          <Text className="text-sm">
            Vous ne disposez pas encore de compte ?
          </Text>
          <TouchableOpacity>
            <Text className="font-semibold text-sm">
              Créez un compte maintenant !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;
