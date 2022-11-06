import { ListFetchTypes } from 'redux/constants.redux';

export const GET_USER_POST = 'GET_USER_POST';
export const SET_USER_POST = 'SET_USER_POST';
export const REMOVE_USER_POST = 'REMOVE_USER_POST';

export const UPDATE_USER_COMMENT_COUNT = 'UPDATE_USER_COMMENT_COUNT';
export const UPDATE_USER_REACTION_COUNT = 'UPDATE_USER_REACTION_COUNT';
export const UPDATE_USER_WISHLIST_STATE = 'UPDATE_USER_WISHLIST_STATE';
export const REPLACE_USER_WITH_UPDATED_LIST = 'REPLACE_USER_WITH_UPDATED_LIST';

export const GetUserPostAction = (usertoken, page) => ({
  type: GET_USER_POST,
  usertoken,
  page,
});

export const SetUserPostAction = ({
  data,
  dataLoading,
  current_page,
  error,
  isListEnd,
}) => ({
  type: SET_USER_POST,
  data,
  dataLoading,
  current_page,
  error,
  isListEnd,
});

export const updateUserCommentCount = ({ postIndex }) => ({
  type: UPDATE_USER_COMMENT_COUNT,
  postIndex,
});

export const removeUserPost = ({ postIndex }) => ({
  type: REMOVE_USER_POST,
  postIndex,
});

export const updateUserReactionCount = ({ postIndex, reaction }) => ({
  type: UPDATE_USER_REACTION_COUNT,
  postIndex,
  reaction,
});

export const updateUserWishListState = ({ postIndex, isWishlist }) => ({
  type: UPDATE_USER_WISHLIST_STATE,
  postIndex,
  isWishlist,
});

const initialState = {
  data: [],
  dataLoading: true,
  error: false,
  fetchType: ListFetchTypes.FETCH,
  isListEnd: false,
  page: 0,
  current_page: 1,
};

export const UserPostReducer = (state = initialState, action) => {
  let { postIndex, reaction, fetchType, posts } = { ...action };
  let timelinePost = [...state.data];
  switch (action.type) {
    case SET_USER_POST:
      const { data, dataLoading, current_page, error, isListEnd } = action;
      return { ...state, data, current_page, dataLoading, error, isListEnd };
    case GET_USER_POST:
      return { ...state, dataLoading: true, error: false };

    case REMOVE_USER_POST:
      let timelinedata = [...state.data];
      timelinedata.splice(postIndex, 1);
      return { ...state, data: timelinedata };
    case UPDATE_USER_COMMENT_COUNT:
      timelinePost[postIndex].total_comments++;
      return { ...state, data: timelinePost };
    case UPDATE_USER_REACTION_COUNT:
      let timelinePostNew = [...state.data];
      if (reaction === 1) timelinePostNew[postIndex].total_reacts++;
      else timelinePostNew[postIndex].total_reacts--;
      timelinePostNew[postIndex].myRecation = reaction;
      return { ...state, data: timelinePostNew };
    case UPDATE_USER_WISHLIST_STATE:
      const { isWishlist } = action;
      timelinePost[postIndex].wish = !isWishlist;
      return { ...state, data: timelinePost };
    default:
      return state;
  }
};
