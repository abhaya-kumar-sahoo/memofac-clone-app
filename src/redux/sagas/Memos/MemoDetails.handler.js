import { call, put } from 'redux-saga/effects';
import { SetMemoDetailsAction } from 'redux/reducers/Memos/MemoDetails.reducer';
import { SetMaincategoryAction } from '../../reducers/Memos/Maincategory.reducer';
import { MemoDetailsApi } from './request';

// SUB CATEGORY HANDLER
export function* MemoDetailsHandler(action) {
  const { usertoken, memo_id } = { ...action };
  try {
    const response = yield call(MemoDetailsApi, usertoken, memo_id);
    yield put(
      SetMemoDetailsAction({
        memoDetails: response.content,
        dataLoading: false,
        error: false,
      }),
    );
  } catch (error) {
    yield put(
      SetMemoDetailsAction({
        memoDetails: {},
        dataLoading: false,
        error: true,
      }),
    );
  }
}
