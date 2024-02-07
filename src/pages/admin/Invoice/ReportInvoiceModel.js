import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import './style.css'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,
  Row, Col
} from "reactstrap"
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import { addCustomerlist } from "../../../store/actions"
import ReportedDebtorsModel from "./ReportedModel"

import { useEffect } from "react";
import { getAllDebtors } from '../../../store/debtors/debtors.actions'
import CurrencyFormat from 'react-currency-format';
import Select from "react-select"
import * as moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmReportModal from "./ConfirmReportDefaulterModal";
import { selectDebtorsList } from "store/debtors/debtors.selecter";
import { setIsCustomerFeedbackModalOpen, addInvoiceArray, } from "../../../store/debtors/debtors.actions"
import { selectFeedbackModalOpen, addInvoiceReportDebtorSelector, } from "store/debtors/debtors.selecter"
import { addInvoiceBillSuccess } from '../../../store/actions'
import { AddcustomerFomr } from "../AddCustomer/addCustomerForm";

import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter";
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";
// import { hover } from "@testing-library/user-event/dist/types/convenience";
// import '../../../pages/Dashboard/users/send-bill-transaction/sendbilltransaction.scss'
const ReportedDefaulterModel = props => {
  const [selectedOption, setSelectedOption] = useState("")
  const { isOpen, toggle, GetAllInvoice } = props
  const [filteredInvoiceList, setfilteredInvoiceList] = useState([])
  const [debtorIdArrayForPreview, setdebtorIdArrayForPreview] = useState([])
  const isCustomerFeedbackModalOpen = useSelector(selectFeedbackModalOpen)
  const toggleViewModal1 = () => dispatch(setIsCustomerFeedbackModalOpen(!selectFeedbackModalOpen));



  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));


  const customStyles = {

    control: (provided, state) => ({
      ...provided,
      background: "#FAFAFA",
      width: "300px",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? " #4da6ff" : " #80d4ff",
      // Removes weird border around container  
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? " #4da6ff" : " #80d4ff"
      }
    }),
    option: (provided, state) => ({

      // Your custom option styles here
      backgroundColor: state.isFocused ? '#80bfff' : '#FAFAFA',
      ':hover': {
        backgroundColor: '#80bfff', // Change background color on hover
      },


      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 2
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 2,
        margin: 2
      })
    }),
    // Add more styles as needed for other parts of the Select component
  };

  const GetAllDebtors = useSelector(selectDebtorsList)
  const dispatch = useDispatch()
  const handleInputChange = inputValue => {
    // Handle input change here
  }
  const [totalValue, settotalValue] = useState([])
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const handleConfirmClose = () => setshowConfirmModal(false)
  const handleConfirmshow = () => setshowConfirmModal(true)

  function getDebtrosLists(responsData) {
    return (responsData && (
      responsData.map((item) => {
        return (
          {
            "value": item.id, "label": item.firstname + " " + item.lastname + ", " + item.companyName,
          }

        )
      })
    )
    )
  }

  const getDebtrosList = getDebtrosLists(GetAllDebtors)



  useEffect(() => {
    dispatch(getAllDebtors());
    dispatch(addInvoiceBillSuccess())
  }, [])


  const [uploadTransportId, setuploadTransportId] = useState('')
  const [uploadpurchaseId, setuploadpurchaseId] = useState('')
  const [uploadInvoiceId, setuploadInvoiceId] = useState('')
  const [uploadChallanId, setuploadChallanId] = useState('')
  const [allInvoiceList, setallInvoiceList] = useState([])
  const [filteredCustomerDetail, setfilteredCustomerDetail] = useState([])
  const [isChangedCustomername, setisChangedCustomername] = useState(false)
  const [faqsRow, setFaqsRow] = useState(1)
  const [currenIndex, setCurrentIndex] = useState(0)
  const [isDisabled, setisDisabled] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [total, setTotal] = useState(0)

  const invoiceStateValue = allInvoiceList

  const [data, setData] = useState([
    {
      itemDetail: "",
      date: "",
      amount: "",
      invoiceDocument: "",
      DispatchDocument: "",
      DeliveryDocument: "",
      generalDocuments: "",
      purchaseOrderDocument: "",
      GSTDocument: ""

    },
  ])


  const submitInvoice = (setvalu) => {
    debugger
    calculateSubtotal(data)
    const date = moment()
    const dummy =
    {
      "debtorId": selectedOption.value,
      "billDate": date.format("YYYY-MM-DD"),
      "billDescription": "Bill for things",
      "billNumber": "",
      "creditAmount": total.toFixed(1),
      "remainingAmount": total.toFixed(1),
      "status": "OPEN",
      "interestRate": "",
      "creditLimitDays": "",
      "remark": "",
      "items": [],
      "subTotal": data[setvalu].amount != undefined ? data[setvalu].amount : '',
      "tax": "",

      "referenceNumber": '',
      "invoiceNumber": data[setvalu].itemDetail != undefined ? data[setvalu].itemDetail : '',
      "dueDate": data[setvalu].date === "" || data[setvalu].date === undefined ? date.format("YYYY-MM-DD") : moment(data[setvalu].date).format("YYYY-MM-DD"),
      "percentage": "",

      "purchaseOrderDocument": data[setvalu].purchaseOrderDocument != '' && data[setvalu].purchaseOrderDocument != undefined ? data[setvalu].purchaseOrderDocument.documentId : '',
      "challanDocument": data[setvalu].DispatchDocument != '' && data[setvalu].DispatchDocument != undefined ? data[setvalu].DispatchDocument.documentId : '',
      "invoiceDocument": data[setvalu].invoiceDocument != '' && data[setvalu].invoiceDocument != undefined ? data[setvalu].invoiceDocument.documentId : '',
      "transportationDocument": data[setvalu].DeliveryDocument != '' && data[setvalu].DeliveryDocument != undefined ? data[setvalu].DeliveryDocument.documentId : '',
    }

    if (allInvoiceList.length > 0) {
      let findIdex = allInvoiceList.findIndex((x, i) => x.invoiceNumber == data[setvalu].itemDetail)
      if (findIdex != -1) {
        allInvoiceList[findIdex] = {
          "debtorId": selectedOption.value,
          "billDate": date.format("YYYY-MM-DD"),
          "billDescription": "Bill for things",
          "billNumber": "",
          "creditAmount": total.toFixed(1),
          "remainingAmount": total.toFixed(1),
          "status": "OPEN",
          "interestRate": "",
          "creditLimitDays": "",
          "remark": "",
          "items": [],
          "subTotal": data[findIdex].amount,
          "tax": "",

          "referenceNumber": '',
          "invoiceNumber": data[findIdex].itemDetail,
          "dueDate": data[setvalu].date === "" ? date.format("YYYY-MM-DD") : moment(data[setvalu].date).format("YYYY-MM-DD"),
          "percentage": "",

          "purchaseOrderDocument": data[findIdex].purchaseOrderDocument != '' && data[findIdex].purchaseOrderDocument != undefined ? data[findIdex].purchaseOrderDocument.documentId : '',
          "challanDocument": data[findIdex].DispatchDocument != '' && data[findIdex].DispatchDocument != undefined ? data[findIdex].DispatchDocument.documentId : '',
          "invoiceDocument": data[findIdex].invoiceDocument != '' && data[findIdex].invoiceDocument != undefined ? data[findIdex].invoiceDocument.documentId : '',
          "transportationDocument": data[findIdex].DeliveryDocument != '' && data[findIdex].DeliveryDocument != undefined ? data[findIdex].DeliveryDocument.documentId : '',
        }
      } else {
        if (data[setvalu].amount != "" && data[setvalu].invoiceDocument != "" && data[setvalu].itemDetail != "" && data[setvalu].amount != undefined && data[setvalu].invoiceDocument != undefined && data[setvalu].itemDetail != undefined) {
          setallInvoiceList((items) => [...items, dummy])
          setisDisabled(false)
          toast.success("Invoice Add Successfully")
        }
        else {
          toast.error("Please Fill All Required Fields")

          // dispatch(addInvoiceReportDebtor(dummy))

        }
      }
    } else {
      if (data[setvalu].amount != "" && data[setvalu].invoiceDocument != "" && data[setvalu].itemDetail != "" && data[setvalu].amount != undefined && data[setvalu].invoiceDocument != undefined && data[setvalu].itemDetail != undefined) {
        setallInvoiceList((items) => [...items, dummy])
        setisDisabled(false)
        toast.success("Invoice Add Successfully")
      }
      else {
        toast.error("Please Fill All Required Fields")

        // dispatch(addInvoiceReportDebtor(dummy))

      }
    }



  }



  const TotalDebtorPayment = (item) => {
    if (item != undefined) {
      settotalValue(item.remainingAmount)

    }
  }
  const handleFilterInvoiceList = (item) => {
    var filteredArrays = []
    filteredArrays = GetAllInvoice.filter(value => value.debtorId == item.value)
    if (filteredArrays[0] != undefined) {
      setfilteredInvoiceList([filteredArrays[0]])

    }
    else {

      setfilteredInvoiceList(undefined)

    }
  }


  const handleSelectCustomer = (item) => {

    setisChangedCustomername(true)
    settotalValue([])
    setSelectedOption(item)

    var filteredArray = []
    filteredArray = GetAllDebtors.filter((value) => value.id == item.value)
    setfilteredCustomerDetail(filteredArray[0])

    handleFilterInvoiceList(item)
  }


  const handleItemDetailChange = (index, value) => {
    setCurrentIndex(index)
    const newData = [...data]
    newData[index].itemDetail = value
    setData(newData)
  }
  const handleAmountChange = (index, value) => {

    const newData = [...data]
    newData[index].amount = value

    const amount = parseFloat(newData[index].amount)

    if (!isNaN(amount)) {
      newData[index].amount = (amount).toFixed(2)
    } else {
      newData[index].amount = ""
    }

    setData(newData)
  }

  const addFaqsRow = () => {

    // Check if any of the previous row's fields are empty
    const lastIndex = data.length - 1
    const lastRow = data[lastIndex]

    if (
      lastRow.itemDetail === "" ||
      lastRow.date === "" ||
      lastRow.amount === ""
    ) {
      setTimeout(() => {
      }, 3000)
      // Exit without adding a new row
    }


    setFaqsRow(faqsRow + 1)
    setData([
      ...data,
      {
        itemDetail: "",
        date: "",
        amount: 0,
      },
    ])
  }
  const handleFeedbackModal = () => {
    dispatch(addInvoiceArray(debtorIdArrayForPreview))
    dispatch(setIsCustomerFeedbackModalOpen(!isCustomerFeedbackModalOpen))

  }
  const removeFaqsRow = index => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
    setFaqsRow(faqsRow - 1)
  }
  const handleDateChange = (value, index) => {
    const newData = [...data]
    newData[index].date = moment(value).format("YYYY-MM-DD")
    setData(newData)
    setSelectedDate(value)
  };

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
        /* toast.success("file upload successfully") */
        setisDisabled(false)
        if (response.data.response.fieldName == "uploadInvoice") {
          setuploadInvoiceId(response.data.response)
          const newData = [...data]
          newData[index].invoiceDocument = response.data.response
          setData(newData)


        }
        if (response.data.response.fieldName == "uploadPurchaseOrder") {
          // setuploadpurchaseId(response.data.response)
          const newData = [...data]
          newData[index].purchaseOrderDocument = response.data.response
          setData(newData)
        }
        if (response.data.response.fieldName == "uploadchallanDispatchDocument") {
          // setuploadChallanId(response.data.response)
          const newData = [...data]
          newData[index].DispatchDocument = response.data.response
          setData(newData)
        }
        if (response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`") {
          // setuploadTransportId(response.data.response)
          const newData = [...data]
          newData[index].DeliveryDocument = response.data.response
          setData(newData)
        }
        if (response.data.response.fieldName == "generalDocuments") {
          // setuploadTransportId(response.data.response)
          const newData = [...data]
          newData[index].generalDocuments = response.data.response
          setData(newData)
        }
        if (response.data.response.fieldName == "GSTDocument") {
          // setuploadTransportId(response.data.response)
          const newData = [...data]
          newData[index].GSTDocument = response.data.response
          setData(newData)
        }
      })
      .catch((error) => {
        // toast.error({error})

      })
  }

  const calculateSubtotal = newData => {
    // Calculate the subtotal

    let totleamount = 0

    newData.forEach((row, i) => {

      if (row.amount !== "") {
        const amountValue = parseFloat(row.amount)

        totleamount += amountValue
      }


    })
    setTotal(totleamount)

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
      <div className="modal-contents">
        <ModalHeader toggle={toggle}>Report A Defaulter</ModalHeader>
        <ReportedDebtorsModel isOpen={isCustomerFeedbackModalOpen} toggle={toggleViewModal1} filteredCustomerDetail={filteredCustomerDetail} allInvoiceList={allInvoiceList} dataForPreview={data} />


        <ModalBody className="" >
          <ConfirmReportModal isOpen={showConfirmModal} toggle={handleConfirmClose} />
          <form>
            <Row className="selectionList">
              <Col xs={12} md={2}>
                <div className="mt-2"><b className="mt-2">Customer Name*</b></div>
              </Col>
              <Col xs={12} md={4}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  <Select
                    options={getDebtrosList}
                    styles={customStyles}
                    value={selectedOption}
                    onChange={selected => handleSelectCustomer(selected)}
                  />

                </div>
              </Col>
              <Col xs={12} md={3}>
                <div className="d-inline">
                  <Button variant="link" onClick={() => toggleAddCustomer()}>
                    <i className="fas fa-plus-circle" />{" Add New Customer"}
                    {/* Assuming you have an icon library */}
                  </Button>
                  {/*     <Modal isOpen={showModal} toggle={() => setShowModal(false)}> */}
                  {isAddCustomerOpen && <AddcustomerFomr />}
                </div>
              </Col>

            </Row>
          </form>

          {
            filteredCustomerDetail.length != 0 ? <Row className="mt-4">
              <div className="mb-2"><b className="">Company Detail -</b></div>

              <Label className="text-capitalize">
                Name : {filteredCustomerDetail.companyName}
              </Label>
              <Label className="text-capitalize">
                Email : {filteredCustomerDetail.customerEmail}
              </Label>
              <Label className="text-capitalize">
                Mobile : {filteredCustomerDetail.customerMobile}
              </Label>
              <Label className="text-capitalize">
                GST Number : {filteredCustomerDetail.gstin}
              </Label>
              <Label className="text-capitalize">
                Address : {filteredCustomerDetail.address1 != '' ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.zipcode}
              </Label>
              <Label className="text-uppercase">
                PAN Number : {filteredCustomerDetail.companyPan}
              </Label>
            </Row> : ""}

          <Row className="tableRow">
            {isChangedCustomername != true ?

              ''

              :

              <Row className="Dragtable mt-3">



                {data.map((row, index) => (
                  <Row key={index}>

                    <Card className="shadow-lg AddiNVOICEcARD" >
                      <CardBody>
                        <Row  >

                          <Col md={4} className="p-2"><b>Invoice Number  <span className="text-danger">*</span></b></Col>
                          <Col md={4} className="p-2"><b>Invoice Date  <span className="text-danger">*</span></b></Col>
                          <Col md={4} className="p-2"><b>Due Amount  <span className="text-danger">*</span></b></Col>
                        </Row>
                        <Row className="">

                          <Col md={4} className="p-2">
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter  Invoice Number"
                              // value={row.amount}
                              onChange={e =>
                                handleItemDetailChange(index, e.target.value)
                              }
                            />

                          </Col>
                          <Col md={4} className="p-2">

                            <DatePicker
                              selected={data[index].date == '' ? new Date() : ""}
                              value={data[index].date == '' ? new Date() : data[index].date}
                              // placeholder="Select your date"

                              onChange={(date) =>
                                handleDateChange(date, index)
                              }
                              dateFormat="dd-MMM-yyyy" // Format to display year, month, and day
                              className="form-control custom-content"

                            />


                          </Col>
                          <Col md={4} className="p-2">
                            <Input
                              type="number"
                              className="form-control"
                              placeholder="Enter Due Amount"
                              // value={row.amount}
                              onChange={e =>
                                handleAmountChange(index, e.target.value)
                              }
                            />

                          </Col>



                        </Row>
                        <Row className="">

                          <Col md={4} className="p-2">
                            <Label><strong>Invoice</strong> <span className="text-danger">*</span></Label>
                            <InputGroup>
                              <input
                                type="file"
                                className="form-control"
                                id="uploadInvoice"
                                accept=".pdf, .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, "uploadInvoice", index)
                                }
                              />
                            </InputGroup>


                          </Col>

                          <Col md={4} className="p-2">
                            <Label> <strong>Challan / Dispatch Document</strong></Label>
                            <InputGroup>
                              <input
                                type="file"
                                className="form-control"
                                id="uploadchallanDispatchDocument"
                                accept=".pdf, .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(
                                    e,
                                    "uploadchallanDispatchDocument", index
                                  )
                                }
                              />
                            </InputGroup>
                          </Col>

                          <Col md={4} className="p-2">
                            <Label> <strong>Delivery / Transportation Document</strong></Label>
                            <InputGroup>
                              <input
                                type="file"
                                className="form-control"
                                id="uploadTransportationDocumentDeliveryReceipt"
                                accept=".pdf, .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(
                                    e,
                                    "uploadTransportationDocumentDeliveryReceipt~`", index
                                  )
                                }
                              />
                            </InputGroup>
                          </Col>



                        </Row>
                        <Row>
                          <Col md={4} className="p-2">
                            <Label><strong>Purchase Order Document</strong></Label>
                            <InputGroup className="text-capitalize">
                              <input
                                type="file"
                                className="form-control"
                                id="uploadPurchaseOrder"
                                accept=".pdf, .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, "uploadPurchaseOrder", index)
                                }
                              />
                            </InputGroup>
                          </Col>
                          {/* <Col md={4} className="p-2">
                            <Label><strong>GST Document</strong></Label>
                            <InputGroup className="text-capitalize">
                              <input
                                type="file"
                                className="form-control"
                                id="GSTDocument"
                                accept=".pdf, .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, "GSTDocument", index)
                                }
                              />
                            </InputGroup>
                          </Col> */}
                          {/*                 <Col md={4} className="p-2">
                            <Label><strong>Other Documents</strong></Label>
                            <InputGroup className="text-capitalize">
                              <input
                                type="file"
                                className="form-control"
                                id="generalDocuments"
                                accept=".pdf, .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, "generalDocuments", index)
                                }
                              />
                            </InputGroup>
                            <p className="text-danger" style={{ fontSize: '11px' }}>Please upload all Documents in a single Pdf</p>
                          </Col> */}
                          <Col md={4}></Col>
                          <Col md={4}></Col>
                          <Col md={4} className="p-2">

                          </Col>

                          <Col md={4} className="p-2">

                          </Col>
                          <Col md={4} className="p-2 text-end pt-4">

                            <Button className="btn btn-info mt-2" onClick={() => submitInvoice(index)}>
                              Save Invoice
                            </Button></Col>

                        </Row>

                      </CardBody>
                    </Card>

                  </Row>
                ))}
                <Row>
                  <Col md={12} className="text-end">
                    {currenIndex > 0 ? (
                      <span
                        className="icon-container delete-icon"
                        onClick={() => removeFaqsRow(currenIndex)}
                      >
                        <span className="mdi mdi-delete icon-red"></span>
                      </span>
                    ) : null}
                    <Button
                      className="btn btn-info"
                      onClick={addFaqsRow}
                      disabled={isDisabled == true}
                    >
                      Add Another Invoice
                      {/* <span className="mdi mdi-plus icon-yellow"></span> */}
                    </Button>
                  </Col>
                </Row>
                <Row className="text-end mt-3">
                  <Col md={12}>
                    <h5> <div> Total Amount = {numberFormat(total)}</div>
                    </h5>
                  </Col>

                </Row>



              </Row>



            }


          </Row>

          {/* {totalValue.length != 0 ? <Row>
            <Col md={8}></Col>
         <Col md={3} className="text-end">
              <b className="totalText">TOTAL</b> - <b className="totalText"> {totalValue.toFixed(2)}</b>
            </Col> 

          </Row>: ""} */}

          <Row>
            <Col md={11}></Col>
            <Col md={1} className="">
              <Button className="btn w-100 btn-info" onClick={() => handleFeedbackModal()}
                disabled={isDisabled == true}

              ><span className="h5">Next</span></Button>

            </Col>
          </Row>


        </ModalBody>



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
