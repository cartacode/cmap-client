// Dev url
//export const baseUrl = 'http://18.222.48.211:8081/api';
//export const baseUrl = 'http://18.222.103.61/api';
// export const baseUrl = 'http://ec2-18-222-103-61.us-east-2.compute.amazonaws.com/api';
export const baseUrl = 'https://data.tcampere.com/api';
// Staging URL
//  export const baseUrl = 'http://ec2-18-220-128-32.us-east-2.compute.amazonaws.com:8081/api';

const ses = JSON.parse(localStorage.getItem('session'));
let token = '';
if(ses) {
  token = ses.access_token;
}

export const requestHeaders = {
  'Accept': 'application/json,text/plain',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Cache-Control': 'no-cache',
};

export const requestHeaders2 = {
  'Authorization': `Bearer ${token}`,
};

export const formDataRequestHeader = {
  'Accept': 'application/json,text/plain',
  'Content-Type': '',
  // 'Content-Type': 'multipart/form-data',
  'Authorization': `Bearer ${token}`,
  'Cache-Control': 'no-cache',
  // 'Content-Type': 'multipart/form-data',
};

