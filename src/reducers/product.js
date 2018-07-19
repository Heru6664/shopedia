import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_FAILED
} from "../actions/constant/product";

const initialState = {
  product: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCT_FAILED:
      return {
        ...state,
        loading: false
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      };

    default:
      return state;
  }
};
