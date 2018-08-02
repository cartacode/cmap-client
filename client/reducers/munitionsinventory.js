import { MUNITION_INVENTORY__FETCH } from 'dictionary/action';
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
        allMunitions: payload.data,
        isFetching: false,
      };
    default:
      return state;
  }
}
