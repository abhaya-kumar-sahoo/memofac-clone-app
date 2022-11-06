import { PersistType } from 'redux/constants.redux';

export const SET_VISIBILITY = 'SET_VISIBILITY';
export const SET_NOTES = 'SET_NOTES';
export const SET_MEMO_DATA_SUMMARY = 'SET_MEMO_DATA_SUMMARY';
export const SET_MEMO_RATING = 'SET_MEMO_RATING';
export const SET_GROUP_SELECTED = 'SET_GROUP_SELECTED';
export const CLEAR_RECAPTURE_FORM_DATA = 'CLEAR_RECAPTURE_FORM_DATA';
export const UPDATE_MEMOS_LIST = 'UPDATE_MEMOS_LIST';

const groupDataModel = {
  id: 3,
  name: 'Public',
  count: 0,
};
const memoDatModel = {
  id: -1,
  category_id: '',
  title: '',
  image: null,
};

export const setRecaptureFormDefault = () => ({
  type: CLEAR_RECAPTURE_FORM_DATA,
});

export const setNotesRecapture = ({ notes }) => ({
  type: SET_NOTES,
  notes,
});

export const updateMemosList = ({ MemoArray }) => ({
  type: UPDATE_MEMOS_LIST,
  MemoArray,
});

export const SetMemoVisibility = (
  visible,
  memoData,
  persistType,
  actionInfo = { type: null, memo: null }
) => ({
  type: SET_VISIBILITY,
  visible,
  memoData,
  persistType,
  actionInfo,
});

export const setRecaptureMemoRating = ({ ratingGiven }) => ({
  type: SET_MEMO_RATING,
  ratingGiven,
});

export const setRecaptureGroup = ({
  groupSelected = { ...groupDataModel },
}) => ({
  type: SET_GROUP_SELECTED,
  groupSelected,
});

export const setSummarizedMemoData = () => ({
  type: SET_MEMO_DATA_SUMMARY,
  memoData,
});

const initialState = {
  visible: false,
  ratingGiven: -1,
  groupSelected: {
    ...groupDataModel,
  },
  notes: '',
  actionInfo: { type: null, memo: null },
  memoData: {},
  MemoArray: [],
};

export const MemoVisibilityReducer = (state = initialState, action) => {
  const {
    visible,
    memoData,
    groupSelected,
    ratingGiven,
    notes,
    MemoArray,
    persistType = PersistType.DATA_CLEAR,
    actionInfo,
  } = {
    ...action,
  };

  switch (action.type) {
    case SET_VISIBILITY:
      return {
        ...state,
        visible,
        memoData: visible || persistType ? { ...memoData } : {},
        MemoArray: visible || persistType ? [{ ...memoData }] : [],
        actionInfo,
      };
    case SET_NOTES:
      return { ...state, notes };
    case UPDATE_MEMOS_LIST:
      return { ...state, MemoArray };
    case SET_MEMO_DATA_SUMMARY:
      return { ...state, memoData };
    case SET_GROUP_SELECTED:
      return { ...state, groupSelected };
    case SET_MEMO_RATING:
      return { ...state, ratingGiven };
    case CLEAR_RECAPTURE_FORM_DATA:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
