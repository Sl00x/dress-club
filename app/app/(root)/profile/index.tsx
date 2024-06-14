import { Avatar } from '@/components/Button/UserButton';
import ModalScreen from '@/components/Modal/Modal';
import { OfferCard } from '@/components/Profile/OfferCard';
import { TitleCard } from '@/components/Profile/TitleCard';
import { ValueCard } from '@/components/Profile/ValueCard';
import { WalletCard } from '@/components/Profile/WalletCard';
import { useUserHook } from '@/features/hooks/user-hook';
import { formatPriceToEuro } from '@/utils/formater.utils';
import { useWeb3Modal, W3mAccountButton } from '@web3modal/wagmi-react-native';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccount } from 'wagmi';

export enum Currency {
  EURO,
  ETH,
}

const MainProfilePage = () => {
  const { top } = useSafeAreaInsets();
  const { user, logout } = useUserHook();
  const router = useRouter();
  const [walletOpen, setWalletOpen] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [currency, setCurrency] = useState(Currency.EURO);

  return (
    <View className="h-full flex-1 flex flex-col">
      <ModalScreen
        full
        title={'Mon portefeuille'}
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
      >
        <View className="w-full flex flex-col justify-between items-center bg-black/5">
          <View className="w-full flex flex-row justify-end items-center p-4 space-x-4">
            <TouchableOpacity onPress={() => setCurrency(Currency.EURO)}>
              <Text
                className={clsx(
                  'uppercase',
                  currency === Currency.EURO && 'font-bold'
                )}
              >
                Euro
              </Text>
            </TouchableOpacity>
            {isConnected && (
              <TouchableOpacity onPress={() => setCurrency(Currency.ETH)}>
                <Text
                  className={clsx(
                    'uppercase',
                    currency === Currency.ETH && 'font-bold'
                  )}
                >
                  ETH
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {currency === Currency.EURO && (
            <Text className="text-5xl text-black/50 font-semibold pb-10">
              {formatPriceToEuro(0)}
            </Text>
          )}
          {currency === Currency.ETH && (
            <View className="flex flex-col text-black/50 font-semibold pb-10">
              <W3mAccountButton balance="show" />
            </View>
          )}
        </View>
        {!isConnected ? (
          <View className="w-full flex flex-row">
            <TouchableOpacity
              onPress={() => open()}
              className="flex-1 border-l  p-4 border-b border-black/10"
            >
              <Text className="uppercase text-black/50 font-medium text-xl text-center">
                {'Connecter mon wallet'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <View className="p-10 flex flex-col justify-center items-center space-y-4">
          <Text className="text-2xl font-semibold text-black/70"></Text>
          <Text className="text-center text-lg  text-black/40">
            Ici sera afficher la totalité de vos transactions en Euro ou en
            Cryptomonnaie.
          </Text>
        </View>
      </ModalScreen>
      <View style={{ paddingTop: top }} className="flex-1 ">
        <View className="flex flex-col space-y-4 border-b border-black/20 py-2 pb-4">
          <View className="flex flex-row w-full justify-arround space-x-2 items-center px-4">
            <TouchableOpacity className="p-2" onPress={() => router.back()}>
              <RemixIcon name="ri-arrow-left-line" />
            </TouchableOpacity>
            <Text className="flex-1 text-xl font-semibold">
              {user?.firstname} {user?.lastname}
            </Text>

            <Avatar user={user} />
          </View>
        </View>
        <ScrollView className="flex-1 space-y-2">
          <View className="p-4 space-y-2">
            <WalletCard onSwitch={() => setWalletOpen(true)} />
            <View className="flex flex-row space-x-2">
              <View className="flex-1 h-full">
                <OfferCard color={'rgba(0,0,0,0.10)'} />
              </View>
              <View className="flex-1 flex flex-col space-y-2">
                <View>
                  <ValueCard
                    icon="ri-shopping-bag-2-line"
                    title="Ventes"
                    color={'rgba(0,0,0,0.10)'}
                    value={'0'}
                  />
                </View>
                <View>
                  <ValueCard
                    icon="ri-award-line"
                    title="Badges"
                    color={'rgba(0,0,0,0.10)'}
                    value={'0'}
                  />
                </View>
                <View>
                  <ValueCard
                    icon="ri-shopping-basket-line"
                    title="Panier"
                    color={'rgba(0,0,0,0.10)'}
                    value={'0'}
                  />
                </View>
              </View>
            </View>
            <View>
              <TitleCard
                title={'Mon profile'}
                icon={'ri-profile-line'}
                color={'rgba(0,0,0,0.10)'}
              />
            </View>
            <View>
              <TitleCard
                title={'Moyen de paiements'}
                icon={'ri-money-euro-circle-line'}
                color={'rgba(0,0,0,0.10)'}
              />
            </View>
            <View>
              <TitleCard
                title={'Adresses de livraison'}
                icon={'ri-pin-distance-line'}
                color={'rgba(0,0,0,0.10)'}
              />
            </View>
            <View>
              <TitleCard
                title={'Paramètres'}
                icon={'ri-settings-5-fill'}
                color={'rgba(0,0,0,0.10)'}
              />
            </View>
            <View>
              <TitleCard
                title={'Se déconnecter'}
                icon={'ri-logout-circle-line'}
                color={'rgba(255,0,0,0.10)'}
                onPress={() => logout()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainProfilePage;
