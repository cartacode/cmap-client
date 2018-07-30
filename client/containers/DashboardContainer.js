import {connect} from 'react-redux';

import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(DashboardComponent);
