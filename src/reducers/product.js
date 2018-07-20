import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_FAILED,
  UPDATE_PRODUCT_LIKE
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
        product: action.payload.products
      };
    case UPDATE_PRODUCT_LIKE:
      const modifiedProducts = state.product.map(p => {
        if (p.id == action.payload) return Object.assign({}, p, { like: true });
        return p;
      });
      return {
        product: modifiedProducts
      };
    default:
      return state;
  }
};
