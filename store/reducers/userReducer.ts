import {
  GET_SINGLE_USER_FAIL,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
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
export const getUsersReducer = (state = {}, action) => {
  if (action.type === GET_USERS_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_USERS_SUCCESS) {
    return { loading: false, Users: action.payload };
  } else if (action.type === GET_USERS_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
export const getSingleUserReducer = (state = {}, action) => {
  if (action.type === GET_SINGLE_USER_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_SINGLE_USER_SUCCESS) {
    return { loading: false, SingleUser: action.payload };
  } else if (action.type === GET_SINGLE_USER_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
export const updateUserReducer = (state = {}, action) => {
  if (action.type === USER_UPDATE_REQUEST) {
    return { loading: true };
  } else if (action.type === USER_UPDATE_SUCCESS) {
    return { loading: false, updatedUserInfo: action.payload };
  } else if (action.type === USER_UPDATE_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
