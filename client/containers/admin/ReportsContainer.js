import {connect} from 'react-redux';

import ReportsComponent from '../../components/admin/ReportsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allReports: state.reports.allReports,
    isDeleted: state.reports.isDeleted,
    isLoaded:state.reports.isLoaded
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent);
