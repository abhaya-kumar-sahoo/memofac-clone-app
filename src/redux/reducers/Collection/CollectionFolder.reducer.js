export const GET_COLLECTION = 'GET_COLLECTION';
const SET_COLLECTION = 'SET_COLLECTION';

export const GetCollectionAction = (usertoken) => ({
  type: GET_COLLECTION,
  usertoken: usertoken,
});

export const SetCollectionAction = (data) => ({
  type: SET_COLLECTION,
  collectionFolders: data.collectionFolders,
  dataLoading: data.dataLoading,
  error: data.error,
});

const initialState = {
  collectionFolders: [],
  dataLoading: true,
  error: false,
};

export const CollectionFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTION:
      const { collectionFolders, dataLoading, error } = action;
      return { ...state, collectionFolders, dataLoading, error };
    default:
      return state;
  }
};
