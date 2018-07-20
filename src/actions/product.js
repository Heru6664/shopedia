import axios from "axios";
import {
  FETCH_PRODUCT_FAILED,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS
} from "./constant/product";

const fetchStart = () => ({
  type: FETCH_PRODUCT_START
});
const fetchFailed = error => ({
  type: FETCH_PRODUCT_FAILED,
  payload: error
});
const fetchSuccess = data => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: data
});

export const fetchProduct = () => dispatch => {
  dispatch(fetchStart());
  return axios
    .get("https://us-central1-shopedia-10ff0.cloudfunctions.net/products")
    .then(data => {
      dispatch(fetchSuccess(data.data));
    })
    .catch(err => {
      dispatch(fetchFailed(err));
    });
};
