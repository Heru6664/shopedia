import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from "./constant/auth";

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: error
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
});
