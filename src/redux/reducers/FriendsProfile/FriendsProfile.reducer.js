import { ListFetchTypes } from 'redux/constants.redux';

export const GET_FRIEND_POST = 'GET_FRIEND_POST';
export const SET_FRIEND_POST = 'SET_FRIEND_POST';
export const REMOVE_FRIEND_POST = 'REMOVE_FRIEND_POST';

export const UPDATE_FRIEND_COMMENT_COUNT = 'UPDATE_FRIEND_COMMENT_COUNT';
export const UPDATE_FRIEND_REACTION_COUNT = 'UPDATE_FRIEND_REACTION_COUNT';
export const UPDATE_FRIEND_WISHLIST_STATE = 'UPDATE_FRIEND_WISHLIST_STATE';
export const REPLACE_FRIEND_WITH_UPDATED_LIST =
  'REPLACE_FRIEND_WITH_UPDATED_LIST';

export const GetFriendPostAction = (usertoken, userId) => ({
  type: GET_FRIEND_POST,
  usertoken,
  userId,
});

export const SetFriendPostAction = ({ data, dataLoading, error }) => ({
  type: SET_FRIEND_POST,
  data,
  dataLoading,
  error,
});

export const updateFriendCommentCount = ({ postIndex }) => ({
  type: UPDATE_FRIEND_COMMENT_COUNT,
  postIndex,
});

export const removeFriendPost = ({ postIndex }) => ({
  type: REMOVE_FRIEND_POST,
  postIndex,
});

export const updateFriendReactionCount = ({ postIndex, reaction }) => ({
  type: UPDATE_FRIEND_REACTION_COUNT,
  postIndex,
  reaction,
});

export const updateFriendWishListState = ({ postIndex, isWishlist }) => ({
  type: UPDATE_FRIEND_WISHLIST_STATE,
  postIndex,
  isWishlist,
});

const initialState = {
  data: {},
  dataLoading: true,
  error: false,
  fetchType: ListFetchTypes.FETCH,
  isListEnd: false,
  page: 0,
};

export const FriendPostReducer = (state = initialState, action) => {
  let { postIndex, reaction, fetchType, posts } = { ...action };
  let timelinePost = [...state.data];
  switch (action.type) {
    case SET_FRIEND_POST:
      const { data, dataLoading, error } = action;
      return { ...state, data, dataLoading, error };
    case GET_FRIEND_POST:
      console.log('GET_FRIEND_POST', action);
      return { ...state, dataLoading: true, error: false };

    case REMOVE_FRIEND_POST:
      let timelinedata = [...state.data];
      timelinedata.splice(postIndex, 1);
      return { ...state, data: timelinedata };
    case UPDATE_FRIEND_COMMENT_COUNT:
      timelinePost[postIndex].total_comments++;
      return { ...state, data: timelinePost };
    case UPDATE_FRIEND_REACTION_COUNT:
      let timelinePostNew = [...state.data];
      if (reaction === 1) timelinePostNew[postIndex].total_reacts++;
      else timelinePostNew[postIndex].total_reacts--;
      timelinePostNew[postIndex].myRecation = reaction;
      return { ...state, data: timelinePostNew };
    case UPDATE_FRIEND_WISHLIST_STATE:
      const { isWishlist } = action;

      timelinePost[postIndex].wish = !isWishlist;
      return { ...state, data: timelinePost };
    default:
      return state;
  }
};
