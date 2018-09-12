import axios from 'axios';
import qs from 'qs';

import { ACCOUNT__REGISTER, ACCOUNT__LOGIN } from 'dictionary/action';
import { baseUrl2, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function addRegister(register) {
  return createAction({
    type: ACCOUNT__REGISTER,
    action: () => axios.post(`${baseUrl2}/Account/Register`, qs.stringify(register), requestHeaders),
  });
}


