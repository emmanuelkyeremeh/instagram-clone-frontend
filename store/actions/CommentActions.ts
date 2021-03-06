import axios from "axios";
import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  GET_ALL_COMMENTS_FAIL,
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
} from "../constants/CommentConstants";

export const createComment = (postid, username, comment, date) => async (
  dispatch
) => {
  dispatch({
    type: CREATE_COMMENT_REQUEST,
    payload: postid,
    username,
    comment,
    date,
  });
  try {
    const res = await axios.post(
      "https://instagram-clone-backend-1.herokuapp.com/api/comments/",
      {
        postid,
        username,
        comment,
        date,
      }
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getComments = (postid) => async (dispatch) => {
  dispatch({ type: GET_COMMENT_REQUEST, payload: postid });
  try {
    const res = await axios.get(
      `https://instagram-clone-backend-1.herokuapp.com/api/comments/get/comment/${postid}`
    );
    dispatch({ type: GET_COMMENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllComments = () => async (dispatch) => {
  dispatch({ type: GET_ALL_COMMENTS_REQUEST });
  try {
    const res = await axios.get(
      "https://instagram-clone-backend-1.herokuapp.com/api/comments/get/comments"
    );
    dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
