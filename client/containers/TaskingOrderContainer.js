import {connect} from 'react-redux';

import TaskingOrderComponent from '../components/TaskingOrderComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(TaskingOrderComponent);
