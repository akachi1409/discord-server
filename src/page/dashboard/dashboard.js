import React, { useState, useEffect } from "react";

import Sidebar from "../../components/sidebar/sidebar";
import { checkMember } from "../../redux/account/accountAction"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./dashboard.css";
function Dashboard() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [whitelisted, setWhitelisted] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const history = useHistory();

  const onWhitelist = () =>{
    history.push("/dashboard/whitelist")
  }

  const setRoleState = (roles) => {
    var flagW = false;
    roles.forEach((role) => {
      if (role == "whitelisted") flagW = true;
    });
    if (flagW) setWhitelisted(true);
    else setWhitelisted(false);
  };

  if (firstLoad) {
    setFirstLoad(false);
    const user = localStorage.getItem("authUser");
    dispatch(checkMember(user));
  }
  useEffect(() => {
    const _role = localStorage.getItem("role");
    const isConnected = localStorage.getItem("isMember");
    console.log(isConnected);
    if (isConnected == 'true')
      setIsMember(true);
    else
      setIsMember(false);
      if (_role !== undefined) setRoleState(_role.split(","));
  },[account])
  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <main className="sm:ml-64 md:ml-64 lg:ml-64">
        <div className="flex justify-end mx-10 my-5"></div>
        <main className="flex-1 font-mono">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div>
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:text-white dark:bg-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="My Projects">My Projects</option>
                    <option value="Other Projects">Other Projects</option>
                  </select>
                </div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <a
                        href="/dashboard/mine"
                        className="border-indigo-500 dark:text-indigo-300 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                        aria-current="page"
                      >
                        My Projects
                          <span className="bg-indigo-100 text-indigo-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                            {isMember ? 1:0}
                          </span>
                      </a>
                      <a
                        href="/dashboard/other"
                        className="border-transparent hover:text-gray-500 dark:hover:text-gray-100 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        Other Projects
                          <span className="bg-gray-100 text-indigo-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                            {isMember ? 0:1}
                          </span>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              {isMember ? (
                <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
              >
                <li className="col-span-1 flex flex-col text-center bg-white dark:border-transparent dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex-1 flex flex-col p-8">
                    <div></div>
                    <img
                      className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                      src="https://cdn.discordapp.com/icons/940349390038655048/4141966ffc0d0ecc4bdd42bd6fc6b730.png"
                      alt=""
                    />
                    <h3 className="mt-6 text-md font-medium">
                      Undead Turtles on $NEAR
                    </h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dd className="text-sm">
                        Undead Turtles on $NEARs creates tools for NFT
                        projects and DAOs. We're a team of 3 crypto engineers
                        with a proven track-record in the space. We are not
                        collecting wallets for Blocksmith Labs yet!
                      </dd>
                      <dd className="mt-3">
                        <span className="px-2 py-1 text-white text-md font-medium bg-green-500 rounded-full">
                          Whitelist Active
                        </span>
                      </dd>
                    </dl>
                    <dl className="mt-10">
                      <dd className="text-sm">Mint Price - TBD</dd>
                      <dd className="text-sm">Supply - 4000</dd>
                      <dd className="text-sm">Mint Date - TBD</dd>
                    </dl>
                  </div>
                  <div>
                    <div className="-mt-px flex">
                      <div className="w-0 flex-1 flex">
                        <a
                          href="#"
                          target="_blank"
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm hover:text-gray-100 border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <div className="h-6 w-6" aria-hidden="true">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                          </div>
                          <span className="ml-3">Twitter</span>
                        </a>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <a
                          href="https://discord.gg/WDgqrHHF"
                          target="_blank" rel="noreferrer noopener"
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm hover:text-gray-100 border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <div className="h-6 w-6" aria-hidden="true">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="bi bi-discord"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"></path>
                            </svg>
                          </div>
                          <span className="ml-3 ">Discord</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="-mt-px flex">
                      {!whitelisted ? (
                        <div
                        onClick={() => onWhitelist()} 
                        className="w-0 flex-1 flex flex-col relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 hover:text-gray-600 border border-transparent rounded-bl-lg hover:text-gray-500 cursor-pointer">
                          <a
                            className="w-46 mx-2  flex justify-center py-2 px-4 border-transparent rounded-md text-sm font-medium text-white bg-black"
                            
                          >
                            Obtain Whitelist
                          </a>
                        </div>
                      ) : (
                        <div className="w-0 flex-1 flex flex-col relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 hover:text-gray-600 border border-transparent rounded-bl-lg hover:text-gray-500">
                          <a
                            className="w-46 mx-2  flex justify-center py-2 px-4 border-transparent rounded-md text-sm font-medium text-white bg-black cursor-default"
                          >
                            Whitelisted
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
              ) : (
                <div className="flex justify-center text-xl mt-20">
                  You are not a part of any Discord server whitelisting with
                  Mercury now.{" "}
                </div>
                
              )}
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
export default Dashboard;
