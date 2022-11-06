import { API_TYPE, APP_APIS } from '../../../ApiLogic/API_URL';
import request from '../../../ApiLogic/axios.config';

export const TimelineListApiCall = (token, page) => {
  return request({
    url: APP_APIS.TIMELINE_POSTS,
    method: API_TYPE.POST,
    data: {
      token,
      page,
    },
  });
};
