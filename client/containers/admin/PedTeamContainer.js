import {connect} from 'react-redux';

import PedTeamComponent from '../../components/admin/PedTeamComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(PedTeamComponent);
