import {connect} from 'react-redux';

 import PayloadsComponent from '../../components/admin/PayloadsComponent';
// import { fetchCocoms } from 'actions/cocom';
// import { fetchLocationList } from 'actions/location';
import { fetchPayloadInventory } from 'actions/payloadinventory';

const mapStateToProps = state => {
  
  return {
    translations: state.localization.staticText,
    // payloadList: state.payloads.payloadList,
    // payloadTypes: state.payloads.payloadTypes,
    // fetchingPayloads: state.payloads.isFetching,
    // locationList: state.locations.locationList,
    // cocomList: state.cocoms.cocomList,
    // payload: state.payloads.onePayload, 
    allPayloadInventory: state.payloadinventory.allPayloadInventory,

  };
};

const mapDispatchToProps = {
  // addPayload,
  // fetchPayloadList,
  // fetchPayloadTypes,
  fetchPayloadInventory,
  // fetchCocoms,
  // fetchLocationList,
  // fetchPayloadById 
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsComponent);
