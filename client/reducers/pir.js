import { PIR__FETCH, PIR__FETCH_ONE, PIR__DELETE_ONE, PIR__ADD, PIR__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';
import { Error } from '../dictionary/constants';

export default function pirs(state = initialState.pirs, { payload, type }) {
  switch (type) {
    case PIR__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PIR__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPir: payload.data,
      };
    case PIR__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case PIR__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        onePir: payload.data,
      };
    case PIR__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PIR__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case PIR__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case PIR__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case PIR__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case PIR__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: Error.ERROR_CODE,
      };

    case PIR__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case PIR__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case PIR__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: Error.ERROR_CODE,
      };

    default:
      return state;
  }
}
