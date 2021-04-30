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

export const uploadImageReducer = (state = {}, action) => {
  if (action.type === UPLOAD_IMAGE_REQUEST) {
    return { loading: true };
  } else if (action.type === UPLOAD_IMAGE_SUCCESS) {
    return { loading: false, ImageUpload: action.payload };
  } else if (action.type === UPLOAD_IMAGE_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const getSingleImageReducer = (state = {}, action) => {
  if (action.type === GET_SINGLE_IMAGE_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_SINGLE_IMAGE_SUCCESS) {
    return { loading: false, SingleImage: action.payload };
  } else if (action.type === GET_SINGLE_IMAGE_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const deleteImageReducer = (state = {}, action) => {
  if (action.type === DELETE_IMAGE_REQUEST) {
    return { loading: true };
  } else if (action.type === DELETE_IMAGE_SUCCESS) {
    return { loading: false, deletedImage: action.payload };
  } else if (action.type === DELETE_IMAGE_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
