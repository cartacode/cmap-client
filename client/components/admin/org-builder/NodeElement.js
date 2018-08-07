import React from 'react';
import PropTypes from 'prop-types';

class NodeElement extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props;
    return (
      <div className={className}>
      
        <h1>{nodeData.name}<img src="/assets/img/admin/avatar.png" height="50" width="50"/></h1>
        <p>Rank: {nodeData.attributes.Rank} <br/>
           Unit : {nodeData.attributes.Unit} 
        </p>
        <div className="row">
          <div className="col-md-12">
            <a href="#">
              <span className="glyphicon glyphicon-plus-sign"/>
            </a>&nbsp;
            <a href="#">
              <span className="glyphicon glyphicon-edit"/>
            </a>&nbsp;
            <a href="#">
              <span className="glyphicon glyphicon-remove-sign"/>
            </a>
          </div>
        </div>
        {/*  {nodeData._children && 
        <button>{nodeData._collapsed ? 'Expand' : 'Collapse'}</button>
        }  */}
      </div>
    );
  }
}

NodeElement.propTypes = {
  className: PropTypes.any,
  nodeData: PropTypes.object,
};

export default NodeElement;
