import React from "react";
import "./account.css";

import Sidebar from "../../components/sidebar/sidebar";
function Account() {
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
              <button
                className="wallet-adapter-button wallet-adapter-button-trigger"
                tabIndex="0"
                type="button"
              >
                Select Wallet
              </button>
              <div>
                <div className="flex items-center p-5 justify-center">
                  <div className="w-1/2 ml-10 overflow-ellipsis"></div>
                </div>
                <div>
                  <div className="flex justify-center items-center m-10 text-xl">
                    Linked Wallets
                  </div>
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
