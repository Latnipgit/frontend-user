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
 const handleSubmit =()=>{
  toast.success("Reported Defaulter successfully")

 }
  
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
<p>Confirming the report of the mentioned customer as a defaulter requires accurate information. Any inaccuracies may lead to legal action against the reporting party, impacting their credibility as a rater. </p>
 <p className="text-center"> <Input type="checkbox" /> &nbsp; &nbsp;By checking the checkbox, you accept full responsibility for consequences related to the rating and grant AnandRishi Technologies Pvt Ltd permission to post this information on social media on your behalf. You absolve AnandRishi Technologies Pvt Ltd from any legal or monetary consequences arising from such actions.</p>

 {/* <p className="text-center text-danger"> <i className='bx bx-error'></i> &nbsp; If found the provided information is wrong or incorrect legal action will be taken on the reporting party.</p> */}
      </ModalBody>
        <ModalFooter>
        <Row>
    <Col md={5}></Col>
    <Col md={2}>
    <Button className="text-center btn btn-info" onClick={()=>handleSubmit()}>Submit</Button>

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
