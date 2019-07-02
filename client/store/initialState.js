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
    isKMLFetching: false,
    locationList: [],
    locationTypes: [],
    locationKMLs: [],
    isDeleted: false,
    isAdded: false,
    isUpdated: false,
    error: {},
    allLayers:[]
  },

  munitions: {
    allMunitions: [],
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    allMunitionInventory: [],
    oneMunitionInventory: {},
    oneMunition: {},
    isAdded:false,
    isUpdated:false,
    error:{}
  },

  payloads: {
    allPayloads: [],
    onePayload: {},
    isFetching: false,
    isListFetching: false,
    isTypesFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    isAdded: false,
    isUpdated: false,
    payloadList: [],
    payloadTypes: [],    
    onePayloadInventory: {},
    allPayloadInventory: [],
    error: {},
  },
  personnels: {
    allPersonnels: [],
    onePersonnel: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    isAdded: false,
    isUpdated: false,
    error: {},
  },

  operations: {
    allOperations: [],
    oneOperation: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    isAdded: false,
    isUpdated: false,
    error: {},
  },

  ccirpir: {
    allCcirPirs: [],
    oneCcirPir: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    isAdded: false,
    isUpdated: false,
    error: {}
  },

  platforms: {
    allPlatforms: [],
    onePlatform: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted:false,
    allPlatformInventory: [],
    onePlatformInventory: {},
    isAdded: false,
    isUpdated:false,
    error: {},
  },

  collections: {
    allApprovedIntelRequests: [],
    allCollectionsPlan: [],
    isFetching: false,
    isDeleted:false
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
    oneMissionDetail:{},
    isBooked: false,
    error: {},
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
    logo: {},
    comment:{},
    isFetching: false,
  },

  intelrequest: {
    allRequests: [],
    oneIntelRequest: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    isStatusUpdated: false,
  },

  inteleei: {
    eeis: [],
    oneEei: {},
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
  },

  organicorgs: {
    allOrganicOrgs: [],
    allDeployedOrgs: [],
    isFetching: false,
  },

  organicpersonnels: {
    allOrganicPersonnels: [],
    allDeployedPersonnels:[],
    listOrganicPersonnels: [],
    oneUnit: {},
    nextHigherUnit: {},
    isFetching: false,
  },

  auth: {
    loginData: {},
    authenticated:false,
    isFetching: false,
    userRoles: [],
  },

  dashboards: {
    opsPlatform: {},
    opsPayload: {},
    opsMission: [],
    aisrOperation: [],
    latestIntelligence: [],
    upcomingMissions: [],
    liveOperations: [],
    isFetching: false,
  },
  intellibraries: {
    allIntelLibraries: [],
    isFetching: false,
  },

  equipments: {
    isFetching: false,
    isFetchingOne: false,
    isDeleted: false,
    allEquipmentInventory: [],
    oneEquipmentInventory: {},
  },

};
