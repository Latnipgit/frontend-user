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
    toast.success("Invoice submited")

    window.location.reload()


  }



  const handleDraftInvoice = () => {



    const payload =

    {
      "invoicesList": allInvoiceLists != undefined ? allInvoiceLists : [],
      "status": "DRAFT"
    }


    dispatch(addInvoiceReportDefaulterInvoice(payload))
    toast.success("Invoice save as Draft")

    window.location.reload()


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
        <ModalHeader toggle={toggle}>Confirm Report On Defaulter</ModalHeader>

        <ModalBody className="bg-light">

          <h5 className="text-center">Are You sure you want to Report Following Customer As a Defaulter ? </h5>
          <br />
          {/*           <p>Confirming the report of the mentioned customer as a defaulter requires accurate information. Any inaccuracies may lead to legal action against the reporting party, impacting their credibility as a rater. </p> */}
          <p className="text-left" style={{ fontSize: "16px" }}>
            {/* <Input type="checkbox" className="checkForConfirm" style={checkboxStyle} onChange={()=>handleChecked()}/>  */}
            <Input
              type="checkbox"
              // checked={isChecked}
              onChange={() => handleCheckboxChange()}
              className="checkForConfirm"
              style={checkboxStyle}
            />
            &nbsp; &nbsp;  <span style={{ fontWeight: "500" }}>By Checking This Box, You Confirm That :</span>
            <p style={{ fontSize: "14px" }}>    - All information provided by you is correct to the best of your knowledge. <br />
              - You accept full responsibility for any incorrect information provided by you. Any incorrect information provided by you can Cause you to be permanently banned from this platform.<br />
              - You understand that incorrect information provided by you can lead to legal action against you.<br />
              - You will not use this platform with malicious intent to defame a third party.<br />
              - You authorize Anand Rishi Technologies Private Limited to use the information provided by you freely, including posting on social media on your behalf and using it as deemed fit.<br />
              - You absolve Anand Rishi Technologies Private Limited of any legal or monetary consequences regarding any information posted by them on the internet on your behalf.</p>
          </p>
          {/* <p className="text-center text-danger"> <i className='bx bx-error'></i> &nbsp; If found the provided information is wrong or incorrect legal action will be taken on the reporting party.</p> */}
        </ModalBody>
        <ModalFooter>
          <Button className="text-center btn btn-secondary " onClick={() => handleDraftInvoice()}>Save as Draft</Button>
          <Button className="text-center btn btn-info" onClick={() => handleSubmit()}
            disabled={!isChecked}    >Submit</Button>
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
