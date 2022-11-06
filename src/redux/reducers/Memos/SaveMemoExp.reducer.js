export const SET_SAVED_MEMO_LIST = 'SET_SAVED_MEMO_LIST';

export const SetMemoVisibility = (
  visible,
  memoData,
  persistType,
  actionInfo,
) => ({
  type: SET_VISIBILITY,
  visible,
  memoData,
  persistType,
  actionInfo,
});

export const setSelectedMemos = memoData => ({
  type: SET_SAVED_MEMO_LIST,
  memoData,
});

const initialState = {
  ratedMemosList: {},
};

export const SaveMemoExpReducer = (state = initialState, action) => {
  const { memoData = {} } = { ...action };
  const { ratedMemosList = {} } = { ...state };

  switch (action.type) {
    case SET_SAVED_MEMO_LIST:
      // console.log('reducer reached');
      let newRatedMemosList = { ...ratedMemosList };
      if (newRatedMemosList[memoData.id]) {
      } else newRatedMemosList[memoData.id] = true;

      // console.log('====================================');
      // console.log(ratedMemosList, newRatedMemosList, memoData);
      // console.log('====================================');
      return { ...state, ratedMemosList: newRatedMemosList };
    default:
      return state;
  }
};
