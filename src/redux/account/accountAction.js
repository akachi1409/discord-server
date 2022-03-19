import axios from "axios";

const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const logoutRequest = () => {
  return {
    type: "LOGOUT_REQUEST",
  };
};

const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: payload,
  };
};

const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
const addRoleRequest =()=>{
  return{
    type: "ADD_ROLE_REQUEST",
  }
}
const addRoleSuccess = (payload) => {
  return{
    type: "ADD_ROLE_SUCCESS",
    payload: payload
  }
}

const addWhiteListRequest =()=>{
  return{
    type: "ADD_WHITELIST_REQUEST",
  }
}

const addWhiteListSuccess = (payload) => {
  return{
    type: "ADD_WHITELIST_SUCCESS",
    payload: payload,
  }
}
const loginFailed = (payload) => {
  return {
    type: "LOGIN_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const addWhitelist = (props) =>{
  return async (dispatch) => {
    dispatch(addWhiteListRequest);
    var username = localStorage.getItem("authUser")
    var account = localStorage.getItem("account")
    try{
      axios.post("http://34.205.146.173:3000//member/addwhitelist", {
        user:username, account:account
      }).then((res)=>{
        if (res.data.result){
          var state_role = res.data.role;
          localStorage.setItem("role", state_role)
          dispatch(addWhiteListSuccess({
            role:state_role
          }))
          props.history.push("/dashboard/mine");
        }else{
          var state_role = res.data.role;
          localStorage.setItem("role", state_role)
          props.history.push("/dashboard/other");
        }

      })
    }catch (err) {
      dispatch(loginFailed("Error occured"));
    }
  }
}
export const addRole = () =>{
  return async(dispatch) =>{
    dispatch(addRoleRequest);
    var username = localStorage.getItem("authUser")
    console.log(username)
    try{
      axios.post("http://34.205.146.173:3000//member/add_role",{
        user: username
      })
      .then((res)=>{
        console.log(res)
        if (res.data.result){
          localStorage.setItem('role','OG')
          dispatch(addRoleSuccess({
            role:'OG'
          }))
        }
        
      })
    }catch (err) {
      dispatch(loginFailed("Error occured"));
    }
  }
}
export const logout = (props) => {
  return async (dispatch) => {
    dispatch(logoutRequest);
    try {
      localStorage.removeItem("authUser");
      localStorage.removeItem('isMember');
      localStorage.removeItem('role')
      props.history.push("/");
      dispatch(logoutSuccess)
    } catch (err) {
      dispatch(loginFailed("Error occured"));
    }
  };
};
export const login = (data, props) => {
  return async (dispatch) => {
    dispatch(loginRequest);
    var isMember = false;
    try {
      axios
        .post("https://discordapp.com/api/oauth2/token", data, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          axios
            .get("https://discordapp.com/api/users/@me", {
              headers: {
                authorization: `${response.data.token_type} ${response.data.access_token}`,
              },
            })
            .then((userResponse) => {
              console.log("userResponse", userResponse);
              let username = `${userResponse.data.username}#${userResponse.data.discriminator}`;
              axios
                .post("http://34.205.146.173:3000//member/find_member", {
                  user: username,
                })
                .then((res) => {
                  console.log("res", res);
                  if (res.data.isConnected) isMember = true;
                  else isMember = false;
                  console.log("isMember", isMember);
                  var state_role = res.data.role;
                  dispatch(
                    loginSuccess({
                      account: username,
                      isMember: isMember,
                      role: state_role
                    })
                  );
                  localStorage.setItem("authUser", username);
                  localStorage.setItem("isMember", isMember);
                  localStorage.setItem("role", state_role)
                  props.history.push("/account");
                });
            });
        });
    } catch (err) {
      dispatch(loginFailed("Error occured"));
    }
  };
};
