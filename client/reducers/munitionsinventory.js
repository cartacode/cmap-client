import { MUNITION_INVENTORY__FETCH, MUNITION_INVENTORY__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function munitions(state = initialState.munitions, { payload, type }) {
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
    default:
      return state;
  }
}