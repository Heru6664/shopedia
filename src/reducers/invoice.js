import {
  CREATE_INVOICE_START,
  CREATE_INVOICE_FAILED,
  CREATE_INVOICE_SUCCESS,
  GET_INVOICE_START,
  GET_INVOICE_FAILED,
  GET_INVOICE_SUCCESS,
  ADD_INVOICES_LIST
} from "../actions/constant/invoice";

const initialState = {
  loading: false,
  invoice: {},
  invoicesList: []
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
        loading: false
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload
      };
    case GET_INVOICE_START:
      return {
        ...state,
        loading: true
      };
    case GET_INVOICE_FAILED:
      return {
        ...state,
        loading: false
      };
    case GET_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload
      };
    case ADD_INVOICES_LIST:
      return {
        ...state,
        invoicesList: [...state.invoicesList, action.payload]
      };
    default:
      return state;
  }
};
