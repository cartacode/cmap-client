import { combineReducers } from 'redux';

import cocoms from 'reducers/cocoms';
import locations from 'reducers/locations';
import munitions from 'reducers/munitions';
import payloads from 'reducers/payloads';
import personnels from 'reducers/personnels';
import platforms from 'reducers/platforms';

export default function createReducer() {
  return combineReducers({
    cocoms,
    locations,
    munitions,
    payloads,
    personnels,
    platforms,
  });
}
