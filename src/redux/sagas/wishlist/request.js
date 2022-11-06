import { API_TYPE, APP_APIS } from 'ApiLogic/API_URL';
import request from 'ApiLogic/axios.config';

export const addToWishlistApiCall = (token, post_id) => {
  return request({
    url: APP_APIS.ADD_WISHLIST,
    method: API_TYPE.POST,
    data: {
      token,
      post_id,
    },
  });
};

export const addMemoWishlistApiCall = (token, memo_id) => {
  return request({
    url: APP_APIS.ADD_MEMO_TO_WISHLIST,
    method: API_TYPE.POST,
    data: {
      token,
      memo_id,
      primary_id: 0,
      secondary_id: 0,
    },
  });
};

export const getWishlistMemos = (
  token,
  sub_category_id = 0,
  primary_id = 0,
  secondary_id = 0
) => {
  return request({
    url: APP_APIS.WISHLIST_MEMOS,
    method: API_TYPE.POST,
    data: {
      token,
      sub_category_id,
      primary_id,
      secondary_id,
    },
  });
};

export const getWishlistGallery = (token) => {
  return request({
    url: APP_APIS.WISHLIST_GALLERY,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};

export const myWishlistApiCall = (token, page, primary_id, secondary_id) => {
  return request({
    url: APP_APIS.WISHLIST_POSTS,
    method: API_TYPE.POST,
    data: {
      token,
      page,
      primary_id,
      secondary_id,
    },
  });
};
