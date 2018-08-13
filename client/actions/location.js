import axios from 'axios';
import qs from 'qs';

import { LOCATION__ADD, LOCATION__UPDATE, LOCATION__FETCH, LOCATION__FETCH_ONE, LOCATION_LIST__FETCH, LOCATION_TYPE__FETCH, LOCATION__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addLocation(location) {
  return createAction({
    type: LOCATION__ADD,
    action: () => axios.post(`${baseUrl}/Locations/PostLocations`, location, formDataRequestHeader),
  });
}


export function updateLocation(id, location) {
  return createAction({
    type: LOCATION__UPDATE,
    action: () => axios.put(`${baseUrl}/Locations/PutLocations/${id}`, location, formDataRequestHeader),
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
    action: () => axios.get(`${baseUrl}/Locations/GetLocationsDataByCategory?categoryId=1`, requestHeaders),
  });
}


export function fetchLocationById(id) {
  return createAction({
    type: LOCATION__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Locations/GetLocations/${id}`, requestHeaders),
  });
}

export function fetchLocationTypes() {
  return createAction({
    type: LOCATION_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/LocationCategory`, requestHeaders),
  });
}

export function deleteLocationById(id) {
  return createAction({
    type: LOCATION__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Locations/DeleteLocations/${id}`, requestHeaders),
  });
}