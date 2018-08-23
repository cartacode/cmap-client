import { ORGANIC_PERSONNEL__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function organicpersonnels(state = initialState.organicpersonnels, { payload, type }) {
  switch (type) {
    case ORGANIC_PERSONNEL__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ORGANIC_PERSONNEL__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allOrganicPersonnels: payload.data,
      };
    default:
      return state;
  }
}
