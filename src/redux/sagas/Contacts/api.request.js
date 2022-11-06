import { API_TYPE, APP_APIS } from '../../../ApiLogic/API_URL';
import request from '../../../ApiLogic/axios.config';

// export function requestGetUser() {
//   return axios.request({
//     method: 'get',
//     url: 'https://my-json-server.typicode.com/atothey/demo/user',
//   });
// }

export const UpdateContacts = (token, data, country_code) => {
  return request({
    url: APP_APIS.ADD_MASTER_CONTACT,
    method: API_TYPE.POST,
    data: {
      token,
      data,
      country_code,
    },
  });
};

export const DeleteMasterContact = token => {
  return request({
    url: APP_APIS.DELETE_MASTER_CONTACT,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};
export const GetGroupsList = token => {
  return request({
    url: APP_APIS.GET_GROUP_LIST,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};
export const GetGroupMembersApicall = token => {
  return request({
    url: APP_APIS.GET_GROUP_LIST_WITH_MEMBERS,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};

export const CreateGroup = (token, name) => {
  return request({
    url: APP_APIS.CREATE_GROUP,
    method: API_TYPE.POST,
    data: {
      token,
      name,
    },
  });
};

// Get all contacs
export const GetContactsApiCall = token => {
  return request({
    url: APP_APIS.GET_CONTACT_LIST,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};
export const GetMemofacUserApiCall = token => {
  return request({
    url: APP_APIS.GET_MEMOFAC_USER_CONTACT_LIST,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};

export const AddmemberToGroup = (token, group_id, member_id) => {
  return request({
    url: APP_APIS.ADD_MEMBER_GROUP,
    method: API_TYPE.POST,
    data: {
      token,
      group_id,
      member_id,
    },
  });
};

export const RemoveMemberFromGroup = (token, group_id, member_id) => {
  return request({
    url: APP_APIS.REMOVE_MEMBER_GROUP,
    method: API_TYPE.POST,
    data: {
      token,
      group_id,
      member_id,
    },
  });
};

export const ReportProblems = (token, description) => {
  return request({
    url: APP_APIS.REPORT_PROBLEM,
    method: API_TYPE.POST,
    data: {
      token,
      description,
    },
  });
};

export const ReportMemoProblems = (token, description, memo_id) => {
  return request({
    url: APP_APIS.REPORT_MEMO_PROBLEM,
    method: API_TYPE.POST,
    data: {
      token,
      description,
      memo_id,
    },
  });
};
