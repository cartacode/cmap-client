import { ACCOUNT__LOGIN, ACCOUNT__LOGOUT } from 'dictionary/action';
import React from 'react';
import initialState from 'store/initialState';
import { Redirect } from 'react-router-dom';

export default function auth(state = initialState.auth, { payload, type }) {
  switch (type) {
    case ACCOUNT__LOGIN.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACCOUNT__LOGIN.SUCCESS:
      return {
        ...state,
        loginData: payload.data,
        authenticated:true,
        isFetching: false,
      };
    case ACCOUNT__LOGOUT.REQUEST:
      return {
        
      };
    case ACCOUNT__LOGOUT.SUCCESS:
    sessionStorage.removeItem('jwtToken');
    <Redirect to='/login'/>
      return {
        ...state,
        loginData: {},
        authenticated:false,
      };
    default:
      return state;
  }
}
