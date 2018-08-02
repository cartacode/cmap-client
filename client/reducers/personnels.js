import { PERSONNEL__FETCH, PERSONNEL__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function personnels(state = initialState.personnels, { payload, type }) {
  switch (type) {
    case PERSONNEL__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PERSONNEL__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPersonnels: payload.data,
      };
    case PERSONNEL__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PERSONNEL__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePersonnel: payload.data,
      };

    default:
      return state;
  }
}
