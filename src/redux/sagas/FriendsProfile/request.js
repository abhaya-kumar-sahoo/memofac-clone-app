// time_line;

import { API_TYPE, APP_APIS } from 'ApiLogic/API_URL';
import request from 'ApiLogic/axios.config';

//  API :  For  adding a comment to a particular post
export const getFriendsDetailsApicall = (token, userID) => {
  return request({
    url: APP_APIS.FRIENDS_DETAILS,
    method: API_TYPE.POST,
    data: {
      token,
      userID,
    },
  });
};

export const getFriendsPostsApiCall = (token, userID) => {
  return request({
    url: APP_APIS.FRIENDS_RECAPTURE_LIST,
    method: API_TYPE.POST,
    data: {
      token,
      userID,
    },
  });
};
