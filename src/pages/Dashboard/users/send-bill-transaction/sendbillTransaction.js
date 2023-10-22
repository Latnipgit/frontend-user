import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import { useFormik } from "formik"
// import { mdiDelete, mdiPlus } from '@mdi/react';
//import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../send-bill-transaction/sendbilltransaction.scss"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Table,
  InputGroup,
  Form,
  CardTitle,
  FormGroup,
  Label,
  InputGroupAddon,
} from "reactstrap"

const validationSchema = Yup.object().shape({
  customerName: Yup.string()
    // .matches(/^[A-Za-z\s]+$/, "Customer Name must contain only alphabets")
    .required("Customer Name is required"),
  billDate: Yup.date().required("Issue Date is required"),
  dueDate: Yup.date().required("Due Date is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  interestRate1: Yup.number()
    .typeError("Interest Rate must be a number")
    .nullable(), // Allows an empty value for Interest Rate
  invoiceDescription: Yup.string().required("Invoice Description is required"),
  billNumber: Yup.string()
    .matches(
      /^[A-Za-z0-9]+$/,
      "Bill Number must contain only alphanumeric characters"
    )
    .required("Bill Number is required"),
  creditLimitDays: Yup.number()
    .typeError("Credit Limit Days must be a number")
    .required("Credit Limit Days is required"),
  uploadOriginalBill: Yup.mixed().required("Original Bill is required"),
  uploadPurchaseOrder: Yup.mixed().required("Purchase Order is required"),
})

const initialValues = {
  customerName: "",
  billDate: null,
  billDescription: "",
  billNumber: "",
  billInvoiveCopy: "",
  creditAmount: "",
  precentage: "",
  creditLimitDays: "",
  remarks: "",
  interestRate1: null,
  uploadOriginalBill: null,
  uploadPurchaseOrder: null,
}

const SendBillTransaction = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      // Handle form submission logic here
      console.log(values)
      console.log(values)
      console.log("Original Bill File:", originalBillFile)
      console.log("Purchase Order File:", purchaseOrderFile)
    },
  })

  //Dropdown cutomer

  const [selectedOption, setSelectedOption] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [customerType, setCustomerType] = useState("Business")
  const [options, setOptions] = useState([
    { label: "Alice", value: "Alice" },
    { label: "Bob", value: "Bob" },
    { label: "Charlie", value: "Charlie" },
    { label: "David", value: "David" },
    { label: "Add Customer", value: "Add Customer", isAddCustomer: true },
  ])

  // const handleInputChange = inputValue => {
  //   // Filter options based on user input
  //   const filteredOptions = options.filter(option =>
  //     option.label.toLowerCase().includes(inputValue.toLowerCase())
  //   )
  //   setOptions(filteredOptions)
  // }

  const handleInputChange = inputValue => {
    // Handle input change here
  }

  const handleSaveCustomer = () => {
    // Handle saving the customer here
  }

  const handleOptionSelect = selected => {
    if (selected.isAddCustomer) {
      // Handle the "Add Customer" option click
      setShowModal(true)
    } else {
      setSelectedOption(selected)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  // const handleSaveCustomer = () => {
  //   if (newCustomerName) {
  //     setOptions([
  //       ...options,
  //       { label: newCustomerName, value: newCustomerName },
  //     ])
  //     setSelectedOption({ label: newCustomerName, value: newCustomerName })
  //     setShowModal(false)
  //   }
  // }

  //first table
  const [faqsRow, setFaqsRow] = useState(1)
  const [subtotal, setSubtotal] = useState(0)
  const [data, setData] = useState([
    {
      itemDetail: "",
      quantity: "",
      rate: "",
      amount: "",
    },
  ])

  const [validationMessage, setValidationMessage] = useState("")

  const addFaqsRow = () => {
    // Check if any of the previous row's fields are empty
    const lastIndex = data.length - 1
    const lastRow = data[lastIndex]

    if (
      lastRow.itemDetail === "" ||
      lastRow.quantity === "" ||
      lastRow.rate === ""
    ) {
      setValidationMessage("Please fill all fields before adding a new row.")
      setTimeout(() => {
        setValidationMessage("")
      }, 3000)
      return // Exit without adding a new row
    }

    setValidationMessage("") // Clear any previous validation message

    setFaqsRow(faqsRow + 1)
    setData([
      ...data,
      {
        itemDetail: "",
        quantity: "0.00",
        rate: "0.00",
        amount: "₹0.00",
      },
    ])
  }

  const removeFaqsRow = index => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
    setFaqsRow(faqsRow - 1)
  }

  const handleItemDetailChange = (index, value) => {
    const newData = [...data]
    newData[index].itemDetail = value
    setData(newData)
  }

  const handleQuantityChange = (index, value) => {
    const newData = [...data]
    newData[index].quantity = value.replace(/[^0-9.]/g, "")
    setData(newData)
  }

  const formatQuantity = index => {
    const newData = [...data]
    newData[index].quantity = parseFloat(newData[index].quantity).toFixed(2)
    setData(newData)
  }
  const handleRateChange = (index, value) => {
    const newData = [...data]
    newData[index].rate = value.replace(/[^0-9.]/g, "")

    const quantity = parseFloat(newData[index].quantity)
    const rate = parseFloat(newData[index].rate)

    if (!isNaN(quantity) && !isNaN(rate)) {
      newData[index].amount = "₹" + (quantity * rate).toFixed(2)
    } else {
      newData[index].amount = ""
    }

    setData(newData)
    calculateSubtotal(newData)
  }

  const formatRate = index => {
    const newData = [...data]
    newData[index].rate = parseFloat(newData[index].rate).toFixed(2)
    setData(newData)
  }

  //second Table

  const [discountValue, setDiscountValue] = useState(0.0)
  const [gst, setGST] = useState(0.0)
  const [adjustmentsValue, setAdjustmentsValue] = useState(0.0)
  const [total, setTotal] = useState(0.0)

  const calculateSubtotal = newData => {
    // Calculate the subtotal
    let total = 0

    newData.forEach(row => {
      if (row.amount !== "") {
        const amountValue = parseFloat(row.amount.replace("₹", ""))
        if (!isNaN(amountValue)) {
          total += amountValue
        }
      }
    })
    setSubtotal(total)
    setTotal(total)
  }
  const handleConfirmApprove = () => {
    setShowApproveModal(false)
  }
  // const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const [showApproveModal, setShowApproveModal] = useState(false)
  const [cgst, setCGST] = useState("")
  const [sgst, setSGST] = useState("")

  const handleCGSTChange = e => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      // Check if the input is a valid number
      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= 100)
      ) {
        setCGST(value)
      }
    }
  }

  const handleSGSTChange = e => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      // Check if the input is a valid number
      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= 100)
      ) {
        setSGST(value)
      }
    }
  }

  ///MODAL FUNCTION
  const formikModal = useFormik({
    initialValues: {
      customerType: "",
      primaryContact: "",
      companyName: "",
      customerEmail: "",
      customerPhone: "",
      gstNumber: "",
      panCard: "",
      address1: "",
      address2: "",
      cityState: "",
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
      } else if (
        !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\w{1}\d{1}$/.test(values.gstNumber)
      ) {
        errors.gstNumber = "Invalid GST Number"
      }
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
      // Handle form submission here
    },
  })
  return (
    <Container fluid className="mt-5 mb-5">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h2 mb-4">Send Bill Transactions</CardTitle>

              <form onSubmit={formik.handleSubmit}>
                <Row className="custom-row">
                  <Col xs={12} md={2}>
                    <div className="mb-2">Customer Name*</div>
                  </Col>
                  <Col xs={12} md={5}>
                    <div className="d-inline">
                      <label
                        className="visually-hidden custom-content"
                        htmlFor="customerSelect"
                      >
                        Select Customer
                      </label>
                      <Select
                        id="customerSelect"
                        className="custom-content"
                        options={options}
                        value={selectedOption}
                        onChange={selected => setSelectedOption(selected)}
                        onInputChange={handleInputChange}
                        placeholder="Select or add a customer"
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="d-inline">
                      <Button variant="link" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />{" "}
                        {/* Assuming you have an icon library */}
                      </Button>

                      <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add Customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Hi Akshay Neriya
                          {/* Your form for adding a customer goes here */}
                          {/* You can use Form controls or any other input elements */}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary">Save Customer</Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Reference number*</div>
                  </Col>
                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="Invoiocenumber"
                    >
                      Reference Number
                    </label>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control custom-content mt-2`}
                        id="amount"
                        name="amount"
                        placeholder="Enter reference number"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.amount && formik.errors.amount && (
                      <div className="text-danger mt-2">
                        {formik.errors.amount}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Invoice number*</div>
                  </Col>
                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="Invoiocenumber"
                    >
                      Invoice Number
                    </label>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control custom-content mt-2`}
                        id="amount"
                        name="amount"
                        placeholder="Enter invoice number"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.amount && formik.errors.amount && (
                      <div className="text-danger mt-2">
                        {formik.errors.amount}
                      </div>
                    )}
                  </Col>
                </Row>
                {/* <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Order Number</div>
                  </Col>
                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="Invoiocenumber"
                    >
                      Order Number
                    </label>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control custom-content mt-2`}
                        id="amount"
                        name="amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                  </Col>
                </Row> */}
                <Row className="mt-3">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Invoice Date</div>
                  </Col>
                  <Col xs={12} md={3}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="Invoiocenumber"
                    >
                      Invoice Date
                    </label>
                    <InputGroup>
                      <DatePicker
                        selected={formik.values.billDate || new Date()} // Use the selected value or default to today's date
                        onChange={date =>
                          formik.setFieldValue("billDate", date)
                        }
                        dateFormat="yyyy-MM-dd"
                        id="billDate"
                        className={`form-control custom-content mt-2`}
                        placeholderText="dd-mm-yyyy"
                        onBlur={() => formik.setFieldTouched("billDate", true)}
                      />
                    </InputGroup>
                    <div className="mb-0 transactioin">
                      To create transaction dated before 01/07/2017, click here
                    </div>
                  </Col>
                  {/* <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Terms</div>
                  </Col> */}
                  <Col xs={12} md={2}>
                    <div className="d-inline">
                      <label
                        className="visually-hidden mt-5"
                        htmlFor="customerSelect"
                      >
                        Due on reciept
                      </label>
                      <Select
                        id="customerSelect"
                        className="custom-content"
                        options={options}
                        value={selectedOption}
                        onChange={selected => setSelectedOption(selected)}
                        onInputChange={handleInputChange}
                        placeholder="Due on reciept"
                        // isSearchable
                        // components={{ DropdownIndicator }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Due Date</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="Invoiocenumber"
                    >
                      Due Date
                    </label>
                    <InputGroup>
                      <DatePicker
                        selected={formik.values.billDate || new Date()}
                        onChange={date =>
                          formik.setFieldValue("billDate", date)
                        }
                        dateFormat="yyyy-MM-dd"
                        id="billDate"
                        className={`form-control custom-content mt-2`}
                        placeholderText="dd-mm-yyyy"
                        onBlur={() => formik.setFieldTouched("billDate", true)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                {/* <Row className="mt-3">
                  <Col xs="12">
                    <hr className="bdr-light xlg"></hr>
                  </Col>
                </Row> */}
                {/* <Row className="mt-3">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-2">Salesperson</div>
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
                        id="customerSelect"
                        className="custom-content"
                        options={options}
                        value={selectedOption}
                        onChange={selected => setSelectedOption(selected)}
                        onInputChange={handleInputChange}
                        placeholder="Select or add a salesman"
                      />
                    </div>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col xs="12">
                    <hr className="bdr-light xlg"></hr>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-2">Subject</div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="d-inline">
                      <label
                        className="visually-hidden custom-content"
                        htmlFor="customerSelect"
                      >
                        Select Customer
                      </label>
                      <textarea
                        className={`form-control custom-content`}
                        id="remarks"
                        placeholder="let your customer know what this invvoice is for "
                      />
                    </div>
                  </Col>
                </Row> */}
                <Row>
                  <Col xs="12">
                    <hr className="bdr-light xlg"></hr>
                  </Col>
                </Row>
                {/* <Row>
                  <div className="h5 mb-4">Additional fields</div>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Due From</div>
                  </Col>
                  <Col xs={12} md={3}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="Invoiocenumber"
                    >
                      Invoice Date
                    </label>
                    <InputGroup>
                      <DatePicker
                        selected={formik.values.dueDate}
                        onChange={date => formik.setFieldValue("dueDate", date)}
                        dateFormat="yyyy-MM-dd"
                        id="dueDate"
                        className="form-control"
                        placeholderText="dd-mm-yyyy"
                        onBlur={() => formik.setFieldTouched("dueDate", true)}
                      />
                    </InputGroup>
                    {formik.touched.dueDate && formik.errors.dueDate && (
                      <div className="text-danger">{formik.errors.dueDate}</div>
                    )}
                   
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Amount</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <div className="d-inline">
                      <label className="visually-hidden mt-4" htmlFor="amount">
                        Amount
                      </label>
                      <InputGroup>
                        <Input
                          type="text"
                          className={`form-control`}
                          id="amount"
                          name="amount"
                          placeholder="Enter amount"
                          value={formik.values.amount}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </InputGroup>
                      {formik.touched.amount && formik.errors.amount && (
                        <div className="text-danger mt-2">
                          {formik.errors.amount}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Invoice Detail</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <label
                      className="visually-hidden"
                      htmlFor="invoiceDescription"
                    >
                      Invoice Description
                    </label>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control`}
                        id="invoiceDescription"
                        name="invoiceDescription"
                        placeholder="Enter invoice description"
                        value={formik.values.invoiceDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.invoiceDescription &&
                      formik.errors.invoiceDescription && (
                        <div className="text-danger mt-2">
                          {formik.errors.invoiceDescription}
                        </div>
                      )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Interest Rate after 30 days</div>
                  </Col>
                  <Col xs={12} md={3}>
                    <div className="d-inline">
                      <label
                        className="visually-hidden mt-4"
                        htmlFor="interestRate1"
                      >
                        Interest Rate after 30 days
                      </label>
                      <InputGroup>
                        <Input
                          type="text"
                          className={`form-control`}
                          id="interestRate1"
                          name="interestRate1"
                          placeholder="Enter interest rate after 30 days"
                          value={formik.values.interestRate1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </InputGroup>
                      {formik.touched.interestRate1 &&
                        formik.errors.interestRate1 && (
                          <div className="text-danger mt-2">
                            {formik.errors.interestRate1}
                          </div>
                        )}
                    </div>
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Bill Number</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <label className="visually-hidden" htmlFor="billNumber">
                      Bill Number
                    </label>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-controls`}
                        id="billNumber"
                        name="billNumber"
                        placeholder="Enter bill number"
                        value={formik.values.billNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.billNumber && formik.errors.billNumber && (
                      <div className="text-danger mt-2">
                        {formik.errors.billNumber}
                      </div>
                    )}
                  </Col>

                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Credit Limit Days</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <label
                      className="visually-hidden"
                      htmlFor="creditLimitDays"
                    >
                      Credit Limit Days
                    </label>
                    <InputGroup>
                      <input
                        type="text"
                        className={`form-control`}
                        id="creditLimitDays"
                        name="creditLimitDays"
                        placeholder="Enter credit limit days"
                        value={formik.values.creditLimitDays}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.creditLimitDays &&
                      formik.errors.creditLimitDays && (
                        <div className="text-danger mt-2">
                          {formik.errors.creditLimitDays}
                        </div>
                      )}
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12">
                    <hr className="bdr-light xlg"></hr>
                  </Col>
                </Row> */}
                <Row className="Dragtable mt-3">
                  <div className="table-responsive">
                    <table id="faqs" className="table table-hover custom-table">
                      <thead>
                        <tr>
                          <th>Item Detail</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={index}>
                            {/* <td>{index + 1}</td> */}
                            <td className="hoverable-cell">
                              <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter item detail"
                                value={row.itemDetail}
                                onChange={e =>
                                  handleItemDetailChange(index, e.target.value)
                                }
                              />
                            </td>
                            <td className="hoverable-cell">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Quantity"
                                value={row.quantity}
                                onChange={e =>
                                  handleQuantityChange(index, e.target.value)
                                }
                                onBlur={() => formatQuantity(index)}
                              />
                            </td>
                            <td className="hoverable-cell">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Rate"
                                value={row.rate}
                                onChange={e =>
                                  handleRateChange(index, e.target.value)
                                }
                                onBlur={() => formatRate(index)}
                              />
                            </td>
                            <td className="hoverable-cell">
                              <input
                                type="text"
                                className="form-control"
                                value={row.amount}
                                disabled
                              />
                            </td>
                            <td>
                              {index > 0 ? (
                                <span
                                  className="icon-container delete-icon"
                                  onClick={() => removeFaqsRow(index)}
                                >
                                  <span className="mdi mdi-delete icon-red"></span>
                                </span>
                              ) : null}
                              <span
                                className="icon-container add-icon"
                                onClick={addFaqsRow}
                              >
                                <span className="mdi mdi-plus icon-yellow"></span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Row>

                <Row className="Dragtable">
                  <Col md={5} className="mt-5">
                    {/* <div className="mb-2 mt-5">Costomer Notes </div>
                    <label className="visually-hidden" htmlFor="remarks">
                      Customer notes
                    </label>
                    <InputGroup>
                      <textarea
                        className={`form-control`}
                        id="remarks"
                        placeholder="Thanks for your buisness."
                      />
                    </InputGroup>
                    <div className="mb-0 transactioin">
                      Will be displayed on the invoice
                    </div> */}
                  </Col>
                  <Col md={1} className="mt-5"></Col>

                  <Col md={6}>
                    <Card className="overflow-hidden rounded-lg bg-light">
                      <CardBody className="pt-0">
                        <Form>
                          <Row>
                            <Col sm={12}>
                              <div className="pt-4">
                                <Row>
                                  {/* Subtotal */}
                                  <Col xs="4">
                                    <p className="text-muted mb-0">Subtotal</p>
                                  </Col>
                                  <Col xs="5"></Col>
                                  <Col xs="3">
                                    <h5 className="font-size-15">
                                      ₹{subtotal.toFixed(2)}
                                    </h5>
                                  </Col>
                                  {/* Discount */}
                                </Row>
                                <Row>
                                  <Col xs="4">
                                    <p className="text-muted mb-0 mt-2">
                                      Discount
                                    </p>
                                  </Col>
                                  <Col xs="5">
                                    <FormGroup>
                                      <Input
                                        type="text"
                                        placeholder="Enter Discount"
                                        value={discountValue}
                                        onChange={e => {
                                          const value = e.target.value
                                          if (value.length === 1) {
                                            // Don't allow the last character to be removed
                                            setDiscountValue(value)
                                          } else if (
                                            /^\d*\.?\d*$/.test(value)
                                          ) {
                                            const numericValue =
                                              parseFloat(value)
                                            if (
                                              numericValue >= 1 &&
                                              numericValue <= 100
                                            ) {
                                              setDiscountValue(value)
                                            }
                                          }
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="3">
                                    <h5 className="font-size-15 mt-2 mr-5">
                                      ₹{discountValue}
                                    </h5>
                                  </Col>
                                </Row>

                                <Row>
                                  {/* TDS */}
                                  <Col xs="2" style={{ width: "13%" }}>
                                    <p className="text-muted mb-0 mt-2">CGST</p>
                                  </Col>
                                  <Col xs="3">
                                    <FormGroup>
                                      <Input
                                        type="text"
                                        id="cgstInput"
                                        placeholder="Enter CGST"
                                        value={cgst}
                                        onChange={handleCGSTChange}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="2" style={{ width: "12%" }}>
                                    <p className="text-muted mb-0 mt-2">SGST</p>
                                  </Col>
                                  <Col xs="3">
                                    <FormGroup>
                                      <Input
                                        type="text"
                                        id="sgstInput"
                                        placeholder="Enter SGST"
                                        value={sgst}
                                        onChange={handleSGSTChange}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="3">
                                    <h5 className="font-size-15 mt-2 mr-5">
                                      ₹{gst}
                                    </h5>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs="4">
                                    <p className="text-muted mb-0 mt-2">
                                      Adjustments
                                    </p>
                                  </Col>
                                  <Col xs="5">
                                    <FormGroup>
                                      <Input
                                        type="text"
                                        placeholder="Enter More Adjustments"
                                        value={adjustmentsValue}
                                        onChange={e => {
                                          const value = e.target.value
                                          if (/^\d*\.?\d*$/.test(value)) {
                                            setAdjustmentsValue(value)
                                          }
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="3">
                                    <h5 className="font-size-15 mt-2 mr-5">
                                      ₹{adjustmentsValue}
                                    </h5>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs="12">
                                    <div className="container">
                                      <div className="custom-line"></div>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs="4">
                                    <p className="text-muted mb-0 mt-2 font-weight-bold">
                                      Total (₹)
                                    </p>
                                  </Col>
                                  <Col xs="5"></Col>
                                  <Col xs="3">
                                    <h5 className="font-size-15 mt-2 mr-5 font-weight-bold">
                                      ₹{total.toFixed(2)}
                                    </h5>
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className="terms">
                  <Col md={11}>
                    <Card className="overflow-hidden rounded-lg bg-light">
                      <CardBody className="pt-0">
                        <Col md={4} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                            Attach File(s) to Original Invoice
                          </div>

                          <InputGroup>
                            <input
                              type="file"
                              className="form-control"
                              id="fileUpload"
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                            />
                          </InputGroup>
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                        <Col md={5} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                            Attach File(s) to Invoice
                          </div>

                          <InputGroup>
                            <input
                              type="file"
                              className="form-control"
                              id="fileUpload"
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                            />
                          </InputGroup>
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={1}>
                    <div className="d-flex flex-column align-items-start mt-5 mb-5">
                      <button
                        type="submit"
                        className="btn btn-primary w-md mt-5"
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="d-flex flex-column align-items-start mt-5 mb-5">
                      <button
                        type="button"
                        className="btn btn-secondary w-mdq mt-5"
                        onClick={formik.resetForm}
                      >
                        Reset
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
              <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>
                  Add Customer{" "}
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={formikModal.handleSubmit}>
                    <Row className="mt-2">
                      <Col xs={12} md={4}>
                        <Label for="customerType">Customer Type*</Label>
                      </Col>
                      <Col xs={12} md={8}>
                        <FormGroup>
                          <Input
                            type="text"
                            id="customerType"
                            name="customerType"
                            value={formikModal.values.customerType}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                          />
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
                      <Col xs={12} md={8}>
                        <FormGroup>
                          <Input
                            type="text"
                            id="primaryContact"
                            name="primaryContact"
                            value={formikModal.values.primaryContact}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                          />
                          {formikModal.touched.primaryContact &&
                            formikModal.errors.primaryContact && (
                              <div className="text-danger">
                                {formikModal.errors.primaryContact}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <hr className="bdr-light xlg"></hr>
                      </Col>
                    </Row>
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
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
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
                      <Col xs={12} md={4} className="mt-2">
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
                      <Col xs="12">
                        <hr className="bdr-light xlg"></hr>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={4} className="mt-2">
                        <Label for="customerPhone">Mobile No.*</Label>
                      </Col>
                      <Col xs={12} md={8}>
                        <FormGroup>
                          <Input
                            type="text"
                            id="customerPhone"
                            name="customerPhone"
                            value={formikModal.values.customerPhone}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
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
                      <Col xs={12} md={4} className="mt-2">
                        <Label for="panCard">PANCARD*</Label>
                      </Col>
                      <Col xs={12} md={8}>
                        <FormGroup>
                          <Input
                            type="text"
                            id="panCard"
                            name="panCard"
                            value={formikModal.values.panCard}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                          />
                          {formikModal.touched.panCard &&
                            formikModal.errors.panCard && (
                              <div className="text-danger">
                                {formikModal.errors.panCard}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <hr className="bdr-light xlg"></hr>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={4} className="mt-2">
                        <Label for="gstNumber">GST Number</Label>
                      </Col>
                      <Col xs={12} md={8}>
                        <FormGroup>
                          <Input
                            type="text"
                            id="gstNumber"
                            name="gstNumber"
                            value={formikModal.values.gstNumber}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
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
                    <Row className="mt-2">
                      <Col xs={12} md={6}>
                        <FormGroup>
                          <Label for="address1">Address 1*</Label>
                          <Input
                            type="text"
                            id="address1"
                            name="address1"
                            value={formikModal.values.address1}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                          />
                          {formikModal.touched.address1 &&
                            formikModal.errors.address1 && (
                              <div className="text-danger">
                                {formikModal.errors.address1}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col xs={12} md={6}>
                        <FormGroup>
                          <Label for="address2">Address 2</Label>
                          <Input
                            type="text"
                            id="address2"
                            name="address2"
                            value={formikModal.values.address2}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col xs={12} md={6}>
                        <FormGroup>
                          <Label for="cityState">City/State*</Label>
                          <Input
                            type="text"
                            id="cityState"
                            name="cityState"
                            value={formikModal.values.cityState}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                          />
                          {formikModal.touched.cityState &&
                            formikModal.errors.cityState && (
                              <div className="text-danger">
                                {formikModal.errors.cityState}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col xs={12} md={6}>
                        <FormGroup>
                          <Label for="zipcode">Zipcode*</Label>
                          <Input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            value={formikModal.values.zipcode}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
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
                    <Row>
                      <Col xs="12">
                        <hr className="bdr-light xlg"></hr>
                      </Col>
                    </Row>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button color="success" onClick={handleConfirmApprove}>
                    Submit
                  </Button>
                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(SendBillTransaction)
