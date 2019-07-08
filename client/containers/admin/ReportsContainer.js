import {connect} from 'react-redux';

import ReportsComponent from '../../components/admin/ReportsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    
    
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent);
