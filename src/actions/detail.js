import { GET_DETAIL_PRODUCT } from "./constant/detail";

export const getDetail = detail => ({
  type: GET_DETAIL_PRODUCT,
  payload: detail
});
