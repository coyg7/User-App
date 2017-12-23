import React from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'react-bootstrap';
import { push } from 'react-router-redux';

import UserDelete from './UserDelete';
import UserListElement from './UserListElement';


class UserList extends React.Component {

  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  render() {
    //pagination
    const per_page = 10;
    const pages = Math.ceil(this.props.users.length / per_page);
    const current_page = this.props.page;
    const start_offset = (current_page - 1) * per_page;
    let start_count = 0;

    return (
      <div>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Job</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user, index) => {
              if (index >= start_offset && start_count < per_page) {
                start_count++;
                return (
                  <UserListElement key={user.id} user={user} />
                );
              }
            }
            )}
          </tbody>
        </Table>

        <Pagination className="users-pagination pull-right" bsSize="medium"
          maxButtons={10} first last next prev boundaryLinks
          items={pages} activePage={current_page} onSelect={this.changePage} />
        <UserDelete />
      </div>
    );
  }

  //change the users list current page
  changePage(page) {
    this.props.dispatch(push('/?page=' + page));
  }
}

function mapStateToProps(state) {
  return ({
    users: state.users.list,
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  });
}

export default connect(mapStateToProps)(UserList);