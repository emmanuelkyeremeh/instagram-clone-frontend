import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  signupReducer,
  loginReducer,
  updateUserReducer,
  getUsersReducer,
  getSingleUserReducer,
} from "../store/reducers/userReducer";
import {
  createPostReducer,
  deletePostReducer,
  findPostByUserReducer,
  getPostReducer,
  getSinglePostReducer,
  updatePostReducer,
} from "./reducers/PostReducer";
import {
  createCommentReducer,
  getAllCommentsReducer,
  getCommentReducer,
} from "./reducers/CommentReducers";
import {
  followDataReducer,
  followersReducer,
  followingReducer,
  followUserReducer,
} from "./reducers/FollowReducer";
import { getAllLikesReducer, likePostReducer } from "./reducers/LikeReducers";
import {
  deleteImageReducer,
  getSingleImageReducer,
  uploadImageReducer,
} from "./reducers/ImageReducer";

let userData = "";

const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
  userData = localStorage.getItem("userDataInsta")
    ? JSON.parse(localStorage.getItem("userDataInsta"))
    : null;
}

const initialState = {
  Login: {
    userDataInsta: userData,
  },
};

const reducer = combineReducers({
  Signup: signupReducer,
  Login: loginReducer,
  createPost: createPostReducer,
  getPosts: getPostReducer,
  getSinglePost: getSinglePostReducer,
  deletePost: deletePostReducer,
  updatePost: updatePostReducer,
  createComment: createCommentReducer,
  getUserComments: getCommentReducer,
  findPostByUser: findPostByUserReducer,
  updatedSingleUser: updateUserReducer,
  getAllUsers: getUsersReducer,
  getOneUser: getSingleUserReducer,
  FollowUser: followUserReducer,
  FollowData: followDataReducer,
  FollowersReducer: followersReducer,
  FollowingReducer: followingReducer,
  AllComments: getAllCommentsReducer,
  LikePost: likePostReducer,
  GetAllLikes: getAllLikesReducer,
  UploadImage: uploadImageReducer,
  GetSingleImage: getSingleImageReducer,
  DeleteImage: deleteImageReducer,
});

let store;

const isClient = typeof window !== "undefined";

if (isClient) {
  const persistConfig = {
    key: "root",
    storage,
  };
  store = createStore(
    persistReducer(persistConfig, reducer),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export default store;
