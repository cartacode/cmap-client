import { MUNITION_INVENTORY__FETCH, MUNITION_INVENTORY__FETCH_ONE, MUNITION_INVENTORY__DELETE_ONE, MUNITION_INVENTORY__ADD,MUNITION_INVENTORY__UPDATE} from 'dictionary/action';
import initialState from 'store/initialState';
import {Error} from '../dictionary/constants';
export default function munitions(state = initialState.munitions, { payload, type, error }) {
  switch (type) {
    case MUNITION_INVENTORY__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MUNITION_INVENTORY__FETCH.SUCCESS:
      return {
        ...state,
        allMunitionInventory: payload.data,
        isFetching: false,
      };
    case MUNITION_INVENTORY__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case MUNITION_INVENTORY__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneMunitionInventory: payload.data,
      };    
      case MUNITION_INVENTORY__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case MUNITION_INVENTORY__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
      case MUNITION_INVENTORY__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      }; 
      case MUNITION_INVENTORY__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
      case MUNITION_INVENTORY__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error:Error.ERROR_CODE,
      }; 
      case MUNITION_INVENTORY__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
      case MUNITION_INVENTORY__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error:Error.ERROR_CODE,
      }; 
      
    default:
      return state;
    
  }
}
