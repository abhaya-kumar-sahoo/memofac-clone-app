import { API_TYPE, APP_APIS } from '../../../ApiLogic/API_URL';
import request from '../../../ApiLogic/axios.config';

export const addFavorites = (token, secondary_id) => {
  return request({
    url: APP_APIS.WISHLIST_FOLDER,
    method: API_TYPE.POST,
    data: {
      token,
      secondary_id,
    },
  });
};

export const UserDataApiCall = (token) => {
  return request({
    url: APP_APIS.USER_DETAILS,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};

export const GetGalleryImageseApiCall = (token, user_id) => {
  return request({
    url: APP_APIS.GET_GALLERY_IMAGES,
    method: API_TYPE.POST,
    data: {
      token,
      user_id,
    },
  });
};
export const MyRecaptureApiCall = (token, page, primary_id, secondary_id) => {
  return request({
    url: APP_APIS.MY_RECAPTURE_LIST,
    method: API_TYPE.POST,
    data: {
      token,
      page,
      primary_id,
      secondary_id,
    },
  });
};
