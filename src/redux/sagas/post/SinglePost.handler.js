import { call, put } from 'redux-saga/effects';
import { SetSinglePostAction } from 'redux/reducers/Post/SinglePost.reducer';
import { GetSinglePostData } from './request';

// SUB CATEGORY HANDLER
export function* SinglePostDataHandler(action) {
  try {
    const response = yield call(
      GetSinglePostData,
      action.usertoken,
      action.memoId,
    );
    yield put(
      SetSinglePostAction({
        data: response.content == null ? {} : response.content,
        dataLoading: false,
        error: false,
      }),
    );
  } catch (error) {
    yield put(
      SetSinglePostAction({
        data: {},
        dataLoading: false,
        error: false,
      }),
    );
  }
}
