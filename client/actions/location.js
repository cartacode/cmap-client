import axios from 'axios';
import qs from 'qs';

import { LOCATION__ADD, LOCATION__FETCH, LOCATION_LIST__FETCH, LOCATION_TYPE__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addLocation(location) {
  return createAction({
    type: LOCATION__ADD,
    action: () => axios.post(`${baseUrl}/Locations`, qs.stringify(location), requestHeaders),
  });
}

export function fetchLocationList() {
  return createAction({
    type: LOCATION_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Locations/GetLocations`, requestHeaders),
  });
}

export function fetchLocations() {
  return createAction({
    type: LOCATION__FETCH,
    action: () => axios.get(`${baseUrl}/Locations/GetLocationsData`, requestHeaders),
  });
}

export function fetchLocationTypes() {
  return createAction({
    type: LOCATION_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/LocationCategory`, requestHeaders),
  });
}
