import {
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
} from "../constants/ImageConstant";

export const ImageReducer = (state = {}, action) => {
  if (action.type === IMAGE_UPLOAD_REQUEST) {
    return { loading: true };
  } else if (action.type === IMAGE_UPLOAD_SUCCESS) {
    return { loading: false, image: action.payload };
  } else if (action.type === IMAGE_UPLOAD_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
