export const NoticeType = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE"
};

export const IntelReqStatusCodes = [
  {
    id: 1,
    description: "Origination in Process",
    color: ''
  },
  {
    id: 10,
    description: "Approved – Pending Resources",
    color: '#0000FF'
  },
  {
    id: 11,
    description: "Approved – Resourced",
    color: '#008000'
  },
  {
    id: 12,
    description: "Approved – Executed",
    color: '#808080'
  },
  {
    id: 13,
    description: "Approved – Intel Posted",
    color : '#FFA500'
  },
  {
    id: 2,
    description: "Pending – On Hold",
    color : '#FFA500'
  },
  {
    id: 21,
    description: "Approved - Validated",
    color: '#008000',
  },
  {
    id: 3,
    description: "Denied - Intel Already Exists",
    color: '#FFFF00'
  },
  {
    id: 4,
    description: "Denied - Insufficient Priority",
    color: '#FFFF00'
  },
  {
    id: 5,
    description: "Denied – Unavailable Resources",
    color: '#FFFF00'
  },
  {
    id: 6,
    description: "Denied - Additional Info Requested",
    color: '#FF0000'

  },
  {
    id: 7,
    description: "Denied - Request Canceled",
    color: '#FFFF00'
  },
  {
    id: 8,
    description: "Denied – Weather Cancelation",
    color: '#FFFF00'
  },
  {
    id: 9,
    description: "Denied – Past LTIV",
    color: '#FFFF00'
  }
];
