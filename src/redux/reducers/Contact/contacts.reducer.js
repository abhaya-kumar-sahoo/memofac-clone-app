import { GetContactsApiCall } from 'redux/sagas/Contacts/api.request';

export const SYNC_CONTACTS = 'SYNC_CONTACTS';
const SET_COLLECTION = 'SET_COLLECTION';
export const CONTACT_SYN = 'CONTACT_SYN';

export const syncContacts = () => ({
  type: SYNC_CONTACTS,
});
export const ContactsSync = () => ({
  type: CONTACT_SYN,
});
export const setContacts = ({ contacts, dataLoading }) => ({
  type: SET_COLLECTION,
  data: contacts,
  loading: dataLoading,
});

const initialState = {
  dataLoading: true,
  error: false,
  contacts: [],
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTION:
      const { data, loading } = action;

      return {
        ...state,
        contacts: data,
        dataLoading: loading,
        error: 'no-error',
      };
    case SYNC_CONTACTS:
      return {
        ...state,
        error: 'noerror',
        dataLoading: false,
      };
    case CONTACT_SYN:
      return {
        ...state,
        error: 'errors',
        dataLoading: true,
      };
    default:
      return state;
  }
};
