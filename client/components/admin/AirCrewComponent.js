import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { superAdmin, adminUser } from '../../dictionary/auth';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import { defaultFilter, formatDateTime, getConfirmation } from '../../util/helpers';

class AirCrewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }


  componentDidMount() {
    this.props.fetchFlightPersonnels();
  }

  render() {

    const { translations, allPersonnels } = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    const access = roles.some(v => adminUser.includes(v));

    // Set Columns and Data to display in the Table List
    const columns = [
      {
        Header: translations['First Name'],
        accessor: 'FirstName',
      },
      {
        Header: translations['Last Name'],
        accessor: 'LastName',
      },
      {
        Header: translations.Rank,
        accessor: 'Rank',
      },
      {
        Header: translations.MOS,
        accessor: 'MOS1Desc',
      },
      {
        Header: translations.Unit,
        accessor: 'unitDesc',
      },
      {
        Header: translations.DutyPosition,
        accessor: 'DutyPos1Desc',
      },
      {
        Header: translations.SpecialQuals,
        accessor: 'SpecQuals1',
      },

    ];

    return (access ? (
      <div>

        <div className="row orders-assets">
          <div className="col-md-12">
            <ReactTable
              data={allPersonnels}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.MIN_ROWS}
              loading={this.props.isLoading}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
      </div>) : null
    );
  }

}

AirCrewComponent.propTypes = {
  children: PropTypes.element,

};

export default AirCrewComponent;
