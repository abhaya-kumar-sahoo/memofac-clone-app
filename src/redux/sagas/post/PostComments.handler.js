import { call, put } from 'redux-saga/effects';
import { setPostReactionsComments } from 'redux/reducers/Post/PostComments.reducer';
import { showToast } from 'shared/Functions/ToastFunctions';
import { ListcommentsApiCall } from './request';

// SUB CATEGORY HANDLER
export function* CommentsReactionshandler(action) {
  try {
    const response = yield call(
      ListcommentsApiCall,
      action.usertoken,
      action.post_id,
    );

    yield put(
      setPostReactionsComments({
        data: response.content,
        error: false,
      }),
    );
  } catch (error) {
    yield put(
      setPostReactionsComments({
        data: {},
        error: false,
      }),
    );
    showToast('Something went wrong while loading comments');
  }
}
