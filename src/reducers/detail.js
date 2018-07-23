import { GET_DETAIL_PRODUCT, UPDATE_LIKE } from "../actions/constant/detail";

const initialState = {
  detailProduct: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        detailProduct: action.payload
      };
    case UPDATE_LIKE:
      return {
        ...state,
        detailProduct: {
          ...state.detailProduct,
          like: !state.detailProduct.like
        }
      };
    default:
      return state;
  }
};
