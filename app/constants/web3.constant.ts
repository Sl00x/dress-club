import { defaultWagmiConfig } from '@web3modal/wagmi-react-native';
import { mainnet, sepolia } from 'viem/chains';
export const projectId = '5abda7678f5be7e2fb4bea7360cee670';

export const metadata = {
  name: 'Dressclub',
  description: 'Dressclub',
  url: 'dress.club',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'exp://192.168.1.57:8081',
  },
};

export const chains = [mainnet, sepolia];

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
