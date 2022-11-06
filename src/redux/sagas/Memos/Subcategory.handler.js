import { call, put } from 'redux-saga/effects';
import { SetcategoryAction } from '../../reducers/Memos/Subcategory.reducer';
import { GetSubCategoryList } from './request';

// SUB CATEGORY HANDLER
export function* SubcategoryHandler(action) {
  try {
    const response = yield call(
      GetSubCategoryList,
      action.usertoken,
      action.category_id,
    );
    yield put(
      SetcategoryAction({
        subcategoryList: response.content,
        dataLoading: false,
        error: false,
      }),
    );
  } catch (error) {
    console.log('ERROR', error);
    yield put(
      SetcategoryAction({
        subcategoryList: [],
        dataLoading: false,
        error: true,
      }),
    );
  }
}
