import React from 'react';
import PropTypes from 'prop-types';

class NodeElement extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props;
    return (
      <div className={className}>
        <div className="element-bg">
        <img className="img-valign" src={nodeData.unitLogo} height="55" width="55"/>
          <div className="text-1">{nodeData.UnitName} <br/>
       
       {nodeData.type === "Personnel" ?  (<span><span className="rank-text">{nodeData.attributes.Rank}</span> <br/>
       <span className="unit-text"> {nodeData.attributes.Unit}</span></span>) : (<span> <br/>
       <span className="unit-text"> {nodeData.Location}</span> <br/> </span>) }
          
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
              <span className="glyphicon glyphicon-plus-sign" onClick={this.props.check}/>
            &nbsp;
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
