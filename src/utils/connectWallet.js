import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import store from '../store'
var Web3 = require("web3");
export const getConnect = () => {
  if (window.ethereum) {
    return new Web3(
      Web3.givenProvider || "ws://some.local-or-remote.node:8546")
  }
}




export const webConnect = getConnect()

export const walletConnect = async (name) => {
  const bridge = "https://bridge.walletconnect.org";
  const connector = new WalletConnect({
    bridge,
    qrcodeModal: QRCodeModal
  });
  if (!connector.connected) {
    await connector.createSession();
  }
  await subscribeToEvents(connector, name);
};

const subscribeToEvents = (connector, name) => {
  if (!connector) {
    return;
  }
  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }
    onConnect(payload, name);
  });
  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
    store.dispatch("Logout");
  });
  if (connector.connected) {
    const {
      chainId,
      accounts
    } = connector;
    const address = accounts[0];
    var name = ''
    store.dispatch("connectWallet", { address, name });
  }
};
// 连接上赋值
const onConnect = async (payload, name) => {
  const {
    accounts
  } = payload.params[0];
  const address = accounts[0];
  store.dispatch("connectWallet", { address, name });
};
