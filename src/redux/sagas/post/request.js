import { showToast } from 'shared/Functions/ToastFunctions';
import { API_TYPE, APP_APIS } from '../../../ApiLogic/API_URL';
import request from '../../../ApiLogic/axios.config';

export const RecaptureApiCall = data => {
  // showToast(JSON.stringify(data));
  // console.log(data);
  return request({
    url: APP_APIS.RECAPTURE,
    Headers: {
      'Content-Type':
        'multipart/form-data; boundary=<calculated when request is sent>',
    },
    method: API_TYPE.POST,
    redirect: 'follow',
    data: data,
  });
};

export const DeletePostApiCall = (token, post_id) => {
  return request({
    url: APP_APIS.DELETE_RECAPTURE_POST,
    method: API_TYPE.POST,
    data: {
      token,
      post_id,
    },
  });
};

export const GetSinglePostData = (token, post_id) => {
  return request({
    url: APP_APIS.SINGL_POST,
    method: API_TYPE.POST,
    data: {
      token,
      post_id,
    },
  });
};

// time_line;
//  API :  For  adding a comment to a particular post
export const AddReactionApiCall = (token, post_id, react_type) => {
  // console.log(
  //   '\n\n',
  //   {
  //     token,
  //     post_id,
  //     react_type,
  //   },
  //   '\n\n',
  // );
  return request({
    url: APP_APIS.ADD_REACT,
    method: API_TYPE.POST,
    data: {
      token,
      post_id,
      react_type,
    },
  });
};

//  API :  For  adding a comment to a particular post
export const AddCommentApiCall = (token, post_id, comment) => {
  return request({
    url: APP_APIS.ADD_COMMENT,
    method: API_TYPE.POST,
    data: {
      token,
      post_id,
      comment,
    },
  });
};
export const DeleteCommentApiCall = (token, comment_id) => {
  return request({
    url: APP_APIS.DELETE_COMMENT,
    method: API_TYPE.POST,
    data: {
      token,
      comment_id,
    },
  });
};

//  API :  For  adding a comment to a particular post
export const ListcommentsApiCall = (token, post_id) => {
  return request({
    url: APP_APIS.LIST_COMMENT_REACT,
    method: API_TYPE.POST,
    data: {
      token,
      post_id,
    },
  });
};
