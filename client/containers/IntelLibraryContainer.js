import {connect} from 'react-redux';

import IntelLibraryComponent from '../components/IntelLibraryComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(IntelLibraryComponent);
