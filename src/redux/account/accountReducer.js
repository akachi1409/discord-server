const initialState = {
  loading: false,
  account: "null",
  authorized: false,
  errorMsg: "",
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
        console.log("reducer", action)
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        authorized: true,
      };
    case "LOGIN_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default accountReducer;
