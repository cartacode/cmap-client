import {connect} from 'react-redux';

import ResourcesComponent from '../../components/intel_request/ResourcesComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(ResourcesComponent);
