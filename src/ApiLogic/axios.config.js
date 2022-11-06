import axios from 'axios';
import { APP_APIS } from './API_URL';
/**
 * Request Wrapper with default success/error actions
 */

const headerDefault = { 'Content-Type': 'application/json' };

const request = async function (
  options,
  isHeader = true,
  headersData = { ...headerDefault },
) {
  let authHeader = null;

  if (isHeader) {
    // authHeader = await AsyncStorage.getItem("Auth"); /// Add header
  }
  let source = axios.CancelToken.source();

  const client = axios.create({
    baseURL: APP_APIS.BASE_URL,
    cancelToken: source.token,
    headers: {
      Authorization: authHeader,
      ...headersData,
    },
  });

  const onSuccess = function (response) {
    // console.log(response);
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
