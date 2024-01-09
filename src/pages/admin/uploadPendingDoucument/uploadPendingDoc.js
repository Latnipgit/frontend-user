import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setUploadPednigDocOpen, uploadUploadPednigDocID } from "../../../store/UploadPendingDocList/UploadPendingDocList.action"
import { selectUploadPendigDocOpen, uploadPendigDocSelector } from "store/UploadPendingDocList/UploadPendingDocList.selecter"

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
import { ToastContainer, toast } from "react-toastify"


const UploadPendingDocModel = props => {
  const { isOpen, toggle, invoiceId } = props
  const dispatch = useDispatch();
  const selectUploadDocOpen = useSelector(selectUploadPendigDocOpen);
  const uploadPendingDoccument = useSelector(uploadPendigDocSelector);
  console.log("invoiceIdinvoiceId", invoiceId)
  const toggleViewModal2 = () => dispatch(setUploadPednigDocOpen(!selectUploadDocOpen));
  const [uploadedCertificate, setuploadedCertificate] = useState('')

  const handleFileChange = (event) => {
    const files = event.target.files
    console.log("FILEEE", event.target.files)

    const formData = new FormData();

    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', "caCertificateDocument");


    uploadFile(formData)


  }







  function uploadFile(formData) {
    console.log("UPLOAD FILE", formData)
    const token = localStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };


    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        console.log("respo+++", response.data.response)
        setuploadedCertificate(response.data.response)
      })
      .catch((error) => {
        console.log("Response", error)

      })
  }

  const handleSubmit = () => {

    const payload = [{
      "caCertificateDocument": uploadedCertificate.documentId,
      "invoiceId": invoiceId,

    }]
    dispatch(uploadUploadPednigDocID(payload))
    toast.success("CA Certificate Updated")
    toggle()

  }

  return (
    <Modal
      isOpen={selectUploadDocOpen}
      role="dialog"
      size="xs"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
    >
      <div className="modal-content">
        <ModalHeader toggle={() => toggleViewModal2()}>Upload Pending Document</ModalHeader>

        <ModalBody>
          <Row className="mt-4 mb-4">
            <Col md={3}></Col>
            <Col md={6}>


              <InputGroup className="text-capitalize">
                <input
                  type="file"
                  className="form-control"
                  id="uploadPurchaseOrder"
                  accept=".pdf, .doc, .docx, .txt"
                  aria-describedby="fileUploadHelp"
                  onChange={e =>
                    handleFileChange(e)
                  }
                />
              </InputGroup>

              <div id="fileUploadHelp" className="form-text">
                Choose a file to upload (PDF, DOC, DOCX, TXT).
              </div>

              <Row className=" mt-3">
                <Col md={4}></Col>
                <Col md={4}>
                  <Button className="btn btn-info" onClick={() => handleSubmit()}>
                    Submit
                  </Button>

                </Col>
                <Col md={4}></Col>
              </Row>

            </Col>
            <Col md={3}></Col>
          </Row>

        </ModalBody>
      </div>
      <ToastContainer />
    </Modal>
  )
}

UploadPendingDocModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadPendingDocModel
