import {connect} from 'react-redux';

 import PayloadsComponent from '../../components/admin/PayloadsComponent';
// import { fetchCocoms } from 'actions/cocom';
// import { fetchLocationList } from 'actions/location';
import { fetchPayloads /* fetchPayloadById,addPayload, fetchPayloadList,  fetchPayloadTypes */ } from 'actions/payloadinventory';

const mapStateToProps = state => {
  
  return {
    translations: state.localization.staticText,
    // payloadList: state.payloads.payloadList,
    // payloadTypes: state.payloads.payloadTypes,
    // fetchingPayloads: state.payloads.isFetching,
    // locationList: state.locations.locationList,
    // cocomList: state.cocoms.cocomList,
    // payload: state.payloads.onePayload, 
    allPayloadInventory: state.payloads.allPayloadInventory

  };
};

const mapDispatchToProps = {
  // addPayload,
  // fetchPayloadList,
  // fetchPayloadTypes,
  fetchPayloads,
  // fetchCocoms,
  // fetchLocationList,
  // fetchPayloadById 
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsComponent);
