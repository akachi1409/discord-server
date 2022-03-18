import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { login } from "../../redux/account/accountAction";
function AccountCheck(props) {
  const dispatch = useDispatch();
  
  const [firstLoad, setFirstLoad] = useState(true);
  if (firstLoad) {
    setFirstLoad(false);
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    
    // Add the parameters
    const params = new URLSearchParams();
    params.append("client_id", "951522291894870067");
    params.append("client_secret", "5BL8sAY8ZxXL9uAQjSFbxgnkdyQQrbA3");
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://discord-whitelist-test.herokuapp.com/account_check");
    dispatch(login(params, props));
    
  }
  
  return <div></div>;
}

export default AccountCheck;
