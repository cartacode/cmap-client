import {PLATFORM__FETCH, PLATFORM__FETCH_ONE, PLATFORM__DELETE_ONE, PLATFORM__ADD, PLATFORM__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function platforms(state = initialState.platforms, { payload, type }) {
  switch (type) {
    case PLATFORM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPlatforms: payload.data,
      };
    case PLATFORM__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePlatform: payload.data,
      };
    case PLATFORM__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PLATFORM__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case PLATFORM__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };


    case PLATFORM__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case PLATFORM__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
      case PLATFORM__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: '',
      };


      case PLATFORM__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case PLATFORM__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
      case PLATFORM__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: '',
      };


    default:
      return state;
  }
}
