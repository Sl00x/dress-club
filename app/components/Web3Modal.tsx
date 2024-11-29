import { createWeb3Modal, Web3Modal } from '@web3modal/ethers-react-native';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
  },
};

// 3. Define your chains
const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
};

const chains = [sepolia];

// 4. Create modal
createWeb3Modal({
  projectId: '5abda7678f5be7e2fb4bea7360cee670',
  chains,
  config: { metadata },
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export const Web3ModalProvider = () => {
  return <Web3Modal />;
};
