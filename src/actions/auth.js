import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT
} from "./constant/auth";
import axios from "axios";

const loginStart = () => ({
  type: LOGIN_START
});

const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: error
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginAuth = ({ email, password }) => dispatch => {
  dispatch(loginStart());
  return axios
    .post("https://us-central1-shopedia-10ff0.cloudfunctions.net/loginAuth", {
      email: email,
      password: password
    })
    .then(res => {
      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
      }
      return res.data;
    })
    .catch(e => {
      dispatch(loginFailed(e));
      console.log("e: ", e);
    });
};

export const logout = () => ({
  type: LOGOUT
});
