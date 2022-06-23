import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MessageModal = ({ show, message, handleClose }) => {
  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ message }</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={ handleClose }>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MessageModal.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  handleClose: PropTypes.func,
}

export default MessageModal;
