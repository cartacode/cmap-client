import { CCIR__FETCH, CCIR__FETCH_ONE, CCIR__DELETE_ONE, CCIR__ADD, CCIR__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';
import { Error } from '../dictionary/constants';

export default function ccirs(state = initialState.ccirs, { payload, type }) {
  switch (type) {
    case CCIR__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIR__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allCcir: payload.data,
      };
    case CCIR__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case CCIR__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneCcir: payload.data,
      };
    case CCIR__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case CCIR__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case CCIR__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case CCIR__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case CCIR__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case CCIR__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: Error.ERROR_CODE,
      };

    case CCIR__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case CCIR__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case CCIR__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: Error.ERROR_CODE,
      };

    default:
      return state;
  }
}
