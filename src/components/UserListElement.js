import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class UserListElement extends React.Component {
  constructor(props) {
    super(props);

    //bind <this> to the event methods
    this.modalDeleteShow = this.modalDeleteShow.bind(this);
  }
  render() {
    const user = this.props.user;
    return (
      <tr key={user.id}>
        <td>#{user.id}</td>
        <td>{user.username}</td>
        <td>{user.job}</td>
        <td>
          <Link to={'/user-edit/' + user.id}>
            <Button bsSize="small">
              Edit <Glyphicon glyph="edit"/>
            </Button>
          </Link>
        </td>
        <td>
          <Button bsSize="small" data-id={user.id} data-username={user.username} onClick={this.modalDeleteShow}>
            Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>
    );
  }
  /**
   * Prompt to delete the user
   */
  

  modalDeleteShow(event) {
    const user_id = Number(event.target.dataset.id);
    const username = event.target.dataset.username;
    this.props.dispatch({
      type: 'users.modalDeleteShow',
      id: user_id,
      username: username
    })
  }
}

//export the connected class
export default connect() (UserListElement);