// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import * as nearAPI from "near-api-js";
// log
import { fetchData } from "../data/dataActions";

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
    type:"DISCONNECTION_REQUEST"
  }
}

const disconnectSuccess = (payload) => {
  return{
    type:"DISCONNECTION_SUCCESS",
    payload: payload
  }
}

const disconnectFailed = (payload) => {
  return{
    type:"DISCONNECTION_FAILED",
    payload: payload
  }
}
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
    if(!wallet.isSingnedIn()) return wallet.requestSignIn()
    console.log("wallet", wallet);
  };
};

export const disconnect = () =>{
  return async (dispatch) => {
    dispatch(disconnectRequest());
    try{
      dispatch(
        disconnectSuccess({
          account:null,
          web3:null
        })
      )
    }catch(e){
      dispatch(
        disconnectFailed("Something went wrong.")
      )
    }
  }
}
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
