import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,

  Table,
  Row,Col
} from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";


const confirmReportModal = props => {
  const { isOpen, toggle ,selected } = props

  
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle} 
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Confirm Report Defaulter</ModalHeader>
      
      <ModalBody className="bg-light">
 
<h5 className="text-center">Are You sure you want to Report Following Customer As a Defaulter ? </h5>
<br/>
 <p className="text-center"> <Input type="checkbox" /> &nbsp; &nbsp;All the Information Provided is Correct</p>

 <p className="text-center text-danger"> <i className='bx bx-error'></i> &nbsp; If found the provided information is wrong or incorrect legal action will be taken on the reporting party.</p>

      </ModalBody>
        <ModalFooter>
        <Row>
    <Col md={5}></Col>
    <Col md={2}>
    <Button className="text-center btn btn-info">Confirm</Button>

    </Col>
    <Col md={5}></Col>

 </Row>
        </ModalFooter>
      </div>
      <ToastContainer />

    </Modal>
  )
}

confirmReportModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default confirmReportModal
