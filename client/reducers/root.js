import { combineReducers } from 'redux';

import cocoms from 'reducers/cocoms';
import localization from 'reducers/localization';
import locations from 'reducers/locations';
import munitions from 'reducers/munitions';
import payloads from 'reducers/payloads';
import personnels from 'reducers/personnels';
import platforms from 'reducers/platforms';

export default function createReducer() {
  return combineReducers({
    cocoms,
    localization,
    locations,
    munitions,
    payloads,
    personnels,
    platforms,
  });
}
