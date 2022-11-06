import { call, put, select } from 'redux-saga/effects';
import { ListFetchTypes } from 'redux/constants.redux';

import { setTimelinePosts } from 'redux/reducers/Timeline/Timeline.reducer';
import { showToast } from 'shared/Functions/ToastFunctions';
import { TimelineListApiCall } from './request';

const getTimeLineReducerData = state => state.TimelinePostsReducer;

// SUB CATEGORY HANDLER
export function* TimelineHandler(action) {
  const timeLineData = yield select(getTimeLineReducerData);
  try {

    const response = yield call(
      TimelineListApiCall,
      action.usertoken,
      action.page,
    );
    yield put(
      setTimelinePosts({
        data:
          action.fetchType == ListFetchTypes.FETCH
            ? response.content.data
            : [...timeLineData.post, ...response.content.data],
        error: false,
        isListEnd: response.content.data.length == 0,
        page: response.content.current_page,
      }),
    );
  } catch (error) {
    yield put(
      setTimelinePosts({
        data: [],
        dataLoading: false,
        error: true,
      }),
    );
    showToast('Something went wrong while Loading posts');
  }
}
