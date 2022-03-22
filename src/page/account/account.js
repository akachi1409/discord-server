import React, { useState, useEffect } from "react";
import "./account.css";

import Sidebar from "../../components/sidebar/sidebar";

import {
  connect,
  connectNear,
  disconnect,
  connectNearSuccessF,
  disconnectNear,
} from "../../redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Account(props) {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [ account, setAccount] = useState("");
  const [ publicKey, setPublicKey] = useState("");
  // const data = useSelector((state) => state.data);
  const [firstLoad, setFirstLoad] = useState(true);
  if (firstLoad) {
    setFirstLoad(false);
    const queryParams = new URLSearchParams(window.location.search);
    // const accout_id = queryParams.get("account_id");
    const public_key = queryParams.get("public_key");
    if (public_key != null) {
      dispatch(connectNearSuccessF(public_key));
    } else {
      var accountL = localStorage.getItem("account");
      var public_keyL = localStorage.getItem("public_key");
      console.log("Account, " , accountL , "public: ", public_keyL)
      setAccount(accountL);
      setPublicKey(public_keyL);
    }
  }
  const disconnectF = () => {
    dispatch(disconnectNear(props));
  };
  const notify = () => toast(blockchain.account);
  const notifyErr = (err) => toast(err);
  const getData = () => {
    if (blockchain.account !== "") {
      notify();
    }
    if (blockchain.errorMsg !== "") {
      notifyErr(blockchain.errorMsg);
    }
  };
  useEffect(() => {
    setAccount(blockchain.account);
    console.log("account",blockchain.account, account)
    // setPublicKey(blockchain.public_key);
    // getData();
  }, [blockchain.account]);
  useEffect(() => {
    setPublicKey(blockchain.public_key);
    console.log("public key", publicKey)
  }, [blockchain.public_key])
  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <main className="sm:ml-64 md:ml-64 lg:ml-64">
        <div className="flex-1 font-mono">
          <div className="flex flex-col py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">Account</div>
            <div>
              {account == null ? (
                <button
                  className="wallet-adapter-button wallet-adapter-button-trigger"
                  tabIndex="0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                >
                  Connect Metamask Wallet
                </button>
              ) : (
                <button
                  className="wallet-adapter-button wallet-adapter-button-trigger"
                  tabIndex="0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(disconnect());
                    getData();
                  }}
                >
                  Disconnect Metamask Wallet
                </button>
              )}
              {publicKey == null ? (
                <button
                  className="wallet-adapter-button wallet-adapter-button-trigger"
                  tabIndex="0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connectNear());
                    // getData();
                  }}
                >
                  Connect Near Wallet
                </button>
              ) : (
                <button
                  className="wallet-adapter-button wallet-adapter-button-trigger"
                  tabIndex="0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    disconnectF();
                    // getData();
                  }}
                >
                  DisConnect Near Wallet
                </button>
              )}

              <div>
                <div className="flex items-center p-5 justify-center">
                  <div className="w-1/2 ml-10 overflow-ellipsis"></div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
export default Account;
