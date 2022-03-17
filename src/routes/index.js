import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../page/login/login";
import Account from "../page/account/account";
import AccountCheck from "../page/account/accountCheck"
import Dashboard from "../page/dashboard/dashboard"
import Other from "../page/dashboard/other"
const authProtectedRoutes = [
    {
        path:'/account', component: Account
    },
    {
        path:'/dashboard/mine', component: Dashboard
    }, 
    {
        path:'/dashboard/other', component: Other
    }
];
const publicRoutes = [
    {
        path:'/login', component: Login
    },
    {
        path:'/account_check', component: AccountCheck
    },
    {
        path:"/", component: () => (<Redirect to="/login"/>)
    }
]

export { authProtectedRoutes, publicRoutes };