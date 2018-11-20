import { CCIRPIR__ADD, CCIRPIR__UPDATE, CCIRPIR__FETCH, CCIRPIR__FETCH_ONE, CCIRPIR__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';
import {Error} from '../dictionary/constants';
export default function ccirpir(state = initialState.ccirpir, { payload, type, error }) {
  switch (type) {
    case CCIRPIR__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIRPIR__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allCcirPirs: payload.data,
      };
    case CCIRPIR__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIRPIR__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneCcirPir: payload.data,
      };
      case CCIRPIR__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case CCIRPIR__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case CCIRPIR__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case CCIRPIR__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case CCIRPIR__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
      case CCIRPIR__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error:Error.ERROR_CODE,
      };

    case CCIRPIR__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case CCIRPIR__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
      case CCIRPIR__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error:Error.ERROR_CODE,
      };
   

    default:
      return state;
  }
}
