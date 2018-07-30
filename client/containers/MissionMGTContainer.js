import {connect} from 'react-redux';

import MissionMGTComponent from '../components/MissionMGTComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(MissionMGTComponent);
