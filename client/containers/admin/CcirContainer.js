import {connect} from 'react-redux';

import CcirComponent from '../../components/admin/CcirComponent';
import { addLocation, fetchLocations, deleteLocationById } from 'actions/location';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(CcirComponent);
