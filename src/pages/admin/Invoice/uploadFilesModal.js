import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';

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
import { updatePendingDocumentss } from "../../../store/debtors/debtors.actions"
import { updatePendingDocsSelector } from "store/debtors/debtors.selecter"
import { useSelector, useDispatch } from "react-redux"
import fileImg2 from '../../../assets/images/newImg/pdf.png'
import fileImg1 from '../../../assets/images/newImg/png-file-.png'

const UploadPendingFiles = props => {
  const { isOpen, toggle, uploadFilesModelDataForUpload } = props
  const [uploadTransportId, setuploadTransportId] = useState('')
  const [uploadpurchaseId, setuploadpurchaseId] = useState('')
  const [uploadInvoiceId, setuploadInvoiceId] = useState('')
  const [uploadChallanId, setuploadChallanId] = useState('')
  const updatePendingDocs = useSelector(updatePendingDocsSelector)


  const handleFileChange = (event, fieldName, index) => {
    const files = event.target.files

    const formData = new FormData();

    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);


    uploadFile(formData, index)


  }







  function uploadFile(formData, index) {
    const token = localStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };


    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        // toast.success("file upload successfully")
        if (response.data.response.fieldName == "uploadInvoice") {
          setuploadInvoiceId(response.data.response)



        }
        if (response.data.response.fieldName == "uploadPurchaseOrder") {
          setuploadpurchaseId(response.data.response)

        }
        if (response.data.response.fieldName == "uploadchallanDispatchDocument") {
          setuploadChallanId(response.data.response)

        }
        if (response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`") {
          setuploadTransportId(response.data.response)

        }
      })
      .catch((error) => {

      })
  }

  const dispatch = useDispatch()

  const handleSubmit = (item) => {

    const payload = {
      "invoiceId": item.invoiceNumber,
      "purchaseOrderDocument": uploadpurchaseId == "" ? uploadpurchaseId : item.purchaseOrderDocument._id,
      "challanDocument": uploadChallanId == "" ? uploadChallanId : item.challanDocument._id,
      "invoiceDocument": uploadInvoiceId == "" ? uploadInvoiceId : item.invoiceDocument._id,
      "transportationDocument": uploadTransportId == "" ? uploadTransportId : item.transportationDocument._id
    }

    dispatch(updatePendingDocumentss(payload))
  }
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Upload Pending Files</ModalHeader>

        <ModalBody>

          {uploadFilesModelDataForUpload != undefined && uploadFilesModelDataForUpload.invoices != undefined ? uploadFilesModelDataForUpload.invoices.map((item) => {
            return <Row className="bg-light p-3 mt-2" key={item}>
              <Row>
                <Col md={3}><strong>Invoice Number : {item.invoiceNumber}</strong></Col>
                <Col md={3}><strong>Due Date : {moment(item.dueDate).format("DD-MM-YYYY")}</strong></Col>
                <Col md={4}><strong className="d-flex">Due Amount :
                  <CurrencyFormat value={item.remainingAmount.toFixed(1)} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

                </strong></Col>
                <Col md={2}>

                </Col>

              </Row>


              <Row className="mt-4">
                {
                  item.invoiceDocument == "" ? <Col md={3}>
                    <Row>

                      <Col md={12}>

                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadInvoice"
                            accept=".pdf, .doc, .docx, .txt"
                            aria-describedby="fileUploadHelp"
                            onChange={e =>
                              handleFileChange(e, "uploadInvoice")
                            }
                          />
                        </InputGroup>
                        <b>Invoice Document</b>

                      </Col>
                    </Row>

                  </Col>
                    :
                    <Col md={3} className="text-center">
                      <a href={item.invoiceDocument.url} rel='noreferrer' target='_blank'>
                        {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                        <img src={fileImg1} className="iconsImage" />


                      </a>
                      <br />
                      <b>Invoice Documnet</b>
                    </Col>
                }


                {item.challanDocument == "" ?
                  <Col md={3}>
                    <Row>

                      <Col md={12} className="pt-4">

                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, .docx, .txt"
                            aria-describedby="uploadchallanDispatchDocument"
                            onChange={e =>
                              handleFileChange(e, "uploadchallanDispatchDocument")
                            }
                          />
                        </InputGroup>
                        <b>Dispatch Document</b>



                      </Col>
                    </Row>

                  </Col>
                  :

                  <Col md={3} className="text-center">
                    <a href={item.challanDocument.url} rel='noreferrer' target='_blank' className="">
                      {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                      <img src={fileImg2} className="iconsImage shadow" />


                    </a>
                    <br />
                    <b>Challan</b>
                  </Col>
                }

                {item.transportationDocument == "" ?


                  <Col md={3}>
                    <Row>
                      <Col md={12}>
                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, .docx, .txt"
                            aria-describedby="uploadTransportationDocumentDeliveryReceipt~`"
                            onChange={e =>
                              handleFileChange(e, "uploadTransportationDocumentDeliveryReceipt~`")
                            }
                          />
                        </InputGroup>
                        <b>Transportation Document</b>

                      </Col>
                    </Row>

                  </Col>
                  :
                  <Col md={3} className="text-center">
                    <a href={item.transportationDocument.url} rel='noreferrer' target='_blank'>
                      {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                      <img src={fileImg2} className="iconsImage shadow" />


                    </a>
                    <br />
                    <b>Transportation Documnet</b>
                  </Col>

                }

                {item.purchaseOrderDocument == "" ?


                  <Col md={3}>
                    <Row>
                      <Col md={12}>
                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, .docx, .txt"
                            aria-describedby="uploadPurchaseOrder"
                            onChange={e =>
                              handleFileChange(e, "uploadPurchaseOrder")
                            }
                          />
                        </InputGroup>
                        <b>Purchase Order</b>

                      </Col>
                    </Row>

                  </Col>
                  :
                  <Col md={3} className="text-center">
                    <a href={item.purchaseOrderDocument.url} rel='noreferrer' target='_blank'>
                      {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                      <img src={fileImg2} className="iconsImage shadow" />


                    </a>
                    <br />
                    <b>Purchase Order</b>
                  </Col>
                }
              </Row>


              <Row className="mt-3">
                <Col md={10}></Col>
                <Col md={2} className="text-end">
                  <Button className="btn btn-info" onClick={() => handleSubmit(item)}>Submit</Button>

                </Col>
              </Row>
            </Row>
          }) : ""}






          <Row className="mt-3">
            <h5>Upload Additional Documents</h5>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>

                <InputGroup className="text-capitalize">
                  <input
                    type="file"
                    className="form-control"
                    id="uploadInvoice"
                    accept=".pdf, .doc, .docx, .txt"
                    aria-describedby="fileUploadHelp"
                    onChange={e =>
                      handleFileChange(e, "generalDocumnet")
                    }
                  />
                </InputGroup>

              </Col>
              <Col md={4}></Col>
            </Row>
          </Row>


        </ModalBody>
      </div>
    </Modal>
  )
}

UploadPendingFiles.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadPendingFiles
