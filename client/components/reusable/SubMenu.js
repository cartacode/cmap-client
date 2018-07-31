import React from 'react';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom';

class SubMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
                let itemurl="/admin/payloads";
        return (
            <ul className="sub-list">
                <li className="submenu ">
                <a href={this.props.link}>Inventory</a>
                </li>
                <li className="submenu ">
                <a href={this.props.link+'spec'}>Specifications</a>
                </li>
            </ul>
        );
    }
}

SubMenu.propTypes = {
    children: PropTypes.element,

};

export default SubMenu;
