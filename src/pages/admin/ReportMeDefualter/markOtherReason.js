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
  textarea,
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
  const { isOpen, toggle, setIsOpenmark, selected } = props
  const dispatch = useDispatch()

  const [salutations, setsalutations] = useState([
    { label: "Cash", value: "Cash" },

    { label: "Bank Transfer", value: "Bank Transfer" },

  ])

  useEffect(() => {
    // dispatch()
  }, [])

  const [attachment, setAttachment] = useState('')
  const [textBox, setTextBox] = useState("")
  const [error, setError] = useState("")
  const [attachmentValid, setAttachmentValid] = useState(false)


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
        setAttachment(response.data.response)
        toast.success("File Upload Successfully")
      })
      .catch((error) => {

      })
  }


  const handleSubmit = () => {
    debugger
    var size = Object.keys(attachment).length;
    if (size > 0) {
      setAttachmentValid(false)
    } else {
      setAttachmentValid(true)
    }
    const payload = [
      {
        "defaulterEntryId": selected.id,
        "amtPaid": selected.totalAmount,
        "requestor": "DEBTOR", // CREDITOR/DEBTOR
        "paymentDate": '',
        "paymentMode": '',
        "attachments": [],
        "debtorRemarks": textBox,

        // if disputing a transaction
        "isDispute": true, // make this flag as true whenever recording payment for a disputed transaction,
        "disputeType": "DISPUTE_TYPE3",// values = DISPUTE_TYPE1,DISPUTE_TYPE2, DISPUTE_TYPE3

        // if DISPUTE_TYPE1, DISPUTE_TYPE2 
        "debtorcacertificate": ''// this field stores the document id of "Upload CA Verified GST Input Credit Report"
      }

    ]
    if (size > 0 && textBox.length <= 250) {
      // dispatch(recoredPaymentReportDefault(payload[0]))
      toast.success("Record Payment Successfully")
      setAttachment('')
      setTextBox('')
      toggle()
    }
  }

  const textBoxModule = (value) => {
    if (value.length > 250) {
      setError("Reached the limit 250 words")
    } else {
      setTextBox(value)
      setError("")
    }
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
            <Row>
              <Col className="selectionListss">
                <Col md={3}>
                  <div className="mb-2"><b className="mt-2">Your reason</b></div>
                </Col>
                <Col md={12}>
                  <div className="d-inline">

                    <Input
                      rows={7}
                      type="textarea"
                      id="customerEmail"
                      name="customerEmail"
                      value={textBox}
                      onChange={(e) => textBoxModule(e.target.value)}
                      placeholder="Mation your reason"
                    />
                  </div>
                  {error != "" ? <div className="text-danger mt-2">{error}</div> : ""}
                </Col>
              </Col>
              <Col className="selectionListss mb-2 mt-2">
                <Col md={8}>
                  <div className="mb-2"><b className="mt-2">Upload Supported Document File</b></div>
                </Col>
                <Col md={10} >
                  <div className="d-inline">
                    <label
                      className="visually-hidden custom-content"
                      htmlFor="customerSelect"
                    >
                      Select Customer
                    </label>
                    <InputGroup className="text-capitalize">
                      <input
                        type="file"
                        className="form-control"
                        id=""
                        accept=".pdf, .png, .jpg, .jpeg"
                        aria-describedby="fileUploadHelp"
                        onChange={e =>
                          handleFileChange(e, "")
                        }
                      />
                    </InputGroup>
                    {attachmentValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Upload Upload Supported Document File</p>}
                    <div id="fileUploadHelp" className="form-text">
                      Choose a file to upload (PDF, PNG, JPG, JPEG).
                    </div>
                    <p className="text-danger" style={{ fontSize: '11px' }}>Please upload all Documents in a single Pdf</p>
                  </div>
                </Col>
                <Col md={3}>
                </Col>
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

    </Modal >
  )
}

