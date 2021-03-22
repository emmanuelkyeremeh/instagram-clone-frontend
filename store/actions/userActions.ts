import axios from "axios";
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

export const signup = (formdata) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: formdata,
  });
  try {
    const res = await axios.post(
      "http://localhost:8080/api/users/signup",
      formdata
    );
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

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const res = await axios.get("http://localhost:8080/api/users/");
    dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getSingleUser = (userId) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_USER_REQUEST, payload: userId });
  try {
    const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
    dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateUser = (userid, formdata) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: formdata });
  try {
    const res = await axios.put(
      `http://localhost:8080/api/users/update/user/${userid}`,
      formdata,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
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
