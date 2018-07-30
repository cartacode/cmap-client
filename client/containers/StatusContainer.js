import {connect} from 'react-redux';

import StatusComponent from '../components/StatusComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(StatusComponent);
