import {connect} from 'react-redux';

import IntelLibraryComponent from '../components/IntelLibraryComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(IntelLibraryComponent);
