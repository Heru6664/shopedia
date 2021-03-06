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
  EDIT_ADDRESS_SUCCESS,
  GET_ADDRESS
} from "../actions/constant/editAddress";
import {
  ADD_USER_ADDRESS_START,
  ADD_USER_ADDRESS_FAILED,
  ADD_USER_ADDRESS_SUCCESS
} from "../actions/constant/addAddress";
import { DELETE_ADDRESS } from "../actions/constant/delAddress";

const initialState = {
  isLogin: false,
  isLoadingLogin: false,
  user: {},
  addr: {},
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
    case GET_ADDRESS:
      return {
        ...state,
        addr: action.payload
      };
    case ADD_USER_ADDRESS_START:
      return {
        ...state,
        isLoadingLogin: true
      };
    case ADD_USER_ADDRESS_FAILED:
      return {
        ...state,
        isLoadingLogin: false
      };
    case ADD_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingLogin: false,
        user: {
          ...state.user,
          address: { ...state.user.address, ...action.payload }
        }
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
    case DELETE_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload
        }
      };
    default:
      return state;
  }
};
