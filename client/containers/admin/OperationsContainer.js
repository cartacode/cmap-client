import {connect} from 'react-redux';

import OperationsComponent from '../../components/admin/OperationsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(OperationsComponent);
