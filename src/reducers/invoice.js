import {
  CREATE_INVOICE_START,
  CREATE_INVOICE_FAILED,
  CREATE_INVOICE_SUCCESS
} from "../actions/constant/invoice";

const initialState = {
  loading: false,
  invoice: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INVOICE_START:
      return {
        ...state,
        loading: true
      };
    case CREATE_INVOICE_FAILED:
      return {
        ...state,
        loading: false,
        invoice: action.payload
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload
      };
    default:
      return state;
  }
};
