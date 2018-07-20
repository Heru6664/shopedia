import { GET_DETAIL_PRODUCT } from "../actions/constant/detail";

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
    default:
      return state;
  }
};
