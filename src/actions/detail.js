import { GET_DETAIL_PRODUCT, UPDATE_LIKE } from "./constant/detail";

export const getDetail = detail => ({
  type: GET_DETAIL_PRODUCT,
  payload: detail
});

export const updateLike = like => ({
  type: UPDATE_LIKE,
  payload: like
});
