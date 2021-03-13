import axios from "axios";
import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
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
    const res = await axios.post("http://localhost:8080/api/comments/", {
      postid,
      username,
      comment,
      date,
    });
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
      `http://localhost:8080/api/comments/get/comment/${postid}`
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
