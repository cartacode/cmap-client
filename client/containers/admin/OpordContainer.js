import {connect} from 'react-redux';
import { fetchOpords, deleteOpordById } from 'actions/opord';
import OpordComponent from '../../components/admin/OpordComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allOpords: state.opord.allOpords,
    isLoading: state.opord.isFetching,
    isDeleted: state.opord.isDeleted,
   
  };
};

const mapDispatchToProps = {
  fetchOpords,
  deleteOpordById,
 

};



export default connect(mapStateToProps, mapDispatchToProps)(OpordComponent);
