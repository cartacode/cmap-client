import {connect} from 'react-redux';

import SearchComponent from '../components/SearchComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(SearchComponent);
