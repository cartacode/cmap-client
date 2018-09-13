import axios from 'axios';
import qs from 'qs';

import { ACCOUNT__REGISTER, ACCOUNT__LOGIN, ACCOUNT__CHANGE_PASSWORD } from 'dictionary/action';
import { baseUrl2, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function addRegister(register) {
  return createAction({
    type: ACCOUNT__REGISTER,
    action: () => axios.post(`${baseUrl2}/Account/Register`, qs.stringify(register), requestHeaders),
  });
}

export function changePassword(register) {
  return createAction({
    type: ACCOUNT__CHANGE_PASSWORD,
    action: () => axios.post(`${baseUrl2}/Account/ChangePassword`, qs.stringify(register), requestHeaders),
  });
}

