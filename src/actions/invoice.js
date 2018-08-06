import axios from "axios";
import {
  CREATE_INVOICE_START,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED,
  GET_INVOICE_START,
  GET_INVOICE_FAILED,
  GET_INVOICE_SUCCESS,
  ADD_INVOICES_LIST
} from "./constant/invoice";
import faker from "faker";

const createInvoiceStart = () => ({
  type: CREATE_INVOICE_START
});
const createInvoiceFailed = err => ({
  type: CREATE_INVOICE_FAILED,
  payload: err
});
const createInvoiceSuccess = data => ({
  type: CREATE_INVOICE_SUCCESS,
  payload: data
});

export const createInvoice = item => dispatch => {
  return new Promise((resolve, reject) => {
    const externalId = faker.random.alphaNumeric(16);
    const descriptions = item.description.toString();

    dispatch(createInvoiceStart());
    return axios
      .post(
        "https://api.xendit.co/v2/invoices",
        {
          external_id: externalId,
          amount: item.item.amount,
          payer_email: item.email,
          description: descriptions
        },
        {
          auth: {
            username:
              "xnd_development_Po6AfL4i1LP+nZNtfuBPHj6TM9GkqIMowia0+Rxg/mTW+bykDQB0gA==",
            password: ""
          }
        }
      )
      .then(response => {
        dispatch(createInvoiceSuccess(response.data));
        dispatch(addInvoicesList(response.data));
        return resolve(true);
      })
      .catch(error => {
        dispatch(createInvoiceFailed(error));
        console.log("invoices err: ", error);
        return reject(true);
      });
  });
};

const getInvoiceStart = () => ({
  type: GET_INVOICE_START
});
const getInvoiceFailed = error => ({
  type: GET_INVOICE_FAILED,
  payload: error
});
const getInvoiceSuccess = data => ({
  type: GET_INVOICE_SUCCESS,
  payload: data
});
export const getInvoice = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(getInvoiceStart());
    return axios
      .get(`https://api.xendit.co/v2/invoices/${data}`, {
        auth: {
          username:
            "xnd_development_Po6AfL4i1LP+nZNtfuBPHj6TM9GkqIMowia0+Rxg/mTW+bykDQB0gA==",
          password: ""
        }
      })
      .then(res => {
        dispatch(getInvoiceSuccess(res.data));
        return resolve(true);
      })
      .catch(e => {
        dispatch(getInvoiceFailed(e.data));
        return reject(true);
      });
  });
};

export const addInvoicesList = list => ({
  type: ADD_INVOICES_LIST,
  payload: list
});
