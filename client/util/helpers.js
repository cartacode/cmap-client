import moment from 'moment';
import { IntelConstants, DateConsts } from '../dictionary/constants';

export const defaultFilter = (filter, row) => {
  const id = filter.pivotId || filter.id;
  let retVal = true;

  if ((row[id] !== undefined && row[id] !== null && row[id] !== '')) {
    // if(typeof row[id] === 'string') {
    retVal = String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase());

    // }
  }
  else{
    retVal = false;
  }
  return retVal;
  //   return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
};

export const formatDate = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format(DateConsts.DATE_FORMAT);
};

export const formatDateTime = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format(DateConsts.DATETIME_FORMAT);
};

export const formatTime = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format(DateConsts.TIME_FORMAT);
};

export const getIntelStatusColor = (abbreviation) => {
  const status = IntelConstants.STATUS[abbreviation];
  let colorCode;
  if(status !== undefined) {
    colorCode = {'color': status.color}
  }
  return colorCode;
};

