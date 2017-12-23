import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class UserDelete extends React.Component {
  
  constructor(props) {
    super(props);

    this.modalDeleteHide = this.modalDeleteHide.bind(this);
    this.userDelete = this.userDelete.bind(this);
  }
  render() {
    return (
      <Modal show={this.props.modal_delete.show}>
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete <strong>{this.props.modal_delete.username}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.modalDeleteHide}>No</Button>
          <Button bsStyle="primary" onClick={this.userDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /**
   * Close the delete modal
   * @param  event 
   */
  modalDeleteHide(event) {
    this.props.dispatch({
      type: 'users.modalDeleteHide'
    });
  }

  /**
   * Delete the user
   */
  userDelete(event) {
    this.props.dispatch({
      type: 'users.delete',
      id: this.props.modal_delete.id,
    });

    this.props.dispatch({
      type: 'users.modalDeleteHide'
    });
  }
}


//export the connected class

function mapStateToProps(state) {
  //set the data for the user delete modal
  let modal_delete;
  if (state.users.modal && state.users.modal.list_delete) {
    modal_delete = state.users.modal.list_delete;
  } else {
    modal_delete = {
      show: false,
      id: 0,
      username: ''
    }
  }

  return {
    modal_delete: modal_delete,
  };
}
export default connect(mapStateToProps)(UserDelete);