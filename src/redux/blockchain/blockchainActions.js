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

const disconnectNearRequest = (payload)=> {
  return { 
    type: "DISCONNECTION_NEAR_REQUEST"
  }
}

const disconnectNearSuccess = (payload)=> {
  return{
    type: "DISCONNECTION_NEAR_SUCCESS",
    payload: payload
  }
}

const disconnectNearFailure = (payload)=> {
  return {
    type: "DISCONNECTION_NEAR_FAILURE",
    payload: payload
  }
}
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

const connectNearSuccess = (payload) => {
  return {
    type: "CONNECTION_NEAR_SUCCESS",
    payload: payload,
  };
};
const connectNearFailed = (payload) => {
  return {
    type: "CONNECTION_NEAR_FAILED",
    payload: payload,
  }
}
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
    );
    console.log("wallet", wallet)
    
  };
};

export const connectNearSuccessF = (public_key) =>{
  return async(dispatch) =>{
    try{
      console.log("public_key", public_key)
      dispatch(connectNearSuccess({
        public_key: public_key
      }))
      localStorage.setItem("public_key", public_key);
    }catch (e) {
      dispatch(connectNearFailed("Something went wrong"));
    }
  }
}

export const disconnectNear = (props) =>{
  return async(dispatch) =>{
    dispatch(disconnectNearRequest());
    try {
      dispatch(
        disconnectNearSuccess({
          public_key:null
        }))
      localStorage.removeItem("public_key")
      props.history.push("/account")
    }catch (e) {
      dispatch(disconnectNearFailure("Something went wrong"));
    }
  }
}
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
      localStorage.removeItem("account");
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
