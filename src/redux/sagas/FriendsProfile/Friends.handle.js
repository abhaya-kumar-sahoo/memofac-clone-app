import { call, put } from 'redux-saga/effects';
import { SetFriendPostAction } from 'redux/reducers/FriendsProfile/FriendsProfile.reducer';

import { getFriendsDetailsApicall } from './request';

// SUB CATEGORY HANDLER
export function* FriendPostDataHandler(action) {
  try {
    const response = yield call(
      getFriendsDetailsApicall,
      action.usertoken,
      action.userId,
    );

    console.log('response', response);

    yield put(
      SetFriendPostAction({
        data: response.content,
        dataLoading: false,
        error: false,
      }),
    );
    console.log('3');
  } catch (error) {
    yield put(
      SetFriendPostAction({
        data: {},
        dataLoading: false,
        error: false,
      }),
    );
  }
}
