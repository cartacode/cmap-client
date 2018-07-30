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
  },
  payloads: {
    allPayloads: [],
    isFetching: false,
    isListFetching: false,
    isTypesFetching: false,
    payloadList: [],
    payloadTypes: [],
  },
  personnels: {
    allPersonnels: [],
    isFetching: false,
  },
  platforms: {
    allPlatforms: [],
    isFetching: false,
  },
};
