import React, { Component } from 'react';
import { processResponse } from './Api.Components';
import { API_TYPE, API_URL, APP_APIS } from './API_URL';
import request from 'ApiLogic/axios.config';
import { Platform } from 'react-native';

//  FOR SENSING OTP
export const SendOtpAPiCall = (formData, onResponse, onError) => {
  if (Platform.OS === 'android') {
    fetch(APP_APIS.SEND_OTP, {
      method: API_TYPE.POST,
      body: formData,
    })
      .then(processResponse)
      .then(res => {
        onResponse(res);
      })
      .catch(error => onError(error));
  } else if (Platform.OS === 'ios') {
    fetch(APP_APIS.SEND_OTP_IOS, {
      method: API_TYPE.POST,
      body: formData,
    })
      .then(processResponse)
      .then(res => {
        onResponse(res);
      })
      .catch(error => onError(error));
  }
};

// LOGIN API CALL
// export const LoginApiCall = (rawData, onResponse, onError) => {
//   var myHeaders = new Headers();
//   myHeaders.append('Content-Type', 'application/json');

//   fetch(APP_APIS.LOGIN, {
//     method: API_TYPE.POST,
//     headers: myHeaders,
//     body: rawData,
//     redirect: 'follow',
//   })
//     .then(processResponse)
//     .then((res) => {
//       onResponse(res);
//     })
//     .catch((error) => onError(error));

//     return request({
//       url: APP_APIS.LOGIN,
//       method: API_TYPE.POST,
//       data: {
//         token,
//         name,
//       },
//     });

// };

export const LoginApiCall = data => {
  return request({
    url: APP_APIS.LOGIN,
    method: API_TYPE.POST,
    data,
  });
};

export const sendOtpApiCall = (phone, country_code) => {
  return request({
    url: APP_APIS.SEND_OTP,
    method: API_TYPE.POST,
    data: {
      country_code,
      phone,
    },
  });
};

export const LogoutApiCall = (rawData, onResponse, onError) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(APP_APIS.LOGOUT, {
    method: API_TYPE.POST,
    headers: myHeaders,
    body: rawData,
    redirect: 'follow',
  })
    .then(processResponse)
    .then(res => {
      onResponse(res);
    })
    .catch(error => onError(error));
};
