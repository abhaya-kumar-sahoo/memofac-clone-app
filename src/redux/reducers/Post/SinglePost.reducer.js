import { ListFetchTypes } from 'redux/constants.redux';

export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const SET_SINGLE_POST = 'SET_SINGLE_POST';
export const REMOVE_SINGLE_POST = 'REMOVE_SINGLE_POST';

export const UPDATE_SINGLE_POST_COMMENT_COUNT =
  'UPDATE_SINGLE_POST_COMMENT_COUNT';
export const UPDATE_SINGLE_POST_REACTION_COUNT =
  'UPDATE_SINGLE_POST_REACTION_COUNT';
export const UPDATE_SINGLE_POST_WISHLIST_STATE =
  'UPDATE_SINGLE_POST_WISHLIST_STATE';
export const REPLACE_SINGLE_POST_WITH_UPDATED_LIST =
  'REPLACE_SINGLE_POST_WITH_UPDATED_LIST';

export const GetSinglePostAction = (usertoken, memoId) => ({
  type: GET_SINGLE_POST,
  usertoken,
  memoId,
});

export const SetSinglePostAction = ({ data, dataLoading, error }) => ({
  type: SET_SINGLE_POST,
  data,
  dataLoading,
  error,
});

export const updateSingleCommentCount = () => ({
  type: UPDATE_SINGLE_POST_COMMENT_COUNT,
});

export const removeSinglePost = () => ({
  type: REMOVE_SINGLE_POST,
});

export const updateSinglePostReactionCount = ({ reaction }) => ({
  type: UPDATE_SINGLE_POST_REACTION_COUNT,
  reaction,
});

export const updateSinglePostWishListState = ({ isWishlist }) => ({
  type: UPDATE_SINGLE_POST_WISHLIST_STATE,
  isWishlist,
});

const initialState = {
  data: {},
  dataLoading: true,
  error: false,
  fetchType: ListFetchTypes.FETCH,
  isListEnd: false,
  page: 0,
  deleted: false,
};

export const SinglePostReducer = (state = initialState, action) => {
  let { postIndex, reaction, fetchType, posts } = { ...action };
  let timelinePost = { ...state.data };
  switch (action.type) {
    case SET_SINGLE_POST:
      const { data, dataLoading, error } = action;
      return { ...state, data, dataLoading, error, deleted: false };
    case GET_SINGLE_POST:
      return {
        ...state,
        data: {},
        dataLoading: true,
        error: false,
        deleted: false,
      };

    case REMOVE_SINGLE_POST:
      let timelinedata = { ...state.data };

      return { ...state, data: {}, deleted: true, dataLoading: false };
    case UPDATE_SINGLE_POST_COMMENT_COUNT:
      timelinePost.total_comments++;
      return { ...state, data: timelinePost, deleted: false };
    case UPDATE_SINGLE_POST_REACTION_COUNT:
      let timelinePostNew = { ...state.data };
      if (reaction === 1) timelinePostNew.total_reacts++;
      else timelinePostNew.total_reacts--;
      timelinePostNew.myRecation = reaction;
      return { ...state, data: timelinePostNew, deleted: false };
    case UPDATE_SINGLE_POST_WISHLIST_STATE:
      const { isWishlist } = action;

      timelinePost.wish = !isWishlist;
      return { ...state, data: timelinePost, deleted: false };
    default:
      return state;
  }
};
