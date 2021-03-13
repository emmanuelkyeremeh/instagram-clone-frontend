import axios from "axios";
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_SUCCESS,
} from "../constants/ImageConstant";

export const postImage = (img, file) => async (dispatch) => {
  dispatch({ type: IMAGE_UPLOAD_REQUEST, payload: { img, file } });
  try {
    const res = await axios.post("http://localhost:8080/uploads", {
      img,
      file,
    });
    dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
