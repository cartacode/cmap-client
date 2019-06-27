import {connect} from 'react-redux';

import OpordComponent from '../../components/admin/OpordComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(OpordComponent);
