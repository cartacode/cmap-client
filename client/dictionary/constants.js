export const NoticeType = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  MOVE_TO_COLLECTION: 'MOVE_TO_COLLECTION',
  MOVE_TO_INTEL_REQUEST: 'MOVE_TO_INTEL_REQUEST',
  NOT_DELETE: 'NOT_DELETE',
};

export const DateConsts = {
  DATE_FORMAT: 'M-D-YY',
  TIME_FORMAT: 'H:m A',
  DATETIME_FORMAT: 'M-D-YY H:m A',
  DB_DATETIME_FORMAT: 'YYYY-MM-DDTHH:mm:ss',
  DB_DATE_FORMAT: 'YYYY-MM-DD',
  DB_TIME_FORMAT: 'HH:mm:ss',
  UI_DATETIME_FORMAT: 'MM-DD-YYYY hh:mm A',
  UI_DATE_FORMAT: 'MM-DD-YYYY',
  UI_TIME_FORMAT: 'hh:mm A',
};

export const TableDefaults = {
  PAGE_SIZE: 5,
  MIN_ROWS: 1,
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
      id: 4,
      description: 'Denied - Insufficient Priority',
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
    MP: {
      id: 35,
      description: 'Mission Pending',
      abbreviation: 'MP',
      color: 'Red',
    },
    MA: {
      id: 36,
      description: 'Mission Active',
      abbreviation: 'MA',
      color: 'Orange',
    },
    MG: {
      id: 37,
      description: 'Mission Generated',
      abbreviation: 'MG',
      color: 'Blue',
    },
  },
};

export const InputAttributes = {
  MAX_LENGTH: 50,
  TEXTAREA_LEN: 500,
};

export const TimelineStatus = [
  {

  }

];

/* Pending - Gray  
Available - White
Off-line – Red
Booked – Green
Active – Red (our suggesstion Orange/Blue)
 */