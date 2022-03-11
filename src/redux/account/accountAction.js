import axios from "axios";

const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: payload,
  };
};

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

export const login = (data, props) => {
    console.log("data:", data);
  return async (dispatch) => {
    dispatch(loginRequest);
    try{
        axios
      .post("https://discordapp.com/api/oauth2/token", data , {  headers:{'content-type': 'application/x-www-form-urlencoded'}})
      .then((response) => {
        console.log("response", response);
        axios.get("https://discordapp.com/api/users/@me", { headers:{authorization: `${response.data.token_type} ${response.data.access_token}`}})
            .then(
                userResponse =>{
                    console.log("userResponse", userResponse);
                    let username = `${userResponse.data.username}#${userResponse.data.discriminator}`;
                    dispatch(
                        loginSuccess({
                            account: username
                        })
                    )
                    props.history.push("/account")
                }
            )
      });
    }catch (err) {
        dispatch(loginFailed("Error occured"));
    }
    
  };
};
