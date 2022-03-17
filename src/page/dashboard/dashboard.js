import React from "react";

import Sidebar from "../../components/sidebar/sidebar";
import "./dashboard.css";
function Dashboard() {
  return (
    <div>
      <div>
        <Sidebar />
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
                        className="border-indigo-500 text-indigo-600 dark:text-indigo-300 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                        aria-current="page"
                      >
                        My Projects
                        <span className="bg-indigo-100 text-indigo-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                          0
                        </span>
                      </a>
                      <a
                        href="/dashboard/other"
                        className="border-transparent hover:text-gray-500 dark:hover:text-gray-100 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        Other Projects
                        <span className="bg-gray-100 text-indigo-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                          12
                        </span>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="flex justify-center text-xl mt-20">
                You are not a part of any Discord server whitelisting with
                Mercury now.{" "}
              </div>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
export default Dashboard;
