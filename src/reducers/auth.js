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
import {
  EDIT_ADDRESS_START,
  EDIT_ADDRESS_FAILED,
  EDIT_ADDRESS_SUCCESS
} from "../actions/constant/editAddress";

const initialState = {
  isLogin: false,
  isLoadingLogin: false,
  user: {},
  gender: ""
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
        isLoadingLogin: true
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        isLoadingLogin: false
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoadingLogin: false,
        user: action.payload
      };
    case EDIT_ADDRESS_START:
      return {
        ...state,
        isLoadingLogin: true
      };
    case EDIT_ADDRESS_FAILED:
      return {
        ...state,
        isLoadingLogin: false
      };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingLogin: false,
        user: action.payload
      };
    default:
      return state;
  }
};
