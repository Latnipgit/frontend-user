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
  FormGroup,
  Form,
  Input,
  Label,
  Card,
  CardBody,
  textarea,
  Table,
  Row, Col
} from "reactstrap"
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { recoredPaymentReportDefault } from "../../../store/debtors/debtors.actions"

import Dropzone from "react-dropzone";

export const MarkOtherReasonModel = props => {
  const { isOpen, toggle, setIsOpenmark, selected, submitCheck } = props
  const dispatch = useDispatch()
  const [radioOption, setRadioOption] = useState("")
  const [selectedFiles, setselectedFiles] = useState([])

  const [salutations, setsalutations] = useState([
    { label: "Cash", value: "Cash" },

    { label: "Bank Transfer", value: "Bank Transfer" },

  ])

  useEffect(() => {
    // dispatch()
  }, [])
  function handleToggleItem(radio) {
    setRadioOption(radio)
}
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
    const token = sessionStorage.getItem("tokenemployeeRegister")
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
  function handleAcceptedFiles(files) {
    
    console.log("filesfilesfiles",files)
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    // setselectedFiles(selectedFiles,...files)
  // setselectedFiles(...selectedFiles,files)
  setselectedFiles(previous => [...previous, files])
  }


  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  const handleSubmit = () => {
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
        "debtorcacertificate": '',// this field stores the document id of "Upload CA Verified GST Input Credit Report"
        "supportingDocuments": attachment.documentId,
      }

    ]
    if (size > 0 && textBox.length <= 250) {
      dispatch(recoredPaymentReportDefault(payload[0]))
      setAttachment('')
      setTextBox('')
      submitCheck(true)
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

  const deleteFn = (val) => { // val result index of component and item array
    const assoc = [...selectedFiles];
    assoc.splice(val, 1);
    setselectedFiles(assoc);
  }

console.log("selectedFilesselectedFilesselectedFiles",selectedFiles)


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
            <FormGroup tag="fieldset">
                                        <FormGroup check className="mb-2">
                                            <Input
                                                // name="radio1"
                                                type="radio"
                                                onChange={() => handleToggleItem("radio1")}
                                            />
                                            {' '}
                                            <Label check>
                                            {/* Poor Quality of Product Recieve
                                             */}
                                             Goods received are of unferior quality
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check className="mb-2">
                                            <Input
                                                // name="radio1"
                                                type="radio"
                                                onChange={() => handleToggleItem("radio2")}
                                            />
                                            {' '}
                                            <Label check>
                                            Goods received in damage conditions
                                            </Label>
                                        </FormGroup>
                                        <FormGroup
                                            check
                                            className="mb-2"
                                        >
                                            <Input
                                                // name="radio1"
                                                type="radio"
                                                onChange={() => handleToggleItem("radio3")}
                                            />
                                            {' '}
                                            <Label check>
                                            {/* Quantity is less then Invoice Quantity */}
                                            Actual quantity received is lower than billed quantity
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
            </Row>
            <Row>
              <Col className="selectionListss">
                <Col md={3}>
                  <div className="mb-2"><b className="mt-2">Your reason</b></div>
                </Col>
                <Col md={10}>
                  <div className="d-inline">

                    <Input
                      rows={7}
                      type="textarea"
                      id="customerEmail"
                      name="customerEmail"
                      value={textBox}
                      onChange={(e) => textBoxModule(e.target.value)}
                      placeholder="Describe your Reason"
                      style={{height:"100px"}}
                    />
                  </div>
                  {error != "" ? <div className="text-danger mt-2">{error}</div> : ""}
                </Col>
              </Col>
             
            </Row>
            <Row>
               <Col className="selectionListss mb-2 mt-2">
                <Col md={8}>
                  <div className="mb-2"><b className="mt-2">Upload Supported Document File</b></div>
                </Col>
                <Col md={10} >
                  {/* <div className="d-inline">
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
                  </div> */}
                </Col>
                <Col md={3}>
                </Col>
              </Col>
            </Row>
            <Row>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>

                 
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    src={f[0].preview}
                                  />
                                </Col>
                             
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f[0].name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f[0].formattedSize}</strong>
                                  </p>
                                </Col>
                                <Col className=" text-end">
                                <button className="btn btn-info" type="button" onClick={() => deleteFn(i)}>
                                  Delete
                                </button>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
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

