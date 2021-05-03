import axios from "axios";
import {
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  GET_SINGLE_IMAGE_FAIL,
  GET_SINGLE_IMAGE_REQUEST,
  GET_SINGLE_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/ImageConstants";

export const uploadImage = (image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE_REQUEST, payload: image });
  try {
    const res = await axios.post(
      "https://instagram-clone-backend-1.herokuapp.com/api/image/",
      image,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleImage = (filename) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_IMAGE_REQUEST, payload: filename });
  try {
    const res = await axios.get(
      `https://instagram-clone-backend-1.herokuapp.com/api/image/${filename}`
    );
    dispatch({ type: GET_SINGLE_IMAGE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteImage = (filename) => async (dispatch) => {
  dispatch({ type: DELETE_IMAGE_REQUEST, payload: filename });
  try {
    const res = await axios.delete(
      `https://instagram-clone-backend-1.herokuapp.com/api/image/${filename}`
    );
    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
