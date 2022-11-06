import { ListFetchTypes } from 'redux/constants.redux';

export const GET_RECOMM = 'GET_RECOMM';
export const SET_RECOMM = 'SET_RECOMM';
export const UPDATE_EXP_RECOMM = 'UPDATE_EXP_RECOMM';
export const UPDATE_WISH_RECOMM = 'UPDATE_WISH_RECOMM';
export const REFRESH_RECOMM = 'REFRESH_RECOMM';
export const UPDATE_RECOMM = 'UPDATE_RECOMM';

export const GetRecomMemosAction = (
  usertoken,
  page = 1,
  fetchType,
  offset,
) => ({
  type: GET_RECOMM,
  usertoken,
  page,
  fetchType,
  offset,
});
export const RefreshRecomMemosAction = (usertoken, page = 1, fetchType) => ({
  type: REFRESH_RECOMM,
  usertoken,
  page,
  fetchType,
  offset: 0,
});

export const UpdateRecomMemosAction = (rate, memoIndex) => ({
  type: UPDATE_RECOMM,
  rate,
  memoIndex,
});

export const SetRecomMemosAction = data => ({
  type: SET_RECOMM,
  rmemos: data.rmemos,
  dataLoading: data.dataLoading,
  error: data.error,
  fetchType: data.fetchType,
});

export const updateExperience = ({ memo, memoIndex, myRatingGiven }) => ({
  type: UPDATE_EXP_RECOMM,
  memo,
  memoIndex,
  myRatingGiven,
});

export const updateWish = data => ({
  type: UPDATE_WISH_RECOMM,
  memo: data.memo,
});

const initialState = {
  rmemos: [],
  dataLoading: true,
  error: false,
};

export const RecomMemosReducer = (state = initialState, action) => {
  const { memo, memoIndex, page, fetchType, myRatingGiven, rate } = {
    ...action,
  };
  let allRMemos = [...state.rmemos];
  switch (action.type) {
    case GET_RECOMM:
      return { ...state, dataLoading: fetchType === ListFetchTypes.FETCH };
    case REFRESH_RECOMM:
      return { ...state, dataLoading: true, rmemos: [] };
    case UPDATE_RECOMM:
      const UpdatedRateMemo = [...state.rmemos];
      UpdatedRateMemo[memoIndex].me = rate;
      return { ...state, rmemos: UpdatedRateMemo };
    case SET_RECOMM:
      const { rmemos, dataLoading, error, fetchType } = action;
      // let newRecmmndedMemos = [];
      // if (fetchType === ListFetchTypes.FETCH) {
      //   return { ...state, rmemos, dataLoading, error };
      // } else {
      //   newRecmmndedMemos = [...state.rmemos, ...rmemos];
      //   return { ...state, rmemos: newRecmmndedMemos, dataLoading, error };
      // }
      return { ...state, rmemos, dataLoading, error };
    case UPDATE_EXP_RECOMM:
      // const positionIndex = allRMemos.findIndex(rmemo => rmemo.id == memo.id);

      const UpdatedMemo = {
        ...allRMemos[memoIndex],
        exp: true,
        wish: false,
        me: myRatingGiven,
      };
      allRMemos[memoIndex] = UpdatedMemo;
      return { ...state, rmemos: allRMemos };
    case UPDATE_WISH_RECOMM:
      const position = allRMemos.findIndex(rmemo => rmemo.id == memo.id);
      allRMemos[position].wish = !allRMemos[position].wish;
      return { ...state, rmemos: allRMemos };
    default:
      return state;
  }
};
