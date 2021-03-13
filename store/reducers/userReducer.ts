import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstant";

export const signupReducer = (state = {}, action) => {
  if (action.type === USER_SIGNUP_REQUEST) {
    return { loading: true };
  } else if (action.type === USER_SIGNUP_SUCCESS) {
    return { loading: false, userDataInsta: action.payload };
  } else if (action.type === USER_SIGNUP_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const loginReducer = (state = {}, action) => {
  if (action.type === USER_LOGIN_REQUEST) {
    return { loading: true };
  } else if (action.type === USER_LOGIN_SUCCESS) {
    return { loading: false, userDataInsta: action.payload };
  } else if (action.type === USER_LOGIN_FAIL) {
    return { loading: false, error: action.payload };
  } else if (action.type === USER_SIGNOUT) {
    return {};
  } else {
    return state;
  }
};
