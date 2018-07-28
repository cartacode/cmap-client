  /**
 * this is actionTaken actions creator functions.
 */
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';
import qs  from 'qs';
import namor from "namor";


import {

        GET_TRANSLATIONS_FULFILLED,

        REQUEST_ADD_PERSONNEL,
        RECEIVE_ADD_PERSONNEL,

        REQUEST_PERSONNELS,
        RECEIVE_PERSONNELS,

        REQUEST_ADD_PLATFORM,
        RECEIVE_ADD_PLATFORM,

        REQUEST_PLATFORMS,
        RECEIVE_PLATFORMS,

        REQUEST_ADD_PAYLOAD,
        RECEIVE_ADD_PAYLOAD,

        REQUEST_PAYLOAD,
        RECEIVE_PAYLOAD,

        REQUEST_PAYLOAD_TYPES,
        RECEIVE_PAYLOAD_TYPES,

        REQUEST_PAYLOAD_DATA,
        RECEIVE_PAYLOAD_DATA,

        REQUEST_UPLOAD,
        RECEIVE_UPLOAD,

        REQUEST_ADD_MUNITION,
        RECEIVE_ADD_MUNITION,

        REQUEST_MUNITION,
        RECEIVE_MUNITION,

        REQUEST_ADD_LOCATION,
        RECEIVE_ADD_LOCATION,

        REQUEST_LOCATIONS,
        RECEIVE_LOCATIONS,

        REQUEST_LOCATION_TYPES,
        RECEIVE_LOCATION_TYPES,

        REQUEST_LOCATION_DATA,
        RECEIVE_LOCATION_DATA,

        REQUEST_ADD_EEI,
        RECEIVE_ADD_EEI,

        REQUEST_ADD_INTELREQUEST,
        RECEIVE_ADD_INTELREQUEST,

        REQUEST_COCOM,
        RECEIVE_COCOM,

} from '../constants/actionTypes';

export let getTranslations = (lang) => {
  return (dispatch) => {
    let response = require(`../translates/${lang}.json`)

    dispatch({ type: GET_TRANSLATIONS_FULFILLED, payload: response });
  };
};

// platform

function requestAddPlatform() {
  return {
    type: REQUEST_ADD_PLATFORM
  };
}

function receiveAddPlatform() {
  return {
    type: RECEIVE_ADD_PLATFORM
  };
}


