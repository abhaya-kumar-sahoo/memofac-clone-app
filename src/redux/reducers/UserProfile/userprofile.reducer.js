/* eslint-disable eqeqeq */
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const UPDATE_USER_MEMOS = 'UPDATE_USER_MEMOS';

export const GetUserDetailsAction = usertoken => ({
  type: GET_USER_DETAILS,
  usertoken,
});
export const UpdateUserDetailsAction = memo => ({
  type: UPDATE_USER_MEMOS,
  memo,
});

export const SetUserDetailsAction = ({
  userProfileData,
  categoryMemoList,
  dataLoading,
  error,
}) => ({
  type: SET_USER_DETAILS,
  userProfileData,
  categoryMemoList,
  dataLoading,
  error,
});

const initialState = {
  userProfileData: {},
  categoryMemoList: [],
  dataLoading: true,
  error: false,
};

export const UserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      const { userProfileData, categoryMemoList, dataLoading, error } = action;
      return {
        ...state,
        userProfileData,
        categoryMemoList,
        dataLoading,
        error,
      };
    case UPDATE_USER_MEMOS:
      const UserDetails = { ...state.userProfileData };
      const UserCategory = [...state.categoryMemoList];
      const foundCat = UserCategory.filter(
        e => e.category_id == action.memo.category[0].id,
      );
      const found = UserDetails.content.rated_memo.filter(
        e => e.id == action.memo.id,
      );
      if (found.length === 0) {
        UserDetails.content.rated_memo.push(action.memo);
      } else {
        const index = UserDetails.content.rated_memo.findIndex(
          i => i.id == found[0].id,
        );

        UserDetails.content.rated_memo.splice(index, 1);

        UserDetails.content.rated_memo.push(action.memo);
      }

      if (foundCat.length === 0) {
        const catData = {
          category_id: action.memo.category[0].id.toString(),
          category_name: action.memo.category[0].category_name,
        };
        UserCategory.push(catData);
      }
      return {
        ...state,
        userProfileData: UserDetails,
        categoryMemoList: UserCategory,
      };

    case GET_USER_DETAILS:
      return { ...state, dataLoading: true, error: false };
    default:
      return state;
  }
};
