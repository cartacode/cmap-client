import {connect} from 'react-redux';

import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(DashboardComponent);
