import {connect} from 'react-redux';

import PayloadsComponent from '../../components/admin/PayloadsComponent';
import { fetchCocoms } from 'actions/cocom';
import { fetchLocationList } from 'actions/location';
import { addPayload, fetchPayloadList, fetchPayloads, fetchPayloadTypes } from 'actions/payload';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    allPayloads: state.payloads.allPayloads,
    payloadList: state.payloads.payloadList,
    payloadTypes: state.payloads.payloadTypes,
    fetchingPayloads: state.payloads.isFetching,
    locationList: state.locations.locationList,
    cocomList: state.cocoms.cocomList,
  };
};

const mapDispatchToProps = {
  addPayload,
  fetchPayloadList,
  fetchPayloadTypes,
  fetchPayloads,
  fetchCocoms,
  fetchLocationList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsComponent);
