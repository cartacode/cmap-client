import { MUNITION__FETCH, MUNITION__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function munitions(state = initialState.munitions, { payload, type }) {
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
    default:
      return state;
  }
}
