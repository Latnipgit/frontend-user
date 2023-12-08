import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,

  Table,
  Row, Col
} from "reactstrap"


const NewpaaymentModal = props => {
  const { isOpen, toggle,  } = props
const handleFileChange = ()=>{

}

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="md"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Upload CA Certificate</ModalHeader>

        <ModalBody>
      <Row className="mt-4 mb-4">
    
      </Row>

        </ModalBody>
        </div>
    </Modal>
  )
}

NewpaaymentModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default NewpaaymentModal
