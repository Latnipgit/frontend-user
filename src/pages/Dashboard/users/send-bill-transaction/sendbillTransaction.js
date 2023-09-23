import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
// import { mdiDelete, mdiPlus } from '@mdi/react';
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
  const [originalBillFileName, setOriginalBillFileName] = useState("")
  const [purchaseOrderFileName, setPurchaseOrderFileName] = useState("")

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

  const [startDate, setStartDate] = useState(null)
  const handleOriginalBillChange = event => {
    const selectedFile = event.target.files[0]
    formik.setFieldValue("uploadOriginalBill", selectedFile)
    setOriginalBillFileName(selectedFile ? selectedFile.name : "")
  }

  const handlePurchaseOrderChange = event => {
    const selectedFile = event.target.files[0]
    formik.setFieldValue("uploadPurchaseOrder", selectedFile)
    setPurchaseOrderFileName(selectedFile ? selectedFile.name : "")
  }
  //Dropdown cutomer

  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([
    { label: "Alice", value: "Alice" },
    { label: "Bob", value: "Bob" },
    { label: "Charlie", value: "Charlie" },
    { label: "David", value: "David" },
  ])

  const handleInputChange = inputValue => {
    // Filter options based on user input
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    setOptions(filteredOptions)
  }

  const [showModal, setShowModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [customerType, setCustomerType] = useState("Business")

  const handleAddCustomer = () => {
    debugger
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSaveCustomer = () => {
    if (newCustomerName) {
      setOptions([
        ...options,
        { label: newCustomerName, value: newCustomerName },
      ])
      setSelectedOption({ label: newCustomerName, value: newCustomerName })
      setShowModal(false)
    }
  }

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <button className="btn btn-primary mt-2" onClick={handleAddCustomer}>
            + Add Customer
          </button>
        ) : (
          props.children
        )}
      </components.DropdownIndicator>
    )
  }
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
    debugger
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
                  <Col xs={12} md={6}>
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
                        // isSearchable
                        // components={{ DropdownIndicator }}
                      />
                    </div>

                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Customer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="customerName">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter customer name"
                              value={newCustomerName}
                              onChange={e => setNewCustomerName(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="customerType">
                            <Form.Label>Customer Type</Form.Label>
                            <Form.Check
                              type="radio"
                              label="Business"
                              name="customerType"
                              value="Business"
                              checked={customerType === "Business"}
                              onChange={() => setCustomerType("Business")}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSaveCustomer}>
                          Save Customer
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Invoice#*</div>
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
                <Row className="mt-2">
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
                </Row>
                <Row className="mt-2">
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
                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Terms</div>
                  </Col>
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
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <hr className="bdr-light xlg"></hr>
                  </Col>
                </Row>
                <Row className="mt-2">
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
                        // isSearchable
                        // components={{ DropdownIndicator }}
                      />
                    </div>

                  </Col>
                </Row>
                <Row>
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
                </Row>
                <Row>
                  <Col xs="12">
                    <hr className="bdr-light xlg"></hr>
                  </Col>
                </Row>








           

                
                <Row className="Dragtable">
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
                              {index === 1 ? (
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
                    <div className="mb-2 mt-5">Costomer Notes </div>
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
                    <div className="mb-2">Will be displayed on the invoice</div>
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
                                        onChange={e =>
                                          setDiscountValue(e.target.value)
                                        }
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
                                  <Col xs="4">
                                    <p className="text-muted mb-0 mt-2">GST</p>
                                  </Col>
                                  <Col xs="5">
                                    <FormGroup>
                                      <Input
                                        type="text"
                                        placeholder="Enter GST Per"
                                        value={gst}
                                        onChange={e => setGST(e.target.value)}
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
                                        onChange={e =>
                                          setAdjustmentsValue(e.target.value)
                                        }
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
                  <Col md={12}>
                    <Card className="overflow-hidden rounded-lg bg-light">
                      <CardBody className="pt-0">
                        <Col md={5} className="mt-5">
                          <div className="mb-2 mt-5">Terms & Conditions</div>
                          <label className="visually-hidden" htmlFor="remarks">
                            Terms & Conditions
                          </label>
                          <InputGroup className="h-100">
                           
                            <textarea
                              className={`form-control`}
                              id="remarks"
                              placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
                            />
                          </InputGroup>
                        </Col>
                        <Col md={5} className="mt-5">
                          <div className="mb-2 mt-5">
                            Attach File(s) to Invoice
                          </div>
                          <label
                            className="visually-hidden"
                            htmlFor="fileUpload"
                          >
                            Choose a file to upload
                          </label>
                          <InputGroup>
                            <div className="input-group-text">
                              <i
                                className="mdi mdi-upload"
                                aria-label="Upload Icon"
                              />
                            </div>
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
                {/* Additonal Fields */}
                <Row>
                  <Col xs={12} md={2}>
                    <div className="mb-2">Due From</div>
                    <label className="visually-hidden" htmlFor="dueDate">
                      Due Date
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
                  <Col xs={12} md={3}>
                    <div className="mb-2 mt-5">Amount</div>
                    <label className="visually-hidden mt-4" htmlFor="amount">
                      Amount
                    </label>
                    <InputGroup>
                      {/* <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-currency-inr"
                          aria-label="Indian Rupee Icon"
                        />
                      </div> */}
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
                  </Col>
                  <Col xs={12} md={3}>
                    <div className="mb-2 mt-5">Invoice Descritption</div>
                    <label
                      className="visually-hidden"
                      htmlFor="invoiceDescription"
                    >
                      Invoice Description
                    </label>
                    <InputGroup>
                      {/* <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-file-document"
                          aria-label="Invoice Icon"
                        />
                      </div> */}
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
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-5">Bill Number</div>
                    <label className="visually-hidden" htmlFor="billNumber">
                      Bill Number
                    </label>
                    <InputGroup>
                      {/* <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-numeric"
                          aria-label="Bill Number Icon"
                        />
                      </div> */}
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
                </Row>
                <Row>
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-5">Interest Rate after 30 days</div>
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
                  </Col>
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-5">Credit Limit Days</div>
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
                  {/* <Col xs={12} md={3}>
                    <div className="mb-2 mt-5">
                      Attach File(s) to Certificate
                    </div>
                    <label className="visually-hidden" htmlFor="fileUpload">
                      Choose a file to upload
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-upload"
                          aria-label="Upload Icon"
                        />
                      </div>
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
                  <Col xs={12} md={3}>
                    <div className="mb-2 mt-5">
                      Attach File(s) to Purcchase Order
                    </div>
                    <label className="visually-hidden" htmlFor="fileUpload">
                      Choose a file to upload
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-upload"
                          aria-label="Upload Icon"
                        />
                      </div>
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
                  </Col> */}
                </Row>
                <Row>
                  <Col xs={12} md={4} className="mb-5">
                    <div className="mb-2 mt-5">Remarks</div>
                    <label className="visually-hidden" htmlFor="remarks">
                      Remarks
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-comment-text-outline"
                          aria-label="Remarks Icon"
                        />
                      </div>
                      <textarea
                        className={`form-control`}
                        id="remarks"
                        placeholder="Remarks"
                      />
                    </InputGroup>
                  </Col>
                </Row><Row>
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-5">Interest Rate after 30 days</div>
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
                  </Col>
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-5">Credit Limit Days</div>
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
                  {/* <Col xs={12} md={3}>
                    <div className="mb-2 mt-5">
                      Attach File(s) to Certificate
                    </div>
                    <label className="visually-hidden" htmlFor="fileUpload">
                      Choose a file to upload
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-upload"
                          aria-label="Upload Icon"
                        />
                      </div>
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
                  <Col xs={12} md={3}>
                    <div className="mb-2 mt-5">
                      Attach File(s) to Purcchase Order
                    </div>
                    <label className="visually-hidden" htmlFor="fileUpload">
                      Choose a file to upload
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-upload"
                          aria-label="Upload Icon"
                        />
                      </div>
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
                  </Col> */}
                </Row>
                <Row>
                  <Col xs={12} md={4} className="mb-5">
                    <div className="mb-2 mt-5">Remarks</div>
                    <label className="visually-hidden" htmlFor="remarks">
                      Remarks
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-comment-text-outline"
                          aria-label="Remarks Icon"
                        />
                      </div>
                      <textarea
                        className={`form-control`}
                        id="remarks"
                        placeholder="Remarks"
                      />
                    </InputGroup>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(SendBillTransaction)
