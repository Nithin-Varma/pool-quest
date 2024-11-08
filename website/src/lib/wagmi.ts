import { createConfig, http } from 'wagmi';
import {
 unichainSepolia 
} from 'wagmi/chains';

export const config = createConfig({
 
  transports:{
    [unichainSepolia.id]:http()
  },
  chains: [
    unichainSepolia
  ],
  ssr: true,
});
