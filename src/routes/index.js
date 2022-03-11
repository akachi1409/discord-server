import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../page/login/login";
import Account from "../page/account/account";
import AccountCheck from "../page/account/accountCheck"
const authProtectedRoutes = [
    {
        path:'/account', component: Account
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