import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstant";

export const signup = (
  firstName,
  lastName,
  username,
  email,
  password
) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { firstName, lastName, username, email, password },
  });
  try {
    const res = await axios.post("http://localhost:8080/api/users/signup", {
      firstName,
      lastName,
      username,
      email,
      password,
    });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: res.data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("userDataInsta", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (username, email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
    payload: { username, email, password },
  });
  try {
    const res = await axios.post("http://localhost:8080/api/users/login", {
      username,
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const usersignout = () => (dispatch) => {
  localStorage.removeItem("userDataInsta");
  dispatch({ type: USER_SIGNOUT });
};
