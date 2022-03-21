import React, { useState, useEffect } from "react";

import "./whitelist.css";
import Sidebar from "../../components/sidebar/sidebar";
import { useDispatch } from "react-redux";
import { addRole, addWhitelist } from "../../redux/account/accountAction";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Whitelist(props) {
  const account = useSelector((state) => state.account);
  // const blockchain = useSelector((state) => state.blockchain);
  const [firstLoad, setFirstLoad] = useState(true);
  const [role, setRole] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);

  const dispatch = useDispatch();

  const notify = (msg) => toast(msg);
  
  const setRoleState = (roles) => {
    var flag = false;
    var flagW = false;
    roles.forEach((role) => {
      if (role.startsWith("OG")) flag = true;
      if (role == "whitelisted") flagW = true;
    });
    if (flag) setRole(true);
    else setRole(false);
    if (flagW) setWhitelisted(true);
    else setWhitelisted(false);
  };
  const addwhitelistF = () => {
    var account = localStorage.getItem("account");
    var public_key = localStorage.getItem("public_key")
    console.log("account", account);
    if (!role){
      notify("You need to get the certain role to be get whitelisted!")
    }
    if (account == null || public_key == null) {
      notify("You should connect your wallet to get whitelisted!");
      return;
    } else {
      notify("You are submitting to whitelist with this account:" + account);
      dispatch(addWhitelist(props));
    }
  };
  const addRoleF = ()=>{
    console.log("---------")
    dispatch(addRole())
  }
  if (firstLoad) {
    setFirstLoad(false);
    const _role = localStorage.getItem("role");

    if (_role !== []) setRoleState(_role.split(","));
  }
  useEffect(() => {
    if (account.role !== []) {
      const _role = localStorage.getItem("role");
      setRoleState(_role.split(","));
    }
  }, [account.role]);

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <main className="sm:ml-64 md:ml-64 lg:ml-64">
        <main className="flex-1 font-mono">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="space-y-8 ">
                <div className="space-y-8 sm:space-y-5">
                  <div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium">
                        Undead Turtles on $NEAR - Whitelist Criteria
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Please take a look at the whitelist requirements below
                        and see if you are eligible to get whitelist.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between my-10 ">
                    <div className="flex-col">
                      <h3 className="text-lg leading-6 font-medium">
                        Obtain the OG. Discord role
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                        If you have this role in the discord server, you are
                        automatically eligible for whitelist.
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      {!role ? (
                        <button
                          type="button"
                          onClick={()=> addRoleF()}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Verify
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-default"
                        >
                          Verified
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between my-10 ">
                    <div className="flex-col">
                      <h3 className="text-lg leading-6 font-medium">
                        Add whitelist
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                        You are sending your wallet address to get whitelist.
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      {!whitelisted ? (
                        <button
                          type="button"
                          onClick={() => addwhitelistF()}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Verify
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-default"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  {/* <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Go Back
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </main>
      <ToastContainer />
    </div>
  );
}
export default Whitelist;
