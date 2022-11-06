import { call, put } from 'redux-saga/effects';
import { SetMaincategoryAction } from '../../reducers/Memos/Maincategory.reducer';
import { GetMainCategoryList } from './request';

// SUB CATEGORY HANDLER
export function* MaincategoryHandler(action) {
  try {
    const response = yield call(GetMainCategoryList, action.usertoken, 1);
    yield put(
      SetMaincategoryAction({
        MaincategoryList: response.content,
        dataLoading: false,
        error: false,
      })
    );
  } catch (error) {
    yield put(
      SetMaincategoryAction({
        MaincategoryList: [],
        dataLoading: false,
        error: true,
      })
    );
  }
}
