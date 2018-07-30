import {connect} from 'react-redux';

import SchedulesComponent from '../components/SchedulesComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(SchedulesComponent);
