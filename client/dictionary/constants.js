export const NoticeType = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  MOVE_TO_COLLECTION: 'MOVE_TO_COLLECTION',
  MOVE_TO_INTEL_REQUEST: 'MOVE_TO_INTEL_REQUEST',
  NOT_DELETE: 'NOT_DELETE',
  ERROR: 'ERROR',
  NOT_ADD: 'NOT_ADD',
  NOT_UPDATE: 'NOT_UPDATE',
  ROUTE_COLLECTION_INTEL_REQUEST: 'ROUTE_COLLECTION_INTEL_REQUEST'
};

export const DateConsts = {
  DATE_FORMAT: 'M/D/YY',
  TIME_FORMAT: 'h:mm A',
  DATETIME_FORMAT: 'MM/DD/YY h:mm A',
  DB_DATETIME_FORMAT: 'YYYY-MM-DDTHH:mm:ss',
  DB_DATE_FORMAT: 'YYYY-MM-DD',
  DB_TIME_FORMAT: 'HH:mm:ss',
  UI_DATETIME_FORMAT: 'MM/DD/YYYY hh:mm A',
  UI_DATE_FORMAT: 'MM/DD/YYYY',
  UI_TIME_FORMAT: 'hh:mm A',
};

export const TableDefaults = {
  PAGE_SIZE: 20,
  MIN_ROWS: 1,
  PAGE_SIZE_7: 7,
  MIN_ROWS_7: 7,
};

export const UnitConsts = {
  TYPE: {
    PED: 1,
    CREW: 2,
  },
};

export const MissionConsts = {
  RESOURCE: {
    PLATFORM: '1',
    TEAM: '2',
  },
  TABS: {
    ISR: 'ISR',
    ATO: 'ATO',
    FOP: 'FOP',
    PED: 'PED',
  },
};

export const IntelConstants = {
  STATUS: {
    OP: {
      id: 1,
      description: 'Origination in Process',
      abbreviation: 'OP',
      color: '#FFB6C1',
    },
    POH: {
      id: 2,
      description: 'Pending – On Hold',
      abbreviation: 'POH',
      color: '#FFA500',
    },
    DIAE: {
      id: 3,
      description: 'Denied - Intel Already Exists',
      abbreviation: 'DIAE',
      color: '#FFFF00',
    },
    DIP: {
      id: 4,
      description: 'Denied - Insufficient Priority',
      abbreviation: 'DIP',
      color: '#FFFF00',
    },
    DUR: {
      id: 5,
      description: 'Denied - Unavailable Resources',
      abbreviation: 'DIP',
      color: '#FFFF00',
    },
    DAIR: {
      id: 6,
      description: 'Denied - Additional Info Requested',
      abbreviation: 'DAIR',
      color: '#FF0000',

    },
    DRC: {
      id: 7,
      description: 'Denied - Request Canceled',
      abbreviation: 'DRC',
      color: '#FFFF00',
    },
    DWC: {
      id: 8,
      description: 'Denied – Weather Cancelation',
      abbreviation: 'DWC',
      color: '#FFFF00',
    },
    DPL: {
      id: 9,
      description: 'Denied – Past LTIV',
      abbreviation: 'DPL',
      color: '#FFFF00',
    },
    APR: {
      id: 10,
      description: 'Approved – Pending Resources',
      abbreviation: 'APR',
      color: '#0000FF',
    },
    AR: {
      id: 11,
      description: 'Approved – Resourced',
      abbreviation: 'AR',
      color: '#008000',
    },
    AE: {
      id: 12,
      description: 'Approved – Executed',
      abbreviation: 'AE',
      color: '#808080',
    },
    AIP: {
      id: 13,
      description: 'Approved – Intel Posted',
      abbreviation: 'AIP',
      color: '#FFA500',
    },
    AV: {
      id: 21,
      description: 'Approved - Validated',
      abbreviation: 'AV',
      color: '#00FFFF',
    },
    AAG: {
      id: 22,
      description: 'Approved - ATO Generated',
      abbreviation: 'AAG',
      color: 'darkkhaki',
    },
    MPNDG: {
      id: 35,
      description: 'Mission Pending',
      abbreviation: 'MP',
      color: 'Red',
    },
    MA: {
      id: 36,
      description: 'Mission Active',
      abbreviation: 'MA',
      color: 'lightgreen',
    },
    MPLAN: {
      id: 37,
      description: 'Mission Planning',
      abbreviation: 'MPLAN',
      color: 'cyan',
    },
    IPOST: {
      id: 38,
      description: 'Intel Posted',
      abbreviation: 'IPOST',
      color: 'orange',
    },
    IPNDG: {
      id: 39,
      description: 'Intel Pending',
      abbreviation: 'IPNDG',
      color: 'PURPLE',
    },
  },
};

export const InputAttributes = {
  MAX_LENGTH: 50,
  DESC_LENGTH: 1000,
  TEXTAREA_LEN: 500,

};

export const Error = {
  ERROR_CODE: 417,
}

export const ImageryUrls = {
  BING_IMAGERY: 'https://dev.virtualearth.net',
 // GEOSERVER_IMAGERY: 'http://18.219.160.200:9090/geoserver/wms'
 //GEOSERVER_IMAGERY: 'https://ec2-18-221-155-233.us-east-2.compute.amazonaws.com:8080/geoserver/amps/wms'
 GEOSERVER_IMAGERY: 'https://cartography.tcampere.com:8080/geoserver/amps/wms'

}

export const MapTypes = {
  LOCAL: 'local',
  INTERNET: 'internet'
}

/* export const LocalMapLayer = {
  WORLD_MAP: 'WORLD_RADAR:WORLDGEOTIF',
  ASIA_CATEGORIZED: 'WORLD_RADAR:WORLDGEOTIF,asia_categorized:asia-osm',
  SYRIA_LEBANON: 'WORLD_RADAR:WORLDGEOTIF,SYRIA_LEBNON:Syria_Lenon_generated_Map'
} */


export const LocalMapLayer = {
  WORLD_MAP: 'amps:WORLDGEOTIF',
  ASIA_CATEGORIZED: 'amps:WORLDGEOTIF,amps:asia-osm',
  SYRIA_LEBANON: 'amps:WORLDGEOTIF,amps:amps_Layer_Group_Syria_lebanon_navigation'
}


/* Pending - Gray
Available - White
Off-line – Red
Booked – Green
Active – Red (our suggesstion Orange/Blue)
 */