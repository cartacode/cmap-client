import {connect} from 'react-redux';
import {   fetchOperations, deleteOperationById } from 'actions/operations';


import OperationsComponent from '../../components/admin/OperationsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allOperations: state.operations.allOperations,
    isLoading: state.operations.isFetching,
    isDeleted: state.operations.isDeleted,
  };
};

const mapDispatchToProps = {
  fetchOperations,
  deleteOperationById
};



export default connect(mapStateToProps, mapDispatchToProps)(OperationsComponent);
