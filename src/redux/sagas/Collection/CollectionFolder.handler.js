import { call, put } from 'redux-saga/effects';
import { showToast } from 'shared/Functions/ToastFunctions';
import { SetCollectionAction } from '../../reducers/Collection/CollectionFolder.reducer';
import { getCollectionFolderApiCall } from './request';

// SUB CATEGORY HANDLER
export function* CollectionFolderhandler(action) {
  try {
    const response = yield call(getCollectionFolderApiCall, action.usertoken);

    yield put(
      SetCollectionAction({
        collectionFolders: response.content,
        dataLoading: false,
        error: false,
      })
    );
  } catch (error) {
    yield put(
      SetCollectionAction({
        collectionFolders: [],
        dataLoading: false,
        error: true,
      })
    );
  }
}
