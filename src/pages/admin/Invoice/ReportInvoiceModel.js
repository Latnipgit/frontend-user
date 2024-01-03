import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import './style.css'
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
  FormGroup,
  Table,
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
import { getAllInvoice, setIsReportDefOpen, setIsCustomerFeedbackModalOpen, addInvoiceReportDebtor, addInvoiceArray } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, selectFeedbackModalOpen, addInvoiceReportDebtorSelector, addInvoiceIdtoArray } from "store/debtors/debtors.selecter"
import { addInvoiceBill, addInvoiceBillSuccess } from '../../../store/actions'
// import { hover } from "@testing-library/user-event/dist/types/convenience";

// import '../../../pages/Dashboard/users/send-bill-transaction/sendbilltransaction.scss'
const ReportedDefaulterModel = props => {
  const [selectedOption, setSelectedOption] = useState("")
  const { isOpen, toggle, GetAllInvoice } = props
  const [filteredInvoiceList, setfilteredInvoiceList] = useState([])
  const [debtorIdArrayForPreview, setdebtorIdArrayForPreview] = useState([])
  const isCustomerFeedbackModalOpen = useSelector(selectFeedbackModalOpen)
  const InvoiceAddData = useSelector(addInvoiceReportDebtorSelector)
  // const InvoiceSuccessData = useSelector(addInvoiceBillSuccess)
  const toggleViewModal1 = () => dispatch(setIsCustomerFeedbackModalOpen(!selectFeedbackModalOpen));
  const { getInvoiceSuccessDetail } = useSelector(state => ({
    getInvoiceSuccessDetail: state.invoices.invoices != undefined && state.invoices.invoices.data != undefined ? state.invoices.invoices.data.response : [],
  }));
  console.log("InvoiceAddDataInvoiceAddData", InvoiceAddData)
  console.log("allinvoicelist", debtorIdArrayForPreview);

  const formikModal = useFormik({
    initialValues: {
      customerTypeIndividual: "",
      customerTypeBusiness: "",
      customerType: "Business",
      primaryContact: "",
      firstname: "",
      lastname: "",
      salutation: "",
      companyName: "",
      customerEmail: "",
      customerPhone: "",
      gstNumber: "",
      panCard: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
    },


    validate: values => {
      const errors = {}

      if (!values.customerType) {
        errors.customerType = "Customer Type is required"
      }
      if (!values.primaryContact) {
        errors.primaryContact = "Primary Contact is required"
      }
      if (!values.companyName) {
        errors.companyName = "Company Name is required"
      }
      if (!values.customerEmail) {
        errors.customerEmail = "Customer Email is required"
      } else if (!/^\S+@\S+\.\S+$/.test(values.customerEmail)) {
        errors.customerEmail = "Invalid email address"
      }
      if (!values.customerPhone) {
        errors.customerPhone = "Customer Phone is required"
      }
      if (!values.gstNumber) {
        errors.gstNumber = "GST Number is required"
      }
      //else if (
      //   !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\w{1}\d{1}$/.test(values.gstNumber)
      // ) {
      //   errors.gstNumber = "Invalid GST Number"
      // }
      if (!values.panCard) {
        errors.panCard = "PANCARD is required"
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.panCard)) {
        errors.panCard = "Invalid PANCARD"
      }
      if (!values.address1) {
        errors.address1 = "Address 1 is required"
      }
      if (!values.cityState) {
        errors.cityState = "City/State is required"
      }
      if (!values.zipcode) {
        errors.zipcode = "Zipcode is required"
      } else if (!/^\d{6}$/.test(values.zipcode)) {
        errors.zipcode = "Invalid Zipcode"
      }

      return errors
    },
    onSubmit: values => {
      debugger
      // Handle form submission here
    },
  })

  const [salutations, setsalutations] = useState([
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss", value: "Miss" },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
  ])
  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }
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

  console.log("PROPSS", GetAllInvoice)
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
    // setinvoiceDebtorIdArray(invoiceDebtorIdArray.push(InvoiceAddData.debtorId))
    // invoiceDebtorIdArray.push(InvoiceAddData.debtorId)


    // return debtorIdArrayForPreview

  }, [])


  const handleFormSubmit = item => {


    const dummy = [
      {
        "debtorType": item.customerType,
        "salutation": selectedOption.value,
        "firstname": item.firstname,
        "lastname": item.lastname,
        "customerEmail": item.customerEmail,
        "customerMobile": item.customerPhone,
        "address1": item.address1,
        "address2": item.address2,
        "city": item.city,
        "state": item.state,
        "zipcode": item.zipcode,
        "gstin": item.gstNumber,
        "companyPan": item.panCard,
        "companyName": item.companyName
      }
    ]
    dispatch(addCustomerlist(dummy))
  }
  const [data, setData] = useState([
    {
      itemDetail: "",
      date: "",
      amount: "",
    },
  ])
  const [uploadTransportId, setuploadTransportId] = useState('')
  const [uploadpurchaseId, setuploadpurchaseId] = useState('')
  const [uploadInvoiceId, setuploadInvoiceId] = useState('')
  const [uploadChallanId, setuploadChallanId] = useState('')
  const submitInvoice = () => {
    console.log("datadata", data, totalValue)
    const dummy = [{
      "debtorId": selectedOption.value,
      "billDate": moment(data[0].date).format("YYYY-MM-DD"),
      "billDescription": "",
      "billNumber": "",
      "creditAmount": 0,
      "remainingAmount": 0,
      "status": "",
      "interestRate": "",
      "creditLimitDays": "",
      "remark": "",
      "items": [],
      "subTotal": data[0].amount,
      "tax": '',
      "referenceNumber": selectedOption.value != null ? "BAF" + "-" + selectedOption.value.slice(-6).toUpperCase() : '',
      "invoiceNumber": "BAF" + "-" + data[0].itemDetail,
      "dueDate": moment(data[0].date).format("YYYY-MM-DD"),
      "percentage": "",
      "purchaseOrderDocument": uploadpurchaseId,
      "challanDocument": uploadChallanId,
      "invoiceDocument": uploadInvoiceId,
      "transportationDocument": uploadTransportId

    }]
    if (uploadInvoiceId == '') {

      toast.error("Please Upload Invoice File")
    }
    else {
      debugger
      dispatch(addInvoiceReportDebtor(dummy))
      const val = { "InvoiceId": InvoiceAddData.debtorId }
      const avilableInvoiceID = debtorIdArrayForPreview.some(x => x.InvoiceId === val)
      if (val) {
        if (!avilableInvoiceID) {
          setdebtorIdArrayForPreview(myArr => [...myArr, val])
        }
      }
    }
  }


  // console.log("GetAllDebtors Data",DebtorsList,GetAllInvoice,GetAllDebtors)
  const TotalDebtorPayment = (item) => {
    if (item != undefined) {
      settotalValue(item.remainingAmount)

    }
  }
  const handleFilterInvoiceList = (item) => {
    var filteredArrays = []
    filteredArrays = GetAllInvoice.filter(value => value.debtorId == item.value)
    console.log("filteredInvoiceList  KKKKK", filteredInvoiceList, filteredArrays[0])
    if (filteredArrays[0] != undefined) {
      setfilteredInvoiceList([filteredArrays[0]])

    }
    else {

      setfilteredInvoiceList(undefined)

    }
  }
  const [filteredCustomerDetail, setfilteredCustomerDetail] = useState([])
  const [isChangedCustomername, setisChangedCustomername] = useState(false)

  const handleSelectCustomer = (item) => {

    setisChangedCustomername(true)
    settotalValue([])
    setSelectedOption(item)

    var filteredArray = []
    filteredArray = GetAllDebtors.filter((value) => value.id == item.value)
    console.log("ITEM +", filteredArray)
    setfilteredCustomerDetail(filteredArray[0])

    handleFilterInvoiceList(item)
  }

  const [faqsRow, setFaqsRow] = useState(1)
  const [currenIndex, setCurrentIndex] = useState(0)
  const [isDisabled, setisDisabled] = useState(true)
  const handleItemDetailChange = (index, value) => {
    console.log("HARSHIT hs", index, value, data)
    setCurrentIndex(index)
    const newData = [...data]
    newData[index].itemDetail = value
    setData(newData)
  }
  const handleAmountChange = (index, value) => {
    // const newData = [...data]
    // newData[index].amount = value
    // setData(newData)
    setisDisabled(false)

    const newData = [...data]
    newData[index].amount = value

    const amount = parseFloat(newData[index].amount)

    if (!isNaN(amount)) {
      newData[index].amount = (amount).toFixed(2)
    } else {
      newData[index].amount = ""
    }

    setData(newData)
    calculateSubtotal(newData)
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
      return // Exit without adding a new row
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

  console.log("datadatadata", data)

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (value, index) => {
    const newData = [...data]
    newData[index].date = value
    setData(newData)
    setSelectedDate(value)
  };
  console.log("filteredCustomerDetail", GetAllDebtors, filteredCustomerDetail)

  const handleFileChange = (event, fieldName) => {
    const files = event.target.files
    console.log("FILEEE", event.target.files, fieldName)

    const formData = new FormData();

    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);


    uploadFile(formData)


  }

  const handleInoiceForm = (event, fieldName) => {
    const files = event.target.files
    console.log("FILEEE", event.target.files, fieldName)

    const formData = new FormData();

    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);


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
        // toast.success("file upload successfully")
        console.log("Response", response)
        if (response.data.response.fieldName == "uploadInvoice") {
          setuploadInvoiceId(response.data.response.documentId)
        }
        if (response.data.response.fieldName == "uploadPurchaseOrder") {
          setuploadpurchaseId(response.data.response.documentId)
        }
        if (response.data.response.fieldName == "uploadchallanDispatchDocument") {
          setuploadChallanId(response.data.response.documentId)
        }
        if (response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`") {
          setuploadTransportId(response.data.response.documentId)
        }
      })
      .catch((error) => {
        console.log("Response", error)

      })
  }
  const [total, setTotal] = useState(0.0)

  const calculateSubtotal = newData => {
    // Calculate the subtotal
    let total = 0
    newData.forEach(row => {
      if (row.amount !== "") {
        const amountValue = parseFloat(row.amount.replace(""))
        console.log("newData", newData, row.amount, total)

        if (!isNaN(amountValue)) {
          total = row.amount
        }
      }
    })
    setTotal(total)
  }


  const handleRepoertProceed = () => {
    setshowConfirmModal(true)
  }
  console.log("dataoodata", data)
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
        <ReportedDebtorsModel isOpen={isCustomerFeedbackModalOpen} toggle={toggleViewModal1} filteredCustomerDetail={filteredCustomerDetail} />


        <ModalBody className="" >
          <ConfirmReportModal isOpen={showConfirmModal} toggle={handleConfirmClose} />
          <form>
            <Row className="selectionList">
              <Col xs={12} md={2}>
                <div className="mb-2"><b className="mt-2">Customer Name*</b></div>
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
                  <Button variant="link" onClick={handleShow}>
                    <i className="fas fa-plus-circle" />{" Add New Customer"}
                    {/* Assuming you have an icon library */}
                  </Button>

                  <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                    <ModalHeader toggle={() => setShowModal(false)}>
                      Add New Customer{" "}
                    </ModalHeader>
                    <ModalBody>
                      <form onSubmit={formikModal.handleSubmit}>
                        <Row className="mt-2">
                          <Col xs={12} md={4}>
                            <Label for="customerType">Customer Type*</Label>
                          </Col>
                          <Col xs={12} md={8}>
                            <FormGroup>
                              <div className="form-check form-check-inline">
                                <Label
                                  check
                                  // inline
                                  className={
                                    formikModal.values.customerType === "Business"
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  <Input
                                    className="ember-view form-check-input"
                                    type="radio"
                                    id="customerTypeBusiness"
                                    name="customerType"
                                    value="Business"
                                    onChange={() => [
                                      formikModal.values.customerType === "Business"
                                        ? "selected"
                                        : ""
                                    ]}
                                  />{" "}
                                  Business
                                </Label>
                              </div>
                              <div>
                                <Label
                                  // check
                                  inline
                                  className={
                                    formikModal.values.customerType === "Individual"
                                      ? "selected"
                                      : ""
                                  }

                                >
                                  <Input
                                    type="radio"
                                    id="customerTypeIndividual"
                                    name="customerType"
                                    value="Individual"
                                    onChange={() => [
                                      formikModal.values.customerType === "Individual"
                                        ? "selected"
                                        : ""
                                    ]}
                                  />{" "}
                                  Individual
                                </Label>
                              </div>
                              {formikModal.touched.customerType &&
                                formikModal.errors.customerType && (
                                  <div className="text-danger">
                                    {formikModal.errors.customerType}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={4} className="mt-2">
                            <Label for="customerType">Primary Contact*</Label>
                          </Col>
                          <Col xs={12} md={3}>
                            <div className="d-inline">
                              <label
                                className="visually-hidden custom-content"
                                htmlFor="primaryContact"
                              >
                                Select Customer
                              </label>
                              <Select
                                id="primaryContact"
                                className="custom-content"
                                options={salutations}
                                styles={colourStyles}
                                value={selectedOption}
                                onChange={selected => setSelectedOption(selected)}
                                onInputChange={handleInputChange}
                                placeholder="Salutation"
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={3}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="text-capitalize"
                                value={formikModal.values.firstname}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="First Name"
                              />
                              {formikModal.touched.firstname &&
                                formikModal.errors.firstname && (
                                  <div className="text-danger">
                                    {formikModal.errors.firstname}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                          <Col xs={12} md={3}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formikModal.values.lastname}
                                onChange={formikModal.handleChange}
                                className="text-capitalize"

                                onBlur={formikModal.handleBlur}
                                placeholder="Last Name"
                              />
                              {formikModal.touched.lastname &&
                                formikModal.errors.lastname && (
                                  <div className="text-danger">
                                    {formikModal.errors.lastname}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* <Row>
                      <Col xs="12">
                        <hr className="bdr-light xlg"></hr>
                      </Col>
                    </Row> */}
                        <Row>
                          <Col xs={12} md={4} className="mt-2">
                            <Label for="companyName">Company Name*</Label>
                          </Col>
                          <Col xs={12} md={8}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formikModal.values.companyName}
                                className="text-capitalize"

                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Enter Company Name"
                              />
                              {formikModal.touched.companyName &&
                                formikModal.errors.companyName && (
                                  <div className="text-danger">
                                    {formikModal.errors.companyName}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-2">
                            <Label for="customerEmail">Customer Email*</Label>
                          </Col>
                          <Col xs={12} md={8}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="customerEmail"
                                name="customerEmail"
                                value={formikModal.values.customerEmail}

                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Customer Email"
                              />
                              {formikModal.touched.customerEmail &&
                                formikModal.errors.customerEmail && (
                                  <div className="text-danger">
                                    {formikModal.errors.customerEmail}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} md={2} className="mt-2">
                            <Label for="customerPhone">Customer Phone</Label>
                          </Col>
                          <Col xs={12} md={3}>
                            <FormGroup>
                              <Input
                                type="number"
                                id="customerPhone"
                                name="customerPhone"
                                value={formikModal.values.customerPhone}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Work Phone"
                              />
                              {formikModal.touched.customerPhone &&
                                formikModal.errors.customerPhone && (
                                  <div className="text-danger">
                                    {formikModal.errors.customerPhone}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                          <Col xs={12} md={3}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="customerPhone"
                                name="customerPhone"
                                value={formikModal.values.customerPhone}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Mobile"
                              />
                              {formikModal.touched.customerPhone &&
                                formikModal.errors.customerPhone && (
                                  <div className="text-danger">
                                    {formikModal.errors.customerPhone}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-2">
                            <Label for="panCard">PAN*</Label>
                          </Col>
                          <Col xs={12} md={5}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="panCard"
                                name="panCard"
                                className="text-uppercase"

                                value={formikModal.values.panCard}
                                onChange={formikModal.handleChange}
                                // onBlur={formikModal.handleBlur}
                                placeholder="Enter Pan Number"
                              />
                              {/* {formikModal.touched.panCard &&
                            formikModal.errors.panCard && (
                              <div className="text-danger">
                                {formikModal.errors.panCard}
                              </div>
                            )} */}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-1">
                            <Label for="gstNumber">GST Number</Label>
                          </Col>
                          <Col xs={12} md={5}>
                            <FormGroup>
                              <Input
                                type="text"
                                id="gstNumber"
                                name="gstNumber"
                                className="text-uppercase"

                                value={formikModal.values.gstNumber}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Enter GST Number"
                              />
                              {formikModal.touched.gstNumber &&
                                formikModal.errors.gstNumber && (
                                  <div className="text-danger">
                                    {formikModal.errors.gstNumber}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* Add similar code for the rest of the fields */}
                        <Row>
                          <Col xs="12">
                            <hr className="bdr-light xlg"></hr>
                          </Col>
                        </Row>
                        <Label for="address1">Address Details</Label>
                        <Row>
                          <Col xs={12} md={2} className="mt-4">
                            <Label for="address1">Address 1*</Label>
                          </Col>
                          <Col xs={12} md={6} className="mt-2">
                            <FormGroup>
                              <Input
                                type="textarea"
                                id="address1"
                                name="address1"
                                className="text-capitalize"

                                value={formikModal.values.address1}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Type Address here....."
                              />
                              {formikModal.touched.address1 &&
                                formikModal.errors.address1 && (
                                  <div className="text-danger">
                                    {formikModal.errors.address1}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-3">
                            <Label for="address2">Address 2</Label>
                          </Col>
                          <Col xs={12} md={6} className="mt-1">
                            <FormGroup>
                              <Input
                                type="textarea"
                                id="address2"
                                name="address2"
                                className="text-capitalize"

                                value={formikModal.values.address2}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Type Address here....."
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-2">
                            <Label for="cityState">City*</Label>
                          </Col>
                          <Col xs={12} md={6} className="mt-1">
                            <FormGroup>
                              <Input
                                type="text"
                                id="city"
                                name="city"
                                className="text-capitalize"
                                value={formikModal.values.city}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Enter City Name"
                              />
                              {formikModal.touched.city &&
                                formikModal.errors.city && (
                                  <div className="text-danger">
                                    {formikModal.errors.city}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-2">
                            <Label for="cityState">State</Label>
                          </Col>
                          <Col xs={12} md={6} className="mt-1">
                            <FormGroup>
                              <Input
                                type="text"
                                id="state"
                                name="state"
                                className="text-capitalize"

                                value={formikModal.values.state}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Enter State Name"
                              />
                              {formikModal.touched.state &&
                                formikModal.errors.state && (
                                  <div className="text-danger">
                                    {formikModal.errors.state}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={2} className="mt-2">
                            <Label for="zipcode">Zipcode*</Label>
                          </Col>
                          <Col xs={12} md={6} className="mt-1">
                            <FormGroup>
                              <Input
                                type="number"
                                id="zipcode"
                                name="zipcode"
                                value={formikModal.values.zipcode}
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                                placeholder="Enter 6 digit zipcode"
                              />
                              {formikModal.touched.zipcode &&
                                formikModal.errors.zipcode && (
                                  <div className="text-danger">
                                    {formikModal.errors.zipcode}
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button
                        color="success"
                        onClick={() => handleFormSubmit(formikModal.values)}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </Col>

            </Row>
          </form>

          {
            filteredCustomerDetail.length != 0 ? <Row className="mt-4">
              <div className="mb-2"><b className="">Company Detail -</b></div>

              <Label className="text-capitalize">
                Name - {filteredCustomerDetail.companyName}
              </Label>
              <Label className="text-capitalize">
                Email - {filteredCustomerDetail.customerEmail}
              </Label>
              <Label className="text-capitalize">
                Mobile - {filteredCustomerDetail.customerMobile}
              </Label>
              <Label className="text-capitalize">
                GST Number - {filteredCustomerDetail.gstin}
              </Label>
              <Label className="text-capitalize">
                {console.log("filteredCustomerDetail.address1", filteredCustomerDetail.address1)}
                Address - {filteredCustomerDetail.address1 != '' ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.zipcode}
              </Label>
              <Label className="text-uppercase">
                PAN Number - {filteredCustomerDetail.companyPan}
              </Label>
            </Row> : ""}

          <Row className="tableRow">
            {isChangedCustomername != true ?
              // <table className="table table-bordered tableRowtable" >
              //   <thead>
              //     <tr>
              //       <th scope="col">#</th>
              //       <th scope="col">Company Name</th>
              //       <th scope="col">Invoice number</th>
              //       <th scope="col">Date</th>
              //       <th scope="col">Amount</th>

              //     </tr>
              //   </thead>
              //   <tbody>
              //     {filteredInvoiceList != undefined && filteredInvoiceList.length != 0 ? filteredInvoiceList.map((item) => {
              //       return <tr key={item}>
              //         <td>
              //           <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => TotalDebtorPayment(item)} />
              //         </td>
              //         <td>
              //           {console.log("HELLO0", item)}
              //           {item != undefined ? item.debtor.companyName : ''}
              //         </td>
              //         <td> {item != undefined ? item.invoiceNumber : ""}</td>
              //         <td>{moment(item != undefined ? item.dueDate : '').format("DD-MMM-YYYY")}</td>
              //         <td className="text-end">

              //           <CurrencyFormat value={item != undefined ? item.remainingAmount.toFixed(2) : ''} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{ }</div>} />
              //         </td>

              //       </tr>
              //     }) :
              //       <tr>
              //         <td></td>
              //         <td></td>
              //         <td></td>
              //         <td></td>
              //         <td></td>
              //       </tr>
              //     }
              //   </tbody></table>
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
                              selected={selectedDate || new Date()}
                              // value={row.date}

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
                                accept=".pdf, .doc, .docx, .txt"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, "uploadInvoice")
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
                                accept=".pdf, .doc, .docx, .txt"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(
                                    e,
                                    "uploadchallanDispatchDocument"
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
                                accept=".pdf, .doc, .docx, .txt"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(
                                    e,
                                    "uploadTransportationDocumentDeliveryReceipt~`"
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
                                accept=".pdf, .doc, .docx, .txt"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, "uploadPurchaseOrder")
                                }
                              />
                            </InputGroup>
                          </Col>


                          <Col md={4} className="p-2">
                            {/* <Label>Upload CA Certificate</Label>  <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, .docx, .txt"
                            aria-describedby="fileUploadHelp"
                            onChange={e =>
                              handleFileChange(e, "uploadCACertificate")
                            }
                          />
                        </InputGroup> */}
                          </Col>
                          <Col md={4} className="p-2 text-end pt-4">

                            <Button className="btn btn-info mt-2" onClick={() => submitInvoice()}>
                              Submit
                            </Button></Col>

                        </Row>

                      </CardBody>
                    </Card>

                  </Row>
                ))}
                <Row>
                  <Col md={12} className="text-end">
                    {/* <Button>Add Another Invoice</Button> */}
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
                    {console.log("totaltotaltotal", total)}
                    <h5>  <CurrencyFormat value={total.toFixed(2)} displayType={'text'} thousandSeparator={true} renderText={value => <div> Total Amount = {value}</div>} />
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
