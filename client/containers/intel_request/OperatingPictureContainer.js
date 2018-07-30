import {connect} from 'react-redux';

import OperatingPictureComponent from '../../components/intel_request/OperatingPictureComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(OperatingPictureComponent);
