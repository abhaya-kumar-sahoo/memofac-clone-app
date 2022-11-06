export const GET_MEMO_DETAILS = 'GET_MEMO_DETAILS';
export const REFETCH_MEMO_DETAILS = 'REFETCH_MEMO_DETAILS';
export const SET_MEMO_DETAILS = 'SET_MEMO_DETAILS';
export const RESET_MEMO_DETAILS_LOADER = 'RESET_MEMO_DETAILS_LOADER';

const memoDataProps = {
  id: '1',
  category_id: '1',
  title: '',
  image: null,
  description: null,
  created_at: null,
  updated_at: null,
  category_name: null,
  icon: null,
  rating: '7.40000',
  known: 0,
  close: 0,
  me: 0,
  totalExp: 0,
  exp: false,
  wish: false,
};
export const GetMemoDetailsAction = (usertoken, memo_id) => ({
  type: GET_MEMO_DETAILS,
  usertoken: usertoken,
  memo_id,
});

export const ResetMemoDetailsLoader = () => ({
  type: RESET_MEMO_DETAILS_LOADER,
});
export const RefetchMemoDetailsAction = (usertoken, memo_id) => ({
  type: REFETCH_MEMO_DETAILS,
  usertoken: usertoken,
  memo_id,
});

export const SetMemoDetailsAction = ({ memoDetails, dataLoading, error }) => ({
  type: SET_MEMO_DETAILS,
  memoDetails,
  dataLoading,
  error,
});

const initialState = {
  memoDetails: { ...memoDataProps },
  dataLoading: true,
  error: false,
};

export const MemoDetailsReducer = (state = initialState, action) => {
  const { memoDetails, dataLoading, error } = { ...action };

  switch (action.type) {
    case RESET_MEMO_DETAILS_LOADER:
      return { ...state, dataLoading: true };
    case GET_MEMO_DETAILS:
      return { ...state, dataLoading: true, error: false, memoDetails: {} };
    case SET_MEMO_DETAILS:
      return { ...state, memoDetails, dataLoading, error };
    default:
      return state;
  }
};
