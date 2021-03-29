import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  FIND_POST_BY_USER_FAIL,
  FIND_POST_BY_USER_REQUEST,
  FIND_POST_BY_USER_SUCCESS,
  FIND_SINGLE_POST_FAIL,
  FIND_SINGLE_POST_REQUEST,
  FIND_SINGLE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
} from "../constants/PostConstant";
import axios from "axios";

export const createPost = (formData) => async (dispatch) => {
  dispatch({
    type: CREATE_POST_REQUEST,
    payload: formData,
  });
  try {
    const res = await axios.post("http://localhost:8080/api/posts/", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    dispatch({ type: CREATE_POST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getposts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  try {
    const res = await axios.get("http://localhost:8080/api/posts/get/posts");
    dispatch({ type: GET_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findSinglePost = (postid) => async (dispatch) => {
  dispatch({ type: FIND_SINGLE_POST_REQUEST, payload: postid });
  try {
    const res = await axios.get(`http://localhost:8080/api/posts/${postid}`);
    dispatch({ type: FIND_SINGLE_POST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: FIND_SINGLE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findPostByUser = (userid) => async (dispatch) => {
  dispatch({ type: FIND_POST_BY_USER_REQUEST, payload: userid });
  try {
    const res = await axios.get(
      `http://localhost:8080/api/posts/user/${userid}`
    );
    dispatch({ type: FIND_POST_BY_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: FIND_POST_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (postid) => async (dispatch) => {
  dispatch({ type: POST_DELETE_REQUEST, payload: postid });
  try {
    const res = await axios.delete(`http://localhost:8080/api/posts/${postid}`);
    dispatch({ type: POST_DELETE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (postid, image, caption) => async (dispatch) => {
  dispatch({ type: POST_UPDATE_REQUEST, payload: postid, image, caption });
  try {
    const res = await axios.put(`http://localhost:8080/api/posts/${postid}`, {
      postid,
      image,
      caption,
    });
    dispatch({ type: POST_UPDATE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
