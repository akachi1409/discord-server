import React, { useState } from "react";
import "./sidebar.css";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/account/accountAction";
import Logo from "../../assets/logo/black.png";

function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onDashboard = () => {
    history.push("/dashboard/mine");
  };

  const onAccount = () => {
    history.push("/account");
  };
  return (
    <div>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-black text-black dark:bg-gray-800 dark:text-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 flex flex-row">
              <img
                srcSet={Logo}
                src={Logo}
                decoding="async"
                data-nimg="fill"
                className="logo-img"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex-1 justify-center text-lg text-white">
                  ENIGMA v1.0
                </div>
                <div className="flex-1 justify-center text-xs text-white">
                  By NEARverse Labs
                </div>
              </div>
            </div>
            <nav className="mt-10 flex-1 px-2 space-y-1">
              {localStorage.getItem("sidebar") === "dashboard-mine" ||
              localStorage.getItem("sidebar") === "dashboard-other" ? (
                <div
                  onClick={() => onDashboard()}
                  className="bg-gray-900 text-white group flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  <a>Dashboard</a>
                </div>
              ) : (
                <div
                  onClick={() => onDashboard()}
                  className="text-gray-300 hover:bg-gray-700 mt-2 hover:text-white group flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  <a>Dashboard</a>
                </div>
              )}
              {localStorage.getItem("sidebar") === "account" ? (
                <div
                  onClick={() => onAccount()}
                  className="bg-gray-900 text-white group flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="text-gray-300 mr-3 flex-shrink-0 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <a>Account</a>
                </div>
              ) : (
                <div
                  onClick={() => onAccount()}
                  className="text-gray-300 hover:bg-gray-700 mt-2 hover:text-white group flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="text-gray-300 mr-3 flex-shrink-0 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <a>Account</a>
                </div>
              )}
            </nav>
          </div>
          <div className="flex ml-5 items-center text-white text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="p-3 order-2 md:order-3 flex flex-col"
            >
              Light Mode
            </button>
          </div>
          <div className="flex-shrink-0 flex bg-gray-800 dark:bg-gray-800 p-4">
            <a href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                {/* <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://cdn.discordapp.com/avatars/951451747220594768/null.png"
                    alt=""
                  />
                </div> */}
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">
                    {localStorage.getItem("authUser")}
                  </div>
                  {/* <p className="text-xs font-medium text-white">#4652</p> */}
                </div>
                <div
                  className="h-6 w-6 text-white inline ml-1 mt-1 cursor-pointer ml-10 logout-icon cursor-pointer"
                  onClick={dispatch(logout)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
