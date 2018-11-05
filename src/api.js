import {Data} from './data';

export function get(endpoint) {
  return Data[endpoint];
}

// export function post(endpoint, body, options) {
//   return request('POST', endpoint, body, options);
// }
//
// export function put(endpoint, body, options) {
//   return request('PUT', endpoint, body, options);
// }
//
// export function deleteReq(endpoint, options) {
//   return request('DELETE', endpoint, {}, options);
// }

// function request(method, endpoint, body = null, options = {}) {
//   const fullUrl = endpoint.indexOf(API_ROOT) === -1
//     ? API_ROOT + endpoint
//     : endpoint;
//
//   return fetch(fullUrl, {
//     method: method,
//     async: true,
//     crossDomain: true,
//     headers: {
//       ...options,
//     },
//     body,
//   }).then(response => {
//     switch (response.status) {
//       case 401:
//         return {response};
//       case 500:
//         return {
//           json: {
//             status: response.status
//           },
//           response
//         };
//       case 204:
//         return {response};
//       default:
//         return response.json().then(json => ({json, response}));
//     }
//   }).then(({
//     json = {},
//     response
//   }) => {
//     if (!response.ok) {
//       return Promise.reject(json);
//     }
//     return json;
//   }).catch(error => {
//     console.log('error ', error);
//   });
// }
