import {
  DELETE_ADDRESS_START,
  DELETE_ADDRESS_FAILED,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS
} from "./constant/delAddress";
import { store } from "../store";

const delAddressStart = item => ({
  type: DELETE_ADDRESS_START,
  payload: item
});

const delAddressFailed = err => ({
  type: DELETE_ADDRESS_FAILED,
  payload: err
});

const delAddressSuccess = index => ({
  type: DELETE_ADDRESS_SUCCESS,
  payload: index
});

export const delAddressUser = data => dispatch => {};

export const delAddress = data => {
  let address = store.getState().auth.user.address;
  delete address[data];
  return {
    type: DELETE_ADDRESS,
    payload: address
  };
};
