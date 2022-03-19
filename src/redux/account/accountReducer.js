const initialState = {
  loading: false,
  account: "null",
  authorized: false,
  isMember:false,
  role:"",
  errorMsg: "",
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGOUT_REQUEST":
      return{
        ...initialState,
        loading: true,
      }
    case "CHECK_MEMBER_REQUEST":
      return{
        ...initialState,
        loading: true,
      }
    case "CHECK_MEMBER_SUCCESS":
      return{
        ...initialState,
        loading: false,
        isMember:action.payload.isMember,
        role: action.payload.role,
      }
    case "ADD_ROLE_REQUEST":
      return{
        ...initialState,
        loading: true,
      }
    case "ADD_ROLE_SUCCESS":
      return{
        ...initialState,
        loading: false,
        role:action.payload.role
      }
    case "ADD_WHITELIST_REQUEST":
      return{
        ...initialState,
        loading: true,
      }
    case "ADD_WHITELIST_SUCCESS":
      return{
        ...initialState,
        role:action.payload.role,
        loading: false,
      }
    
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        isMember:action.payload.isMember,
        role: action.payload.role,
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
