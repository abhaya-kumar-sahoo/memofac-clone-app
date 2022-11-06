export const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const UPDATE_COMMENTS_LIST = 'UPDATE_COMMENTS_LIST';

export const setPostReactionsComments = ({ error, data }) => ({
  type: SET_POST_COMMENTS,
  error,
  data,
});

export const updateReactionComments = ({ comments }) => ({
  type: UPDATE_COMMENTS_LIST,
  comments,
});

export const getPostReactionsComments = ({ usertoken, post_id }) => ({
  type: GET_POST_COMMENTS,
  usertoken,
  post_id,
});

const initialState = {
  data: { post_com: [], post_react: [] },
  loading: true,
  error: false,
};

export const PostReactionCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return { ...state, loading: true, error: false, data: {} };
    case UPDATE_COMMENTS_LIST:
      let { comments } = action;
      return {
        ...state,
        data: { ...state.data, post_com: comments },
      };
    case SET_POST_COMMENTS:
      let { data, error } = action;
      return { ...state, loading: false, error, data };
    default:
      return state;
  }
};
