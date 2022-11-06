import { ListFetchTypes } from 'redux/constants.redux';

export const GET_TIMELINE_POSTS = 'GET_TIMELINE_POSTS';
export const GET_MORE_TIMELINE_POST = 'GET_MORE_TIMELINE_POST';
export const REFRESH_TIMELINE_POSTS = 'REFRESH_TIMELINE_POSTS';

export const ADD_NEW_POST = 'ADD_NEW_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SET_TIMELINE = 'SET_TIMELINE';
export const UPDATE_COMMENT_COUNT = 'UPDATE_COMMENT_COUNT';
export const UPDATE_REACTION_COUNT = 'UPDATE_REACTION_COUNT';
export const UPDATE_WISHLIST_STATE = 'UPDATE_WISHLIST_STATE';
export const REPLACE_WITH_UPDATED_LIST = 'REPLACE_WITH_UPDATED_LIST';

export const getTimelinePosts = ({
  usertoken,
  fetchType = ListFetchTypes.FETCH,
  page,
}) => ({
  type: GET_TIMELINE_POSTS,
  usertoken,
  fetchType,
  page,
});
export const refreshTimelinePosts = ({
  usertoken,
  fetchType = ListFetchTypes.FETCH,
}) => ({
  type: REFRESH_TIMELINE_POSTS,
  usertoken,
  fetchType,
  page: 1,
});

export const setTimelinePosts = ({ data, error, isListEnd, page }) => ({
  type: SET_TIMELINE,
  data,
  error,
  isListEnd,
  page,
});

export const updateCommentCount = ({ postIndex }) => ({
  type: UPDATE_COMMENT_COUNT,
  postIndex,
});

export const removePost = ({ postIndex }) => ({
  type: REMOVE_POST,
  postIndex,
});

export const updateReactionCount = ({ postIndex, reaction }) => ({
  type: UPDATE_REACTION_COUNT,
  postIndex,
  reaction,
});

export const UpdateTimelineList = ({ posts }) => ({
  type: REPLACE_WITH_UPDATED_LIST,
  posts,
});
export const addPostTimeline = ({ postData }) => ({
  type: ADD_NEW_POST,
  postData,
});

export const updateWishListState = ({ postIndex, isWishlist }) => ({
  type: UPDATE_WISHLIST_STATE,
  postIndex,
  isWishlist,
});

const initialState = {
  post: [],
  page: 1,
  dataLoading: false,
  error: false,
  fetchType: ListFetchTypes.FETCH,
  isListEnd: false,
};

export const TimelinePostsReducer = (state = initialState, action) => {
  let { postIndex, reaction, fetchType, posts } = { ...action };
  let timelinePost = [...state.post];
  switch (action.type) {
    case SET_TIMELINE:
      const { data, error, isListEnd, page } = action;

      return {
        ...state,
        post: data,
        dataLoading: false,
        error,
        isListEnd,
        page,
      };
    case REPLACE_WITH_UPDATED_LIST:
      return { ...state, post: posts };
    case REFRESH_TIMELINE_POSTS:
      return { ...state, dataLoading: true, post: [] };

    case GET_TIMELINE_POSTS:
      // console.log('===============GET_TIMELINE_POSTS=====================');
      // console.log(action);
      // console.log('====================================');
      return {
        ...state,
        dataLoading: true,
        error: false,
        // post: fetchType == ListFetchTypes.FETCH ? [] : state.post,
        // post: state.post,

        page: fetchType == ListFetchTypes.FETCH ? 1 : state.page + 1,
      };
    case ADD_NEW_POST:
      const { postData } = action;
      return { ...state, post: [postData, ...state.post] };
    case REMOVE_POST:
      let timelinedata = [...state.post];
      timelinedata.splice(postIndex, 1);
      return { ...state, post: timelinedata };
    case UPDATE_COMMENT_COUNT:
      timelinePost[action.postIndex].total_comments++;
      return { ...state, post: timelinePost };
    case UPDATE_REACTION_COUNT:
      let timelinePostNew = [...state.post];

      if (reaction === 1) timelinePostNew[action.postIndex].total_reacts++;
      else timelinePostNew[action.postIndex].total_reacts--;
      timelinePostNew[action.postIndex].myRecation = reaction;
      return { ...state, post: timelinePostNew };
    case UPDATE_WISHLIST_STATE:
      const { isWishlist, postIndex } = action;

      timelinePost[postIndex].wish = !isWishlist;
      return { ...state, post: timelinePost };
    default:
      return state;
  }
};
