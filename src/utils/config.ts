import {
    getDefaultConfig,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';
  import { WagmiProvider } from 'wagmi';
  import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  } from 'wagmi/chains';
  import { defineChain } from 'viem';

const crossfi = defineChain({
    id: 4157,
    name: 'CrossFi Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'XFI',
      symbol: 'XFI',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.testnet.ms'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://scan.testnet.ms' },
    },
  });
  
  
  export const config = getDefaultConfig({
    appName: 'Custom AMM',
    projectId: '5c34e7e8a0650558f2d3fc5cff924a20',
    chains: [mainnet, polygon, optimism, arbitrum, base, crossfi],
    ssr: true, 
  });