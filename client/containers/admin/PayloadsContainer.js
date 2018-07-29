import {connect} from 'react-redux';

import PayloadsComponent from '../../components/admin/PayloadsComponent';
import {getTranslations, getCocoms} from '../../actions/actions';
import { fetchLocationList } from 'actions/location';
import { addPayload, fetchPayloadList, fetchPayloads, fetchPayloadTypes } from 'actions/payload';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    payload_data: state.payloadData.payload_data,
    payload_list: state.payloads.payload_list,
    payload_types: state.payloadTypes.payload_types,
    fetchingPayloads: state.payloads.isFetching,
    location_list: state.locations.location_list,
    cocom_list: state.cocoms.cocom_list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addPayload: (payload) => {
    	dispatch(addPayload(payload));
    },

    fetchPayloadList: () => {
      dispatch(fetchPayloadList());
    },

    fetchPayloadTypes: () => {
      dispatch(fetchPayloadTypes());
    },

    fetchPayloads: () => {
    	dispatch(fetchPayloads());
    },

    getCocoms: () => {
      dispatch(getCocoms());
    },

    fetchLocationList: () => {
      dispatch(fetchLocationList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsComponent);
