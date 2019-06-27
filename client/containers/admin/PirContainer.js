import {connect} from 'react-redux';

import PirComponent from '../../components/admin/PirComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(PirComponent);
