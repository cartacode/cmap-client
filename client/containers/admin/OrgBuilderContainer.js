import {connect} from 'react-redux';

import OrgBuilderComponent from '../../components/admin/OrgBuilderComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(OrgBuilderComponent);
