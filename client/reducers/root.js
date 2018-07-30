import { combineReducers } from 'redux';

const cocoms = (
  state = {
    isFetching: false,
    isReady: false,
    cocom_list: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_COCOM:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_COCOM:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        cocom_list: action.cocom_list
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
	personnels,
	platforms,
	payloads,
  payloadTypes,
  payloadData,
	munitions,
	locations,
  locationTypes,
  locationData,
  cocoms,
  translationsReducer,
  routing: routerReducer
});

export default rootReducer;
