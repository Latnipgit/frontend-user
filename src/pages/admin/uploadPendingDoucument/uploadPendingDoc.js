import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setUploadPednigDocOpen, uploadUploadPednigDocID } from "../../../store/UploadPendingDocList/UploadPendingDocList.action"
import { selectUploadPendigDocOpen, uploadPendigDocSelector } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
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

import fileImg2 from '../../../assets/images/newImg/pdf.png'
import fileImg1 from '../../../assets/images/newImg/png-file-.png'

const UploadPendingDocModel = props => {
  const { isOpen, toggle, uploadFilesModelDataForUpload, selectType, submitCheck } = props
  const dispatch = useDispatch()
  const [uploadCAId, setuploadCAId] = useState('')
  const [uploadAdditionId, setuploadAdditionId] = useState('')
  const [warongText, setWarongText] = useState(false)
  const cuuretchek = 1

  const [docData, setDocData] = useState([
    {
      invoiceId: "",
      uploadpurchaseId: "",
      uploadChallanId: "",
      uploadInvoiceId: "",
      uploadTransportId: "",
    },
  ])


  /*  function handInvoiceID(value, currenIndex) {
     debugger
     const newData = [...docData]
 
     const payload = 
     newData[currenIndex].invoiceId = value
     setDocData(newData)
   } */



  /*   const uploadUploadPednigFile = useSelector(uploadUploadPednigDocID) */
  const handleFileChange = (event, fieldName, currenIndex) => {
    const files = event.target.files
    const formData = new FormData();
    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);
    uploadFile(formData, currenIndex)

  }

  function uploadFile(formData, currenIndex) {
    const token = sessionStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };
    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {

        if (response.data.response.fieldName == "invoiceDocument") {
          const newData = [...docData]
          newData[currenIndex].uploadInvoiceId = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "purchaseOrderDocument") {
          const newData = [...docData]
          newData[currenIndex].uploadpurchaseId = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "challanDocument") {
          const newData = [...docData]
          newData[currenIndex].uploadChallanId = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "transportationDocument") {
          const newData = [...docData]
          newData[currenIndex].uploadTransportId = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "cacertificate") {

          setuploadCAId(response.data.response)
        }
        if (response.data.response.fieldName == "additionaldocuments") {

          setuploadAdditionId(response.data.response)
        }
      })
      .catch((error) => {

      })
  }

  const handleSubmit = (item) => {
    debugger
    const payload = {
      "paymentId": "65aba5d07c7388ab35450afa",
      "type": selectType, // DEBTOR/CREDITOR
      // Below documents are required for type DEBTOR
      "debtorcacertificate": selectType == 'DEBTOR' ? uploadCAId.documentId : '',
      "debtoradditionaldocuments": selectType == 'DEBTOR' ? uploadAdditionId.documentId : '',
      // Below documents are required for type CREDITOR
      "creditorcacertificate": selectType == 'CREDITOR' ? uploadCAId.documentId : '',
      "creditoradditionaldocuments": selectType == 'CREDITOR' ? uploadAdditionId.documentId : '',
      "attachment": docData
    }
    let checkvalue = false
    docData.map((obj) => {
      checkvalue = Object.values(obj).includes('')
    })
    if (checkvalue) {
      setWarongText(true)
      return
    }
    const uploadCA = Object.keys(uploadCAId).length;
    const uploadAddition = Object.keys(uploadAdditionId).length;
    if (uploadCA < 0 || uploadAddition < 0) {
      setWarongText(true)
    }

    if (uploadCA > 0 && uploadAddition > 0) {
      toggle()
      submitCheck(true)
      dispatch(uploadUploadPednigDocID(payload))
    }

  }

  const createinvoiceObj = () => {
    uploadFilesModelDataForUpload.defaulterEntry.invoices.map((item, currenIndex, arr) => {
      if (currenIndex == 0) {
        const newData = [...docData]
        newData[currenIndex].invoiceId = item._id
        setDocData(newData)
      }

      if (currenIndex > 0) {
        setDocData([
          ...docData,
          {
            invoiceId: item._id,
            uploadpurchaseId: "",
            uploadChallanId: "",
            uploadInvoiceId: "",
            uploadTransportId: "",
          },
        ])
      }
    })
  }

  useEffect(() => {
    if (uploadFilesModelDataForUpload != '' && uploadFilesModelDataForUpload.defaulterEntry.invoices != undefined) {
      createinvoiceObj()
    }

  }, [cuuretchek])

  console.log('docData', docData);

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
        <ModalHeader toggle={toggle}>Upload Pending Files files</ModalHeader>

        <ModalBody>
          {uploadFilesModelDataForUpload != '' && uploadFilesModelDataForUpload.defaulterEntry.invoices != undefined ? uploadFilesModelDataForUpload.defaulterEntry.invoices.map((item, currenIndex) => {

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
                {selectType == 'CREDITOR' && (<>
                  {uploadFilesModelDataForUpload.documentsRequiredFromCreditor.map((value, indix) => {
                    return (value !== "cacertificate" && value !== "additionaldocuments" && (
                      <Col md={3} key={indix}>
                        <Row>
                          <Col md={12}>
                            <InputGroup className="text-capitalize">
                              <input
                                type="file"
                                className="form-control"
                                id={value}
                                accept=".pdf, .doc, .docx, .txt"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, value, currenIndex)
                                }
                              />
                            </InputGroup>
                            <b>{value == "purchaseOrderDocument" && ('Purchase Order Document')}
                              {value == "challanDocument" && ('Challan Document')}
                              {value == "invoiceDocument" && ('Invoice Document')}
                              {value == "transportationDocument" && ('Transportation Document')}
                            </b>
                          </Col>
                        </Row>
                      </Col>
                    )

                    )
                  })}</>)}

                {selectType == 'DEBTOR' && (<>
                  {uploadFilesModelDataForUpload.documentsRequiredFromDebtor.map((value, indix) => {
                    return <Col md={3} key={indix}>
                      <Row>
                        <Col md={12}>
                          <InputGroup className="text-capitalize">
                            <input
                              type="file"
                              className="form-control"
                              id={value}
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(e, value, currenIndex)
                              }
                            />
                          </InputGroup>
                          <b>{value == "purchaseOrderDocument" && ('Purchase Order Document')}
                            {value == "challanDocument" && ('Challan Document')}
                            {value == "invoiceDocument" && ('Invoice Document')}
                            {value == "transportationDocument" && ('Transportation Document')}
                            {value == "cacertificate" && ('CA Certificate Document')}
                            {value == "additionaldocuments" && ('Additional Document')}
                          </b>
                        </Col>
                      </Row>
                    </Col>
                  })}</>)}

              </Row>

            </Row>
          }) : ""}
          {selectType == 'CREDITOR' && (
            <Row className="bg-light p-3 mt-2">
              <Row className="mt-4">
                {selectType == 'CREDITOR' && (<>
                  {uploadFilesModelDataForUpload.documentsRequiredFromCreditor.map((value, indix) => {
                    return (
                      <>
                        {value == "cacertificate" || value == "additionaldocuments" ? (<Col md={3} key={value}>
                          <Row>
                            <Col md={12}>
                              <InputGroup className="text-capitalize">
                                <input
                                  type="file"
                                  className="form-control"
                                  id={value}
                                  accept=".pdf, .doc, .docx, .txt"
                                  aria-describedby="fileUploadHelp"
                                  onChange={e =>
                                    handleFileChange(e, value)
                                  }
                                />
                              </InputGroup>
                              <b>
                                {value == "cacertificate" && ('CA Certificate Document')}
                                {value == "additionaldocuments" && ('Additional Document')}
                              </b>
                            </Col>
                          </Row>
                        </Col>) : ""}
                      </>
                    )
                  })}</>)}
              </Row>
            </Row>
          )}

          <Row className="mt-3">
            <Col md={10} className="text-center mt-2">
              {warongText && <b className="text-danger ">Please Upload All Document</b>}

            </Col>
            <Col md={2} className="text-end">
              <Button className="btn btn-info" onClick={() => handleSubmit()}>Submit</Button>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  )
}









export const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);

UploadPendingDocModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadPendingDocModel
