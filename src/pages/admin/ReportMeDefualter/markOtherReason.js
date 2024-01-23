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
import 'react-datepicker/dist/react-datepicker.css';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { recoredPaymentReportDefault } from "../../../store/debtors/debtors.actions"



export const MarkOtherReasonModel = props => {
  const { isOpen, toggle } = props
  const dispatch = useDispatch()

  const [salutations, setsalutations] = useState([
    { label: "Cash", value: "Cash" },

    { label: "Bank Transfer", value: "Bank Transfer" },

  ])

  useEffect(() => {
    // dispatch()
  }, [])
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [payentMode, setPaymentMode] = useState('')
  const [attachment, setAttachment] = useState('')


  const handleFileChange = (event) => {
    const files = event.target.files
    const formData = new FormData();
    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', "");
    uploadFile(formData)
  }

  function uploadFile(formData) {
    const token = localStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };


    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        setAttachment(response.data.response / documentId)
        toast.success("File Upload Successfully")
      })
      .catch((error) => {

      })
  }

  const handleSubmit = () => {
    const payload = [
      {
        "defaulterEntryId": selected.id,
        "amtPaid": amount,
        "requestor": "CREDITOR", // CREDITOR/DEBTOR
        "paymentDate": date,
        "paymentMode": payentMode,
        "attachments": attachment.documentId,
        "isDispute": true // make this flag as true whenever recording payment for a disputed transaction
      }
    ]
    //  dispatch(recoredPaymentReportDefault(payload[0]))
    toast.success("Record Payment Successfully")
    toggle()
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
        <ModalHeader toggle={toggle}>Other Reasons</ModalHeader>
        <ModalBody>
          <form>
            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Mation your reason</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">

                  <Input
                    type="textarea"
                    id="customerEmail"
                    name="customerEmail"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Mation your reason"
                  />

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>
            <Row className="selectionListss mb-2 mt-2">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Disputed Transaction</b></div>
              </Col>
              <Col md={5} >
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>
                  <div className=" mb-2">
                    <b> Upload Supported Document File</b>
                  </div>
                  <InputGroup className="text-capitalize">
                    <input
                      type="file"
                      className="form-control"
                      id=""
                      accept=".pdf, .doc, .docx, .txt"
                      aria-describedby="fileUploadHelp"
                      onChange={e =>
                        handleFileChange(e, "")
                      }
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col md={3}>
              </Col>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={() => handleSubmit(true)}>
            Submit
          </Button>

          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
      <ToastContainer />

    </Modal>
  )
}

