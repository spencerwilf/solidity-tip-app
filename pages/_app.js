import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";


const alchemyId = process.env.ALCHEMY_KEY
const walletConnectProjectId = process.env.WALLETCONNECT_KEY;

const chains = [sepolia];

const config = createConfig(
  getDefaultConfig({
    alchemyId,
    walletConnectProjectId: walletConnectProjectId || "default",
    chains,
    appName: "TipJar",
  }),
);

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}