import { Routes } from '@/interfaces/navigation.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useLazyGetMeQuery, useLoginMutation } from '../api/root-api';
import { getUser, setToken, setUser } from '../reducers/user-reducer';
import { useAppDispatch, useAppSelector } from './root-hook';

export const useUserHook = () => {
  const [getMe, { isSuccess, isError, isLoading: loading }] =
    useLazyGetMeQuery();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getUserInfos = useCallback(async () => {
    return getMe()
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
        return user;
      })
      .catch(() => {
        dispatch(setUser(null));
        dispatch(setToken(undefined));
      });
  }, [dispatch, getMe]);

  const handleLogin = useCallback(
    (loginData: { email: string; password: string }) => {
      if (loginData.email === '' || loginData.password === '') {
        return;
      }
      login(loginData)
        .unwrap()
        .then(async ({ access_token }) => {
          dispatch(setToken(access_token));
          await AsyncStorage.setItem('@token', access_token);
          const user = await getUserInfos();
          if (user) {
            router.push(Routes.home);
          }
        })
        .catch((error) => {
          if (error.status === 400) {
            return;
          }
        });
    },
    [getUserInfos, login, dispatch]
  );

  const fetchUser = useCallback(async () => {
    if (user !== undefined) return;

    const token = await AsyncStorage.getItem('@token');
    if (!token) {
      dispatch(setUser(null));
      return;
    }
    dispatch(setToken(token));
    await getUserInfos();
  }, [user, dispatch, getUserInfos]);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('@token');
    dispatch(setUser(null));
    dispatch(setToken(undefined));
    router.push('/(auth)/login');
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loginLoading,
    isSuccess,
    isError,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
};
