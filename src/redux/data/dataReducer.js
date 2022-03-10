const initialState = {
  loading: false,
  name: "",
  totalSupply: 0,
  tokenIds:[],
  error: false,
  errorMsg: "",
  tokenData:[],
  tokenUrls:[],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        totalSupply: action.payload.totalSupply,
        tokenIds: action.payload.tokenIds,
        tokenData: action.payload.tokenData,
        tokenUrls: action.payload.tokenUrls,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
