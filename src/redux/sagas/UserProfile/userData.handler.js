import { call, put } from 'redux-saga/effects';
import { SetUserDetailsAction } from 'redux/reducers/UserProfile/userprofile.reducer';
import { showToast } from 'shared/Functions/ToastFunctions';
import { GetUserMemosCategoryApiCall } from '../Memos/request';
import { UserDataApiCall } from './userProfile.request';

// SUB CATEGORY HANDLER
export function* UserDataHandler(action) {
  try {
    const response = yield call(UserDataApiCall, action.usertoken);
    const UserMemoCategory = yield call(
      GetUserMemosCategoryApiCall,
      action.usertoken,
    );
    yield put(
      SetUserDetailsAction({
        userProfileData: response,
        categoryMemoList: UserMemoCategory.content.rated_memo,
        dataLoading: false,
        error: false,
      }),
    );
  } catch (error) {
    yield put(
      SetUserDetailsAction({
        userProfileData: {},
        categoryMemoList: [],
        dataLoading: false,
        error: true,
      }),
    );
  }
}
