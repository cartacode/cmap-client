import {connect} from 'react-redux';

import AirCrewComponent from '../../components/admin/AirCrewComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(AirCrewComponent);
