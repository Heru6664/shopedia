import axios from "axios";
import {
  CREATE_INVOICE_START,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED
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
  const externalId = faker.random.alphaNumeric(16);
  const descriptions = item.description.toString();

  console.log("item: ", item);
  console.log("desc: ", descriptions);

  dispatch(createInvoiceStart());
  console.log("item:", item);
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
    })
    .catch(error => {
      dispatch(createInvoiceFailed(error));
    });
};
