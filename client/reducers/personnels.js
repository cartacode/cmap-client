import { PERSONNEL__FETCH } from 'dictionary/action';
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
        isFetching: false,
        allPersonnels: payload.data,
      };
    default:
      return state;
  }
}
