import React from 'react';
import PropTypes from 'prop-types';


class EquipmentComponent extends React.Component {

  constructor(props) {
    super(props);
   
  }


  

   

  render() {

    const {translations, match} = this.props;
    
    return (
      <div>
        <h2 style={{textAlign: "center"}}>Coming Soon</h2>
      </div>
    );
  }
}

EquipmentComponent.propTypes = {
  children: PropTypes.element,

};

export default EquipmentComponent;
