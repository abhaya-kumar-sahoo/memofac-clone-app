import { call, select, put } from '@redux-saga/core/effects';
import Contacts from 'react-native-contacts';
import { setContacts } from 'redux/reducers/Contact/contacts.reducer';
import { refactorContacts } from 'screens/Contacts/components';
import { showToast } from 'shared/Functions/ToastFunctions';
import {
  DeleteMasterContact,
  GetContactsApiCall,
  UpdateContacts,
} from './api.request';

const userAuth = state => state.userAuth;

// SUB CATEGORY HANDLER
export function* ContactSyncHandler(action) {
  // yield put(setContacts({ contacts: [], dataLoading: true }));
  const userAuthData = yield select(userAuth);
  const { userToken, countrycode } = { ...userAuthData };
  const contactsList = yield Contacts.getAll();
  // console.log(contactsList.length);
  // const deleteContact = yield call(DeleteMasterContact, userToken);

  try {
    const response = yield call(
      UpdateContacts,
      userToken,
      refactorContacts(contactsList),
      countrycode,
    );

    // console.log('response contact', response.content.length);

    yield put(setContacts({ contacts: response.content, dataLoading: false }));
  } catch (error) {
    yield put(setContacts({ contacts: [], dataLoading: false }));
  }
}
