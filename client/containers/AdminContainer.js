import {connect} from 'react-redux';

import AdminComponent from '../components/AdminComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(AdminComponent);
