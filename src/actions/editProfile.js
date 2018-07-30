import {
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS
} from "./constant/editProfile";
import axios from "axios";

const updateProfileStart = () => ({
  type: UPDATE_PROFILE_START
});

const updateProfileFailed = error => ({
  type: UPDATE_PROFILE_FAILED,
  payload: error
});

const updateProfileSuccess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data
});

export const updateProfile = data => dispatch => {
  const gender = data.isMale ? "male" : "female";
  const user = { ...data, gender };
  dispatch(updateProfileStart());
  return axios
    .put(
      "https://us-central1-shopedia-10ff0.cloudfunctions.net/updateProfile",
      user
    )
    .then(res => dispatch(updateProfileSuccess(res.data)))
    .catch(err => dispatch(updateProfileFailed(err)));
};
