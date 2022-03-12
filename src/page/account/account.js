import React, { useState, useEffect } from "react";
import "./account.css";

import Sidebar from "../../components/sidebar/sidebar";

import { fetchData } from "../../redux/data/dataActions";
import { connect } from "../../redux/blockchain/blockchainActions"
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Account() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [firstLoad, setFirstLoad] = useState(true);
  if (firstLoad) {
    setFirstLoad(false);
  }
  const notify = () => toast(blockchain.account);
  const notifyErr = (err) => toast(err);
  const getData = () => {
    if (blockchain.account !== "" ) {
      dispatch(fetchData(blockchain.account));
      notify()
    }
    if (blockchain.errorMsg !== ""){
        notifyErr(blockchain.errorMsg);
    }
  };
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
    console.log(accessToken, tokenType);
  }, [firstLoad]);
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <main className="sm:ml-64 md:ml-64 lg:ml-64">
        <div className="flex-1 font-mono">
          <div className="flex flex-col py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">Account</div>
            <div>
              {blockchain.account == "null" ?(
                <button
                  className="wallet-adapter-button wallet-adapter-button-trigger"
                  tabIndex="0"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect())
                    getData()
                }}
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  class="wallet-adapter-button wallet-adapter-button-trigger"
                  tabindex="0"
                  type="button"
                >
                  {/* <i class="wallet-adapter-button-start-icon">
                    <img src="" alt="Sollet (Extension) icon" />
                  </i> */}
                  {blockchain.account}
                </button>
              )}
              <div>
                <div className="flex items-center p-5 justify-center">
                  <div className="w-1/2 ml-10 overflow-ellipsis"></div>
                </div>
                <div>
                  {/* <div className="flex justify-center items-center m-10 text-xl">
                    Linked Wallets
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Account;
