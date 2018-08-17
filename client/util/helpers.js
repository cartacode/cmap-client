import moment from 'moment';
import { IntelReqStatusCodes } from "../dictionary/constants";

export const defaultFilter = (filter, row) => {
  const id = filter.pivotId || filter.id;
  let retVal = true;

  if ((row[id] !== undefined && row[id] !== null)) {
    // if(typeof row[id] === 'string') {
    retVal = String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase());
    // }
  }
  return retVal;
  //   return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
}

export const formatDate = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format("M-D-YY");
}

export const formatDateTime = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format("M-D-YY H:m A");
}

export const formatTime = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format("H:m A");
}

export const getIntelRequestStatusCodeColoe = (statusId) => {
  let statueCodes = JSON.stringify(IntelReqStatusCodes);
  statueCodes = JSON.parse(statueCodes);
  console.log("****************IntelReqStatusCodes***********" + statueCodes);
  let colorCode;
  for (let i = 0; i < statueCodes.length; i++) {
    if (statusId == statueCodes[i].id) {
      colorCode = statueCodes[i].color;
      break;
    }
  }
  console.log("***********************colorCode*************" + colorCode);
  return colorCode;
};