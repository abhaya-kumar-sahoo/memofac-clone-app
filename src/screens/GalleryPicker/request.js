import { API_TYPE, APP_APIS } from 'ApiLogic/API_URL';
import request from 'ApiLogic/axios.config';

export const UserProfileImageCall = formData => {
  return request({
    url: APP_APIS.EDIT_PROFILE,
    method: API_TYPE.POST,
    data: {
      formData,
    },
  });
};
