import moment from 'moment';
import { IntelConstants, DateConsts } from '../dictionary/constants';
import { confirmAlert } from 'react-confirm-alert';
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const defaultFilter = (filter, row) => {
  const id = filter.pivotId || filter.id;
  let retVal = true;

  if ((row[id] !== undefined && row[id] !== null && row[id] !== '')) {
    // if(typeof row[id] === 'string') {
    retVal = String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase());

    // }
  } else{
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
    colorCode = { 'color': status.color };
  }
  return colorCode;
};

// Will call when user click on some icon like Add/Delete/Update and we want to confirm from user as yes/no/ok/cancel etc.
// @param :
// confirmationMessage: Message to Display in Pop Up example Confirm you wish to Delete Yes/No
// yes: options when user want to proceed example Yes/Ok
// no: option when user donot want to proceed example No/Cancel
// callback: callback function as per requirement
export const getConfirmation = (confirmationMessage, yes, no, callback) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui popup text-center">
          <h2>{confirmationMessage}</h2>
          <div>
            <button onClick={onClose}>{no}</button>
            <button onClick={() => {
              onClose();
              callback();
            }}>
              {yes}
            </button>
          </div>
        </div>
      );
    },
  });

};

export const showAlert = (message, buttonLabel = 'OK') => {
  confirmAlert({
    // title,
    message,
    buttons: [
      {
        label: buttonLabel,       
      },
    ],
  });
};
