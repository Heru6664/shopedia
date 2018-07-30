import axios from "axios";
import {
  EDIT_ADDRESS_START,
  EDIT_ADDRESS_FAILED,
  EDIT_ADDRESS_SUCCESS
} from "./constant/editAddress";

const editAddressStart = () => ({
  type: EDIT_ADDRESS_START
});

const editAddressFailed = error => ({
  type: EDIT_ADDRESS_FAILED,
  payload: error
});

const editAddressSuccess = address => ({
  type: EDIT_ADDRESS_SUCCESS,
  payload: address
});

export const editAddress = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(editAddressStart());

    return axios
      .put(
        "https://us-central1-shopedia-10ff0.cloudfunctions.net/updateProfile",
        data
      )
      .then(res => {
        dispatch(editAddressSuccess(res.data));
        return resolve(true);
      })
      .catch(e => {
        dispatch(editAddressFailed(e));
        reject(error.res.data.e.message);
      });
  });
};