export let addPlatform = (platform) => {

  const url = baseUrl + 'Platform';

  console.log('----here api-----------');
  console.log(qs.stringify(platform));
  console.log(JSON.stringify(platform));



  return (dispatch) => {
    dispatch(requestAddPlatform());
    return axios.post(url, qs.stringify(platform), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddPlatform(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

function requestPlatforms() {
  return {
    type: REQUEST_PLATFORMS
  }
}

function receivePlatforms(data) {
  return {
    type: RECEIVE_PLATFORMS,
    platforms: data
  }
}


export function fetchPlatforms() {

  const url = baseUrl + 'Platform/GetPlatformsData';

  console.log('----here munition api-----------');

  return (dispatch) => {
    dispatch(requestPlatforms());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receivePlatforms(response.data));
        console.log(response.data);
        return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

// payload

function requestAddPayload() {
  return {
    type: REQUEST_ADD_PAYLOAD
  };
}

function receiveAddPayload() {
  return {
    type: RECEIVE_ADD_PAYLOAD
  };
}


export let addPayload = (payload) => {

  const url = baseUrl + 'Payload';

  console.log(JSON.stringify(payload));
  console.log(requestHeaders);

  return (dispatch) => {
    dispatch(requestAddPayload());
    return axios.post(url, qs.stringify(payload), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddPayload(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }

}

function requestPayloads() {
  return {
    type: REQUEST_PAYLOAD
  }
}

function receivePayloads(data) {
  return {
    type: RECEIVE_PAYLOAD,
    payloads: data
  }
}


export let getPayloads = () => {

  const url = baseUrl + 'Payload/GetPayloads';

  return (dispatch) => {
    dispatch(requestPayloads());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receivePayloads(response.data));
        console.log(response.data);
        console.log(response);
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

function requestPayloadTypes() {
  return {
    type: REQUEST_PAYLOAD_TYPES
  }
}

function receivePayloadTypes(data) {
  return {
    type: RECEIVE_PAYLOAD_TYPES,
    payload_types: data
  }
}


export let getPayloadTypes = () => {

  const url = baseUrl + 'PayloadType';

  return (dispatch) => {
    dispatch(requestPayloadTypes());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receivePayloadTypes(response.data));
        console.log(response);
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


function requestPayloadData() {
  return {
    type: REQUEST_PAYLOAD_DATA
  }
}

function receivePayloadData(data) {
  return {
    type: RECEIVE_PAYLOAD_DATA,
    payload_data: data
  }
}


export function fetchPayloadData() {

  const url = baseUrl + 'Payload/GetPayloadsData';

  return (dispatch) => {
    dispatch(requestPayloadData());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receivePayloadData(response.data));
        console.log(JSON.stringify(response.data));
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


// Munition

function requestAddMunition() {
  return {
    type: REQUEST_ADD_MUNITION
  }
}

function receiveAddMunition() {
  return {
    type: RECEIVE_ADD_MUNITION
  }
}


export let addMunition = (munition) => {

  const url = baseUrl + 'Munition';

  console.log('----here munition api-----------');
  console.log(JSON.stringify(munition));


  return (dispatch) => {
    dispatch(requestAddMunition());
    return axios.post(url, qs.stringify(munition), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddMunition(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


function requestMunitions() {
  return {
    type: REQUEST_MUNITION
  }
}

function receiveMunitions(data) {
  return {
    type: RECEIVE_MUNITION,
    munitions: data
  }
}


export function fetchMunitions() {

  const url = baseUrl + 'Munition/GetMunitionsData';

  console.log('----here munition api-----------');


  return (dispatch) => {
    dispatch(requestMunitions());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveMunitions(response.data));
        console.log(response.data);
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

// Locations

function requestAddLocation() {
  return {
    type: REQUEST_ADD_LOCATION
  }
}

function receiveAddLocation() {
  return {
    type: RECEIVE_ADD_LOCATION
  }
}


export let addLocation = (location) => {

  const url = baseUrl + 'Locations';

  console.log('----here locations post api-----------');
  console.log(JSON.stringify(location));


  return (dispatch) => {
    dispatch(requestAddLocation());
    return axios.post(url, qs.stringify(location), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddLocation(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


function requestLocations() {
  return {
    type: REQUEST_LOCATIONS
  }
}

function receiveLocations(data) {
  return {
    type: RECEIVE_LOCATIONS,
    location_list: data
  }
}


export function getLocations() {

  const url = baseUrl + 'Locations/GetLocations';

  return (dispatch) => {
    dispatch(requestLocations());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveLocations(response.data));
        return response.data;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

function requestLocationTypes() {
  return {
    type: REQUEST_LOCATION_TYPE
  }
}

function receiveLocationTypes(data) {
  return {
    type: RECEIVE_LOCATION_DATA,
    location_types: data
  }
}


export function getLocationsTypes() {

  const url = baseUrl + 'LocationCategory';

  return (dispatch) => {
    dispatch(requestLocationTypes());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveLocationTypes(response.data));
        return response.data;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


function requestLocationData() {
  return {
    type: REQUEST_LOCATION_DATA
  }
}

function receiveLocationData(data) {
  return {
    type: RECEIVE_LOCATION_DATA,
    location_data: data
  }
}


export function fetchLocationData() {

  const url = baseUrl + 'Locations/GetLocationsData';

  return (dispatch) => {
    dispatch(requestLocationData());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveLocationData(response.data));
        console.log("Location Data is");
        console.log(response.data);
        return response.data;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    type: namor.generate({ words: 1, numbers: 0 }),
    name: namor.generate({ words: 1, numbers: 0 }),
    serial: Math.floor(Math.random() * 30),
    cocom: namor.generate({ words: 1, numbers: 0 }),
    unit: Math.floor(Math.random() * 100),
    location: Math.floor(Math.random() * 100),
    view: 'view',
    date:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 100) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}


// intel Request EEI
function requestAddEEI() {
  return {
    type: REQUEST_ADD_EEI
  }
}

function receiveAddEEI() {
  return {
    type: RECEIVE_ADD_EEI
  }
}


export let addIntelEEI = (intelEEI) => {

  const url = baseUrl + 'IntelReqEEI';

  console.log('----here locations post api-----------');
  console.log(JSON.stringify(intelEEI));


  return (dispatch) => {
    dispatch(requestAddEEI());
    return axios.post(url, qs.stringify(intelEEI), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddEEI(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


// intel Request
function requestAddIntelReq() {
  return {
    type: REQUEST_ADD_INTELREQUEST
  }
}

function receiveAddIntelReq() {
  return {
    type: RECEIVE_ADD_INTELREQUEST
  }
}


export let addIntelReq = (intelReq) => {

  const url = baseUrl + 'IntelRequest';

  console.log('----here locations post api-----------');
  console.log(JSON.stringify(intelReq));


  return (dispatch) => {
    dispatch(requestAddIntelReq());
    return axios.post(url, qs.stringify(intelReq), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddIntelReq(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

//cocom reqeust

function requestCocoms() {
  return {
    type: REQUEST_COCOM
  }
}

function receiveCocoms(data) {
  return {
    type: RECEIVE_COCOM,
    cocom_list: data
  }
}


export function getCocoms() {

  const url = baseUrl + 'COCOM';

  return (dispatch) => {
    dispatch(requestCocoms());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveCocoms(response.data));
        return response.data;
      }
    )
    .catch(error => {
        alert(error);
    });
  }
}
