import { API_TYPE, APP_APIS } from '../../../ApiLogic/API_URL';
import request from '../../../ApiLogic/axios.config';

export const getCollectionFolderApiCall = (token) => {
  return request({
    url: APP_APIS.GET_COLLECTION_FOLDER,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};

export const createPrimaryFolderApiCall = (token, name) => {
  return request({
    url: APP_APIS.CREATE_PRIMARY_FOLDER,
    method: API_TYPE.POST,
    data: {
      token,
      name,
    },
  });
};

export const createSecondaryFolderApiCall = (token, name, primary_id) => {
  return request({
    url: APP_APIS.CREATE_SECONDARY_FOLDER,
    method: API_TYPE.POST,
    data: {
      token,
      name,
      primary_id,
    },
  });
};
