import { ListFetchTypes } from 'redux/constants.redux';

export const GET_POST_POST = 'GET_POST_POST';
export const SET_POST_POST = 'SET_POST_POST';
export const REMOVE_POST_POST = 'REMOVE_POST_POST';

export const UPDATE_POST_COMMENT_COUNT = 'UPDATE_POST_COMMENT_COUNT';
export const UPDATE_POST_REACTION_COUNT = 'UPDATE_POST_REACTION_COUNT';
export const UPDATE_POST_WISHLIST_STATE = 'UPDATE_POST_WISHLIST_STATE';
export const REPLACE_POST_WITH_UPDATED_LIST = 'REPLACE_POST_WITH_UPDATED_LIST';

export const GetMemoPostAction = (usertoken, memoId) => ({
  type: GET_POST_POST,
  usertoken,
  memoId,
});

export const SetMemoPostAction = ({ data, dataLoading, error }) => ({
  type: SET_POST_POST,
  data,
  dataLoading,
  error,
});

export const updateMemoCommentCount = ({ postIndex }) => ({
  type: UPDATE_POST_COMMENT_COUNT,
  postIndex,
});

export const removeMemoPost = ({ postIndex }) => ({
  type: REMOVE_POST_POST,
  postIndex,
});

export const updateMemoReactionCount = ({ postIndex, reaction }) => ({
  type: UPDATE_POST_REACTION_COUNT,
  postIndex,
  reaction,
});

export const updateMemoWishListState = ({ postIndex, isWishlist }) => ({
  type: UPDATE_POST_WISHLIST_STATE,
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
};

export const MemoPostReducer = (state = initialState, action) => {
  let { postIndex, reaction, fetchType, posts } = { ...action };
  let timelinePost = [...state.data];
  switch (action.type) {
    case SET_POST_POST:
      const { data, dataLoading, error } = action;
      return { ...state, data, dataLoading, error };
    case GET_POST_POST:
      return { ...state, dataLoading: true, error: false };

    case REMOVE_POST_POST:
      let timelinedata = [...state.data];
      timelinedata.splice(postIndex, 1);
      return { ...state, data: timelinedata };
    case UPDATE_POST_COMMENT_COUNT:
      timelinePost[postIndex].total_comments++;
      return { ...state, data: timelinePost };
    case UPDATE_POST_REACTION_COUNT:
      let timelinePostNew = [...state.data];
      if (reaction === 1) timelinePostNew[postIndex].total_reacts++;
      else timelinePostNew[postIndex].total_reacts--;
      timelinePostNew[postIndex].myRecation = reaction;
      return { ...state, data: timelinePostNew };
    case UPDATE_POST_WISHLIST_STATE:
      const { isWishlist } = action;

      timelinePost[postIndex].wish = !isWishlist;
      return { ...state, data: timelinePost };
    default:
      return state;
  }
};
