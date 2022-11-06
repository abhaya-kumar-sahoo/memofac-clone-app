import { call, put } from 'redux-saga/effects';
import { SetMemoPostAction } from 'redux/reducers/Post/MemoRelatedPost.reducer';
import { MemoRelatedPostsApi } from '../Memos/request';

// SUB CATEGORY HANDLER
export function* MemoPostDataHandler(action) {
  try {
    const response = yield call(
      MemoRelatedPostsApi,
      action.usertoken,
      action.memoId,
    );

    yield put(
      SetMemoPostAction({
        data: response.content.data,
        dataLoading: false,
        error: false,
      }),
    );
  } catch (error) {
    yield put(
      SetMemoPostAction({
        data: [],
        dataLoading: false,
        error: false,
      }),
    );
  }
}
