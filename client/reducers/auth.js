import { ACCOUNT__LOGIN } from 'dictionary/action';
import initialState from 'store/initialState';

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
    default:
      return state;
  }
}
