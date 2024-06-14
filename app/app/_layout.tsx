// @ts-ignore
import '@walletconnect/react-native-compat';

// @ts-ignore
import { WagmiConfig } from 'wagmi';

import { ToastProvider } from '@/components/Toaster/Toaster';
import { store } from '@/features/store/root-store';

import { chains, projectId, wagmiConfig } from '@/constants/web3.constant';
import { createWeb3Modal, Web3Modal } from '@web3modal/wagmi-react-native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-compat';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return <RootLayoutNav />;
}

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function RootLayoutNav() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <ToastProvider>
            <StatusBar style="light" />
            <Slot />
          </ToastProvider>
        </Provider>
        <Web3Modal />
      </WagmiConfig>
    </>
  );
}
