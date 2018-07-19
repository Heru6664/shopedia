import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from "../actions/constant/auth";

const initialState = {
  isLogin: false,
  isLoadingLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLogin: false,
        isLoadingLogin: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLogin: false,
        isLoadingLogin: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        isLoadingLogin: false
      };
    default:
      return state;
  }
};
