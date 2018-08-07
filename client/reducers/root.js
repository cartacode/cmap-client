import { combineReducers } from 'redux';

import cocoms from 'reducers/cocoms';
import localization from 'reducers/localization';
import locations from 'reducers/locations';
import munitions from 'reducers/munitions';
import munitionsinventory from 'reducers/munitionsinventory';
import payloads from 'reducers/payloads';
import payloadinventory from 'reducers/payloadinventory';
import personnels from 'reducers/personnels';
import platforms from 'reducers/platforms';
import platforminventory from 'reducers/platforminventory';
import paygrades from 'reducers/paygrade';
import ranks from 'reducers/ranks';

export default function createReducer() {
  return combineReducers({
    cocoms,
    ranks,
    paygrades,
    localization,
    locations,
    munitions,
    munitionsinventory,
    payloads,
    payloadinventory,
    personnels,
    platforms,
    platforminventory,
    
  });
}
