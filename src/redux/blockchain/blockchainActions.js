// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import SmartContract from "../../contracts/Doodlenauts.json";
import NftContract from "../../contracts/NftContract.json";
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
        const test = await web3.eth.getBalance(accounts[0]);
        const balance = test/1000000000000000000
        // balance = web3.toDecimal(balance)
        console.log("balance:", balance);
        // const NetworkData = await SmartContract.networks[networkId];
        if (networkId == 56) { // IMPORTANT. ONCE YOUR CONTRACT IS ON THE MAIN NET, SWITCH THIS NUMBER TO 1.
          const SmartContractObj = new Web3EthContract(
            SmartContract,
            "0xF86fe65531ba453457859F7227127e2Bc9efF3Bd" // **IMPORTANT** PASTE CONTRACT ADDRESS HERE
          );
          const NftContractObj = new Web3EthContract(
            NftContract,
            "0x8a0C542bA7bBBab7cF3551fFcc546CdC5362d2a1"
          )
          
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
              balance: balance,
              NftContract: NftContractObj
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Binance Smart Chain."));
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
