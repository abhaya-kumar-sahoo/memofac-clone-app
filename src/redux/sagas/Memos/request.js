import { API_TYPE, APP_APIS } from '../../../ApiLogic/API_URL';
import request from '../../../ApiLogic/axios.config';
// export function requestGetUser() {
//   return axios.request({
//     method: 'get',
//     url: 'https://my-json-server.typicode.com/atothey/demo/user',
//   });
// }
export const DEFAULT_GROUP_KEY = 3; // currently it signifies Public group

export const addMemoApiCall = (
  token,
  title,
  description,
  secondary_id,
  priority_key,
) => {
  return request({
    url: APP_APIS.ADD_MEMO,
    method: API_TYPE.POST,
    data: {
      token,
      title,
      description,
      parent_id: 1,
      secondary_id,
      priority_key,
    },
  });
};

export const MemoDetailsApi = (token, memo_id) => {
  return request({
    url: APP_APIS.MEMO_DETAILS,
    method: API_TYPE.POST,
    data: {
      token,
      memo_id,
    },
  });
};

export const MemoRelatedPostsApi = (token, memo_id) => {
  return request({
    url: APP_APIS.MEMO_RELATED_POST,
    method: API_TYPE.POST,
    data: {
      token,
      memo_id,
    },
  });
};

export const RateMemos = (
  token,
  memo_id,
  rating,
  share_with = DEFAULT_GROUP_KEY,
) => {
  // showToast('share_with ---> ' + share_with);
  // console.log({ token, memo_id, rating, share_with, exp_on: '', savedIN: '' });
  return request({
    url: APP_APIS.RATE_MEMOS,
    method: API_TYPE.POST,
    data: {
      token,
      memo_id,
      rating,
      share_with: share_with,
      exp_on: '',
      savedIN: '',
    },
  });
};

// SEEN_MEMO
export const setSeenMemoApiCall = (token, id) => {
  return request({
    url: APP_APIS.SEEN_MEMO,
    method: API_TYPE.POST,
    data: {
      token,
      id,
    },
  });
};

export const GetSubCategoryList = (token, category_id, type = undefined) => {
  return request({
    url: APP_APIS.SUBCATEGORY_LIST,
    method: API_TYPE.POST,
    data: {
      token,
      category_id,
      type,
    },
  });
};

export const GetCategoryListOfMemos = category_id => {
  return request({
    url: APP_APIS.CATEGORY_LIST_OF_MEMOS,
    method: API_TYPE.POST,
    data: {
      category_id,
    },
  });
};

export const GetMemosfromCategoryApiCall = (
  token,
  user_id,
  sub_category_id = '0',
) => {
  return request({
    url: APP_APIS.MEMOS_OF_CATEGORY,
    method: API_TYPE.POST,
    data: {
      token,
      sub_category_id,
      user_id,
    },
  });
};

export const GetFndMemosCategoryApiCall = (token, userID) => {
  return request({
    url: APP_APIS.FRIENDS_MEMO_CATEGORY,
    method: API_TYPE.POST,
    data: {
      token,
      userID,
    },
  });
};
export const GetUserMemosCategoryApiCall = token => {
  return request({
    url: APP_APIS.USER_MEMO_CATEGORY,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};
export const GetMainCategoryList = (token, secondary_id = '0') => {
  return request({
    url: APP_APIS.MAIN_CATEGORY_LIST,
    method: API_TYPE.POST,
    data: {
      token,
      secondary_id,
    },
  });
};

export const SearchmemoApiCall = (token, search_text = '', page) => {
  return request({
    url: APP_APIS.SEARCH_MEMOS,
    method: API_TYPE.POST,
    data: {
      token,
      search_text,
      page,
    },
  });
};

export const RecomMemosApiCall = (
  token,
  page,
  secondary_id = 0,
  search_text = '',
  offset = 0,
) => {
  return request({
    url: APP_APIS.RECOMMENDED_MEMOS,
    method: API_TYPE.POST,
    data: {
      token,
      page,
      secondary_id,
      search_text,
      offset,
    },
  });
};
export const MemosListApiCall = (
  token,
  secondary_id = 0,
  page = 1,
  search_text = '',
) => {
  return request({
    url: APP_APIS.LIST_OF_MEMOS,
    method: API_TYPE.POST,
    data: {
      token,
      secondary_id,
      page,

      // search_text,
      // page,
    },
  });
};

export const UserRatingApiCall = (token, id, type = '') => {
  return request({
    url: APP_APIS.USER_RATINGS,
    method: API_TYPE.POST,
    data: {
      token,
      type,
      id,
    },
  });
};

export const reqSecondaryFolderApiCall = data => {
  return request({
    url: APP_APIS.REQ_SECONDARY_FOLDER,
    Headers: {
      'Content-Type':
        'multipart/form-data; boundary=<calculated when request is sent>',
    },
    method: API_TYPE.POST,
    redirect: 'follow',
    data: data,
  });
};
