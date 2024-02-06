import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setCACertificateOpen, uploadCACertificateID } from "../../../store/debtors/debtors.actions"
import { selectCACertificateOpen, uploadCAcertificateSelector } from "store/debtors/debtors.selecter"
import axios from "axios"
import { recoredPaymentReportDefault } from "../../../store/debtors/debtors.actions"
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


export const MarkUploadCACertificate = props => {
  const { isOpen, toggle, invoiceId, setMarkCAupload, setIsOpenmark, selected } = props
  const dispatch = useDispatch();
  const selectCACertificate = useSelector(selectCACertificateOpen);
  const uploadCAcertificate = useSelector(uploadCAcertificateSelector);
  const toggleViewModal2 = () => setMarkCAupload(!isOpen);
  const [uploadedCertificate, setuploadedCertificate] = useState('')
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
        setuploadedCertificate(response.data.response)
      })
      .catch((error) => {

      })
  }

  const handleSubmit = () => {
    var size = Object.keys(uploadedCertificate).length;
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
        "debtorRemarks": '',

        // if disputing a transaction
        "isDispute": true, // make this flag as true whenever recording payment for a disputed transaction,
        "disputeType": "DISPUTE_TYPE2",// values = DISPUTE_TYPE1,DISPUTE_TYPE2, DISPUTE_TYPE3

        // if DISPUTE_TYPE1, DISPUTE_TYPE2 
        "debtorcacertificate": uploadedCertificate.documentId,
        "supportingDocuments": "",// this field stores the document id of "Upload CA Verified GST Input Credit Report"
      }

    ]
    if (size > 0) {
      dispatch(recoredPaymentReportDefault(payload[0]))
      toast.success("Record Payment Successfully")
      setuploadedCertificate('')
      toggle()
    }

  }

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xs"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
    >
      <div className="modal-content">
        <ModalHeader toggle={() => toggleViewModal2()}>Upload CA Verified GST Input Credit Report</ModalHeader>

        <ModalBody>
          <Row className="mt-4 mb-4">
            <Col md={3}></Col>
            <Col md={6}>


              <InputGroup className="text-capitalize">
                <input
                  type="file"
                  className="form-control"
                  id="uploadPurchaseOrder"
                  accept=".pdf, .png, .jpg, .jpeg"
                  aria-describedby="fileUploadHelp"
                  onChange={e =>
                    handleFileChange(e)
                  }
                />
              </InputGroup>
              <div id="fileUploadHelp" className="form-text">
                Choose a file to upload (PDF, PNG, JPG, JPEG).
              </div>
              {attachmentValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Upload CA Verified GST Input Credit Report</p>}
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
