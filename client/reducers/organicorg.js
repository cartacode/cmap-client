import { ORGANIC_ORG__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function organicorgs(state = initialState.organicorgs, { payload, type }) {
  switch (type) {
    case ORGANIC_ORG__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ORGANIC_ORG__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allOrganicOrgs: payload.data,
      };
    default:
      return state;
  }
}
