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
  Row, Col
} from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import './style.css'
import { useSelector, useDispatch } from "react-redux"
import moment from "moment";
import { addInvoiceReportDefaulterInvoice } from "../../../store/debtors/debtors.actions"
import { addInvoiceReportDefaulterSelector } from "store/debtors/debtors.selecter"
const confirmReportModal = props => {
  const { isOpen, toggle, filteredCustomerDetail, feedbackdataPaylod, allInvoiceLists, ratingValue } = props
  const handleSubmit = () => {
    handleSubmitInvoice()
    toast.success("Reported Defaulter successfully")
    /*     toggle() */
    const timer = setInterval(() => {
      window.location.reload()
      toggle()
      return () => clearInterval(timer)
    }, 1000);
    // window.location.reload()

  }

  const checkboxStyle = {
    border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
    borderRadius: '4px', // Optional: Add rounded corners for a nicer look
    padding: '5px', // Optional: Add padding to the checkbox
    marginRight: '5px', // Optional: Add some spacing between the checkbox and label
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const addInvoiceReportDefaulter = useSelector(addInvoiceReportDefaulterSelector)
  const dispatch = useDispatch()


  const handleSubmitInvoice = () => {
    const payload =

    {
      "invoicesList": allInvoiceLists != undefined ? allInvoiceLists : [],
      "status": "PENDING"
    }


    dispatch(addInvoiceReportDefaulterInvoice(payload))

  }



  const handleDraftInvoice = () => {



    const payload =

    {
      "invoicesList": allInvoiceLists != undefined ? allInvoiceLists : [],
      "status": "DRAFT"
    }


    dispatch(addInvoiceReportDefaulterInvoice(payload))


  }

  useEffect(() => {

  }, [])
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
          <br />
          <p>Confirming the report of the mentioned customer as a defaulter requires accurate information. Any inaccuracies may lead to legal action against the reporting party, impacting their credibility as a rater. </p>
          <p className="text-center">
            {/* <Input type="checkbox" className="checkForConfirm" style={checkboxStyle} onChange={()=>handleChecked()}/>  */}
            <Input
              type="checkbox"
              // checked={isChecked}
              onChange={() => handleCheckboxChange()}
              className="checkForConfirm"
              style={checkboxStyle}
            />
            &nbsp; &nbsp;By checking the checkbox, you accept full responsibility for consequences related to the rating and grant AnandRishi Technologies Pvt Ltd permission to post this information on social media on your behalf. You absolve AnandRishi Technologies Pvt Ltd from any legal or monetary consequences arising from such actions.</p>

          {/* <p className="text-center text-danger"> <i className='bx bx-error'></i> &nbsp; If found the provided information is wrong or incorrect legal action will be taken on the reporting party.</p> */}
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col md={7}>
              <Button className="text-center btn btn-secondary" onClick={() => handleDraftInvoice()}>Save as Draft</Button>

            </Col>
            <Col md={2}>
              <Button className="text-center btn btn-info" onClick={() => handleSubmit()}
                disabled={!isChecked}    >Submit</Button>

            </Col>
            <Col md={3}></Col>

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
