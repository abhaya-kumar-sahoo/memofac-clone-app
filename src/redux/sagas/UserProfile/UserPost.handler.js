import { call, put, select } from 'redux-saga/effects';
import { SetUserPostAction } from 'redux/reducers/UserProfile/UserPost_reducer';
import { MyRecaptureApiCall } from './userProfile.request';

const userPostData = state => state.UserPostReducer;

// SUB CATEGORY HANDLER
export function* UserPostDataHandler(action) {
  const userPosts = yield select(userPostData);

  try {
    const response = yield call(
      MyRecaptureApiCall,
      action.usertoken,
      action.page,
    );

    yield put(
      SetUserPostAction({
        data:
          action.page == 1
            ? response.content.data
            : [...userPosts.data, ...response.content.data],
        dataLoading: false,
        current_page: response.content.current_page,
        error: false,
        isListEnd: response.content.data.length == 0,
      }),
    );
  } catch (error) {
    yield put(
      SetUserPostAction({
        data: [],
        dataLoading: false,
        current_page: 1,
        error: false,
      }),
    );
  }
}
