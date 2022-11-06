import { call, put, select } from 'redux-saga/effects';
import { ListFetchTypes } from 'redux/constants.redux';
import { SetRecomMemosAction } from '../../reducers/Memos/RecomMemos.reducer';
import { GetSubCategoryList, RecomMemosApiCall } from './request';

const getRecoMemoReducerData = state => state.RecomMemosRedux;
const getTimeLineReducerData = state => state.RecomMemosReducer;

// SUB CATEGORY HANDLER
export function* RecomMemoshandler(action) {
  const RecomMemos = yield select(getRecoMemoReducerData);

  try {
    const response = yield call(
      RecomMemosApiCall,
      action.usertoken,
      action.page,
      (secondary_id = 0),
      (search_text = ''),
      action.offset,
    );
    yield put(
      SetRecomMemosAction({
        rmemos:
          action.fetchType == ListFetchTypes.FETCH
            ? response.content
            : [...RecomMemos.rmemos, ...response.content],
        dataLoading: false,
        error: false,
        fetchType: action.fetchType,
      }),
    );
  } catch (error) {
    yield put(
      SetRecomMemosAction({
        rmemos: [],
        dataLoading: false,
        error: true,
        fetchType: action.fetchType,
      }),
    );
  }
}
