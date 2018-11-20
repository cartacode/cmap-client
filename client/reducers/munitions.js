import { MUNITION__FETCH, MUNITION__FETCH_ONE, MUNITION__DELETE_ONE,MUNITION__ADD, MUNITION__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';
import {Error} from '../dictionary/constants';
export default function munitions(state = initialState.munitions, { payload, type, error }) {
  switch (type) {
    case MUNITION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MUNITION__FETCH.SUCCESS:
      return {
        ...state,
        allMunitions: payload.data,
        isFetching: false,
      };
      case MUNITION__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MUNITION__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneMunition: payload.data,
      };
      case MUNITION__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case MUNITION__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case MUNITION__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      }; 
      
      case MUNITION__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
      case MUNITION__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error:Error.ERROR_CODE,
      }; 
      case MUNITION__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
      case MUNITION__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error:Error.ERROR_CODE,
      }; 
      
    default:
      return state;
  }
}
