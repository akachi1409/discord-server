// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import * as nearAPI from "near-api-js";
import getConfig from "../../config";
// log
import { fetchData } from "../data/dataActions";

window.nearConfig = getConfig(process.env.NODE_ENV || "development");
const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const disconnectRequest = () => {
  return {
    type: "DISCONNECTION_REQUEST",
  };
};

const disconnectSuccess = (payload) => {
  return {
    type: "DISCONNECTION_SUCCESS",
    payload: payload,
  };
};

const disconnectFailed = (payload) => {
  return {
    type: "DISCONNECTION_FAILED",
    payload: payload,
  };
};
const connectNearRequest = () => {
  return {
    type: "CONNECTION_NEAR_REQUEST",
  };
};

const connectionNearSuccess = (payload) => {
  return {
    type: "CONNECTION_NEAR_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connectNear = () => {
  return async (dispatch) => {
    dispatch(connectNearRequest());

    const { connect, keyStores, WalletConnection } = nearAPI;

    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };

    // connect to NEAR
    const near = await connect(config);

    // create wallet connection
    const wallet = new WalletConnection(near);
    console.log("wallet", wallet)
    wallet.requestSignIn(
      "example-contract.testnet", // contract requesting access
      // "Example App", // optional
      // "http://YOUR-URL.com/success", // optional
      // "http://YOUR-URL.com/failure" // optional
    );
    console.log("wallet", wallet)
    // // Initializing connection to the NEAR node.
    // window.near = await nearAPI.connect(
    //   Object.assign(
    //     {
    //       deps: {
    //         keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    //       },
    //     },
    //     window.nearConfig
    //   )
    // );

    // // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
    // // is hosted at https://wallet.testnet.near.org
    // window.walletAccount = new nearAPI.WalletAccount(window.near);
    // console.log("wallet", window.walletAccount);
    // // Getting the Account ID. If unauthorized yet, it's just empty string.
    // window.accountId = window.walletAccount.getAccountId();

    // // Initializing our contract APIs by contract name and configuration.
    // window.contract = await window.near.loadContract(
    //   window.nearConfig.contractName,
    //   {
    //     // NOTE: This configuration only needed while NEAR is still in development
    //     // View methods are read only. They don't modify the state, but usually return some value.
    //     viewMethods: ["whoSaidHi"],
    //     // Change methods can modify the state. But you don't receive the returned value when called.
    //     changeMethods: ["sayHi"],
    //     // Sender is the account ID to initialize transactions.
    //     sender: window.accountId,
    //   }
    // );

    // window.walletAccount.requestSignIn(
    //   // The contract name that would be authorized to be called by the user's account.
    //   window.nearConfig.contractName,
    //   // This is the app name. It can be anything.
    //   'Who was the last person to say "Hi!"?'
    //   // We can also provide URLs to redirect on success and failure.
    //   // The current URL is used by default.
    // );
    // const config = {
    //   networkId: "testnet",
    //   keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    //   nodeUrl: "https://rpc.testnet.near.org",
    //   walletUrl: "https://wallet.testnet.near.org",
    //   helperUrl: "https://helper.testnet.near.org",
    //   explorerUrl: "https://explorer.testnet.near.org",
    // };
  };
};

export const disconnect = () => {
  return async (dispatch) => {
    dispatch(disconnectRequest());
    try {
      dispatch(
        disconnectSuccess({
          account: null,
          web3: null,
        })
      );
    } catch (e) {
      dispatch(disconnectFailed("Something went wrong."));
    }
  };
};
export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == 1) {
          // IMPORTANT. ONCE YOUR CONTRACT IS ON THE MAIN NET, SWITCH THIS NUMBER TO 1.
          console.log("-----------", accounts[0]);

          dispatch(
            connectSuccess({
              account: accounts[0],
              web3: web3,
            })
          );
          localStorage.setItem("account", accounts[0]);
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Mainnet."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Please install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
