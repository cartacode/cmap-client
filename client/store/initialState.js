import englishStaticText from 'assets/json/staticText/en';
import { directionality } from 'dictionary/localization';

export default {
  cocoms: {
    cocomList: [],
    isListFetching: false,
  },
  localization: {
    directionality: directionality.ltr,
    languageCode: 'en',
    staticText: englishStaticText,
  },
  locations: {
    allLocations: [],
    isFetching: false,
    isListFetching: false,
    isTypesFetching: false,
    locationList: [],
    locationTypes: [],
  },

  munitions: {
    allMunitions: [],
    isFetching: false,
    isFetchingOne: false,
    allMunitionInventory: [],
    oneMunitionInventory: {},
    oneMunition: {}
  },

  payloads: {
    allPayloads: [],
    onePayload: {},
    isFetching: false,
    isListFetching: false,
    isTypesFetching: false,
    isFetchingOne: false,
    payloadList: [],
    payloadTypes: [],    
    onePayloadInventory: {},
    allPayloadInventory: [],
  },
  personnels: {
    allPersonnels: [],
    onePersonnel: {},
    isFetching: false,
    isFetchingOne: false,
  },

  platforms: {
    allPlatforms: [],
    onePlatform: {},
    isDone: false,
    isFetching: false,
    isFetchingOne: false,
    allPlatformInventory: [],
    onePlatformInventory: {},
  },
};
