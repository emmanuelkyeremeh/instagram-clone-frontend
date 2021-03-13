import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
} from "../constants/CommentConstants";

export const createCommentReducer = (state = {}, action) => {
  if (action.type === CREATE_COMMENT_REQUEST) {
    return { loading: true };
  } else if (action.type === CREATE_COMMENT_SUCCESS) {
    return { loading: false, comments: action.payload };
  } else if (action.type === CREATE_COMMENT_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const getCommentReducer = (state = {}, action) => {
  if (action.type === GET_COMMENT_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_COMMENT_SUCCESS) {
    return { loading: false, commentList: action.payload };
  } else if (action.type === GET_COMMENT_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
