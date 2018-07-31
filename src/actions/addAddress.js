import {
  ADD_USER_ADDRESS_START,
  ADD_USER_ADDRESS_FAILED,
  ADD_USER_ADDRESS_SUCCESS
} from "./constant/addAddress";
import axios from "axios";

const addAddrStart = () => ({
  type: ADD_USER_ADDRESS_START
});

const addAddrFailed = err => ({
  type: ADD_USER_ADDRESS_FAILED,
  payload: err
});

const addAddrSuccess = addr => ({
  type: ADD_USER_ADDRESS_SUCCESS,
  payload: addr
});

export const addAddress = address => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(addAddrStart());

    return axios
      .post(
        "https://us-central1-shopedia-10ff0.cloudfunctions.net/addAddress",
        address
      )
      .then(res => {
        dispatch(addAddrSuccess(res.data));
        return resolve(true);
      })
      .catch(e => {
        dispatch(addAddrFailed(e));
        reject(console.log(e));
      });
  });
};
