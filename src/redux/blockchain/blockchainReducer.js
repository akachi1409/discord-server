const initialState = {
  loading: false,
  account: null,
  web3: null,
  public_key: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        web3: action.payload.web3,
      };
    case "CONNECTION_NEAR_REQUEST":
      return{
        ...initialState,
        loading: true,
      }
    case "CONNECTION_NEAR_SUCCESS":
      return{
        ...state,
        loading: false,
        public_key: action.payload.public_key
      }
    case "CONNECTION_NEAR_FAILED":
      return{
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      }
    case "DISCONNECTION_NEAR_REQUEST":
      return{
        ...initialState,
        loading: true
      }
    case "DISCONNECTION_NEAR_SUCCESS":
      return{
        ...state,
        public_key: action.payload.public_key
      }
    case "CONNECTION_NEAR_FAILED":
      return{
        ...initialState,
        loading: false,
        errorMsg: action.payload
      }
    case "DISCONNECTION_REQUEST":
      return{
        ...initialState,
        loading: true,
      }
    case "DISCONNECTION_SUCCESS":
      return{
        ...state,
        loading: false,
        account: action.payload.account,
        web3: action.payload.web3,
      }
    case "DISCONNECTION_FAILED":
      return{
        ...initialState,
        loading:false,
        errorMsg: action.payload
      }
    case "DISCONNECTION_NEAR_REQUEST":
      return{
        ...initialState,
        loading:true,
      }
    case "DISCONNECTION_NEAR_SUCCESS":
      return{
        ...state,
        loading:false,
        public_key:action.payload.public_key
      }
    case "DISCONNECTION_NEAR_FAILIURE":
      return{
        ...initialState,
        loading:false,
        errorMsg: action.payload
      }
    case "CONNECTION_FAILED":
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

export default blockchainReducer;
