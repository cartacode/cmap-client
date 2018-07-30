import {connect} from 'react-redux';

import LoginComponent from '../components/LoginComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(LoginComponent);
