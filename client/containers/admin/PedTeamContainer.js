import {connect} from 'react-redux';
import { fetchPedTeams, deletePedTeamById } from 'actions/pedteam';
import PedTeamComponent from '../../components/admin/PedTeamComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPedTeams: state.pedteam.allPedTeams,
    isLoading: state.pedteam.isFetching,
    isDeleted: state.pedteam.isDeleted,
   
  };
};

const mapDispatchToProps = {
  fetchPedTeams,
  deletePedTeamById,
 

};



export default connect(mapStateToProps, mapDispatchToProps)(PedTeamComponent);
