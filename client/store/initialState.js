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
    oneLocation: {},
    isFetching: false,
    isListFetching: false,
    isTypesFetching: false,
    locationList: [],
    locationTypes: [],
    isDeleted: false
  },

  munitions: {
    allMunitions: [],
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
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
    isDeleted: false,
    payloadList: [],
    payloadTypes: [],    
    onePayloadInventory: {},
    allPayloadInventory: []
  },
  personnels: {
    allPersonnels: [],
    onePersonnel: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false
  },

  ccirpir: {
    allCcirPirs: [],
    oneCcirPir: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false
  },

  platforms: {
    allPlatforms: [],
    onePlatform: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted:false,
    allPlatformInventory: [],
    onePlatformInventory: {}
  },

  collections: {
    allApprovedIntelRequests: [],
    allCollectionsPlan: [],
    isFetching: false,
  },
  mssionmgts: {
    atoCollectionPlans:[],
    atoGenerations: [],
    
    fopPlatformAto: [],
    fopPlatforms: [],
    fopCrews: [],
    fopCrewAto: [],
    
    pedTasks: [],
    pedTasksAtoGenerations:[],
    isFetching: false,
    filterResults: [],
    allMissionSummary:[],
    oneMissionDetail:{}
  },
  paygrades: {
    paygradeList: [],
    isListFetching: false,
  },

  ranks: {
    rankList: [],
    isListFetching: false,
  },

  status: {
    platforms: [],
    payloads: [],
    personnels: [],
    munitions: [],
    onePlatform: {},
    onePayload: {},
    onePersonnel: {},
    oneMunition: {},
    isFetching: false,
  },

  intelrequest: {
    allRequests: [],
    oneIntelRequest: {},
    isFetching: false,
    isFetchingOne: false,
  },

  inteleei: {
    eeis: [],
    oneEei: {},
    isFetching: false,
    isFetchingOne: false,
  },

  organicorgs: {
    allOrganicOrgs: [],
    allDeployedOrgs: [],
    isFetching: false,
  },

  organicpersonnels: {
    allOrganicPersonnels: [],
    listOrganicPersonnels: [],
    oneUnit: {},
    isFetching: false,
  },

};
