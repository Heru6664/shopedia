import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/constant/auth";
import {
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS
} from "../actions/constant/editProfile";

const initialState = {
  isLogin: false,
  isLoadingLogin: false,
  user: {},
  gender: "",
  success: false
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
        isLoadingLogin: false,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLogin: false
      };
    case UPDATE_PROFILE_START:
      return {
        ...state,
        isLoadingLogin: true,
        success: false
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        isLoadingLogin: false,
        success: false
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoadingLogin: false,
        success: true,
        user: action.payload
      };
    default:
      return state;
  }
};
