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
import Select from "react-select"
import moment from "moment"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { recoredPaymentReportDefault } from "../../../store/debtors/debtors.actions"
import { recordPaymentReportDefaulter } from "store/debtors/debtors.selecter"


const ReportedDefaulterModel = props => {
  const [selectedOption, setSelectedOption] = useState("")

  const [isProceed, setisProceed] = useState(false)
  const { isOpen, toggle, selected, } = props
  const dispatch = useDispatch()
  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }
  const Recordedpyment = useSelector(recordPaymentReportDefaulter)
  const checkboxStyle = {
    border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
    borderRadius: '4px', // Optional: Add rounded corners for a nicer look
    padding: '5px', // Optional: Add padding to the checkbox
    marginRight: '5px', // Optional: Add some spacing between the checkbox and label
  };
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
  const [attachment, setAttachment] = useState({})
  const [remark, setRemark] = useState('')

  const [amountValid, setAmountValid] = useState(false)
  const [payMentDateValid, setpayMentDateValid] = useState(false)
  const [payMentModeValid, setpayMentModeValid] = useState(false)
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
    if (amount.length > 0) {
      setAmountValid(false)
    } else {
      setAmountValid(true)
    }

    if (date.length > 0) {
      setpayMentDateValid(false)
    } else {
      setpayMentDateValid(true)
    }

    if (payentMode.length > 0) {
      setpayMentModeValid(false)
    } else {
      setpayMentModeValid(true)
    }

    if (size > 0) {
      setAttachmentValid(false)
    } else {
      setAttachmentValid(true)
    }

    const payload = [
      {
        "defaulterEntryId": selected.id,
        "amtPaid": amount,
        "requestor": "CREDITOR", // CREDITOR/DEBTOR
        "paymentDate": date,
        "paymentMode": payentMode,
        "attachments": [attachment.documentId],
        "debtorRemarks": remark,

        // if disputing a transaction
        "isDispute": false, // make this flag as true whenever recording payment for a disputed transaction,
        "disputeType": "" // values = DISPUTE_TYPE1,DISPUTE_TYPE2, DISPUTE_TYPE3
      }

    ]
    if (amount !== '' && date !== '' && payentMode !== '' && attachment !== '') {
      // dispatch(recoredPaymentReportDefault(payload[0]))
      toast.success("Record Payment Successfully")
      toggle()
    }
    // dispatch(recoredPaymentReportDefault(payload[0]))

  }
  const handleDateChange = (value) => {
    const Dates = moment(value).format("YYYY-MM-DD")
    setDate(Dates)
  };
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
        <ModalHeader toggle={toggle}>Record A Payment</ModalHeader>

        <ModalBody>

          <form>
            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Seller Name*</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Customer Name
                  </label>
                  <Input
                    type="text"
                    id="customerEmail"
                    name="customerEmail"
                    value={selected.creditor != undefined ? selected.creditor.companyName : ""}
                    disabled


                    placeholder="Amount Recieved"
                  />
                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>

            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Amount*</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  <Input
                    type="number"
                    id="customerEmail"
                    name="customerEmail"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount Paid"
                  />
                  {amountValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Enter Amount</p>}

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>
            <Row style={{ marginTop: "-5px" }}>
              <Col md={3}>
              </Col>
              <Col md={5}>
                <div className="d-inline">

                  <Input type="checkbox" className="" style={checkboxStyle} onClick={() => setAmount(selected.totalAmount)} />

                  <span>Full amount ({selected.totalAmount})</span>
                </div>
              </Col>
              <Col md={3}>

              </Col>
            </Row>

            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Payment Date*</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  <DatePicker
                    selected={new Date()}
                    value={date}
                    onChange={(date) =>
                      handleDateChange(date)
                    }

                    dateFormat="dd-MMM-yyyy" // Format to display year, month, and day
                    className="form-control custom-content"

                  />
                </div>
                {payMentDateValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Select Payment Date</p>}

              </Col>
              <Col md={3}>

              </Col>

            </Row>

            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Payment Mode*</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  <Select
                    id="primaryContact"
                    className="custom-content"
                    options={salutations}
                    styles={colourStyles}
                    onChange={selected => setPaymentMode(selected.value)}
                    placeholder="Cash"
                  />
                  {payMentModeValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Select Payment Mode</p>}

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>



            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Attachment*</b></div>
              </Col>
              <Col md={5}>
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
                      accept=".pdf, .doc, .docx, .txt"
                      aria-describedby="fileUploadHelp"
                      onChange={e =>
                        handleFileChange(e, "")
                      }
                    />
                  </InputGroup>
                  {attachmentValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Upload Attachment</p>}
                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>


            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Remarks</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">

                  <Input
                    type="textarea"
                    id="customerEmail"
                    name="customerEmail"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Remarks"
                  />

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

ReportedDefaulterModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDefaulterModel
