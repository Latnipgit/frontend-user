import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import { useFormik } from "formik"
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
  customerName: Yup.string().required(
    "Customer Name is required. Please filll the field"
  ),
  referenceNumber: Yup.string().required(
    "Customer Name is required. Please filll the field"
  ),
  invoiceNumber: Yup.string().required(
    "Invoice number  is required. Please filll the field"
  ),
  invoicebillDate: Yup.date().required(
    "Invvoice date is requred choose from the datepicker"
  ),
  dueDate: Yup.date().required(
    "Due Date is required choose from the datepicker"
  ),
  uploadOriginalBill: Yup.mixed().required("Original Bill is required"),
  uploadPurchaseOrder: Yup.mixed().required("Purchase Order is required"),
})

const initialValues = {
  customerName: "",
  referenceNumber: "",
  invoiceNumber: "",
  invoicebillDate: null,
  billDate: "",
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
  const [selectedOption, setSelectedOption] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [customerType, setCustomerType] = useState("Business")

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

  const [options, setOptions] = useState([
    { label: "Alice", value: "Alice" },
    { label: "Bob", value: "Bob" },
    { label: "Charlie", value: "Charlie" },
    { label: "David", value: "David" },
    { label: "Add Customer", value: "Add Customer", isAddCustomer: true },
  ])

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
        quantity: "",
        rate: "",
        amount: "₹",
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

  const [discountValue, setDiscountValue] = useState()
  const [discount, setDiValue] = useState(0)
  const [gst, setGST] = useState(0)
  const [adjustmentsValue, setAdjustmentsValue] = useState(0)
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
  const [showcgst, setshowCGST] = useState("")
  const [showsgst, setshowsGST] = useState("")
  const [sgst, setSGST] = useState("")

  const handleCGSTChange = e => {
    debugger
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= 100)
      ) {
        const numericValue = parseFloat(value)
        const CGSTAmount = (subtotal * numericValue) / 100
        setCGST(value)
        setshowCGST(CGSTAmount.toFixed(2))
        setTotal(total + CGSTAmount)
      }
    }
  }

  const handleSGSTChange = e => {
    debugger
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= 100)
      ) {
        const numericValue = parseFloat(value)
        const SGST = (subtotal * numericValue) / 100
        setSGST(value)
        setshowsGST(SGST.toFixed(2))
        const TotalUpdate = total + SGST
        setTotal(TotalUpdate)
      }
    }
  }

  const handleAddittionalChange = e => {
    const value = e.target.value
    if (value.length === 0) {
      setAdjustmentsValue(0)
    } else if (/^\d+(\.\d{0,2})?$/.test(value)) {
      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= 100)
      ) {
        const numericValue = parseFloat(value)
        if (numericValue >= 0 && numericValue <= 100) {
          setAdjustmentsValue(value)
          setTotal(total + value)
        }
      }
    }
  }

  const handleDiscountChange = e => {
    const value = e.target.value
    if (value.length === 0) {
      setDiValue(0)
    } else if (/^\d+(\.\d{0,2})?$/.test(value)) {
      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= 100)
      ) {
        const numericValue = parseFloat(value)
        if (numericValue >= 0 && numericValue <= 100) {
          const discountAmount = (subtotal * numericValue) / 100
          setDiValue(discountAmount.toFixed(2))
          setTotal(total - discountAmount)
        }
      }
    }
  }

  ///MODAL FUNCTION
  const formikModal = useFormik({
    initialValues: {
      customerType: "",
      // primaryContact: "",
      firstname:"",
      lastname:"",
      salutation:"",
      companyName: "",
      customerEmail: "",
      customerPhone: "",
      gstNumber: "",
      panCard: "",
      address1: "",
      address2: "",
      city:"",
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

  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 3)
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
                          <Modal.Title>Add New Customer</Modal.Title>
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
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control custom-content mt-2`}
                        id="referenceNumber"
                        name="referenceNumber"
                        placeholder="Enter reference number"
                        value={formik.values.referenceNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.amount && formik.errors.referenceNumber && (
                      <div className="text-danger mt-2">
                        {formik.errors.referenceNumber}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Invoice number*</div>
                  </Col>
                  <Col xs={12} md={4}>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control custom-content mt-2`}
                        id="invoiceNumber"
                        name="invoiceNumber"
                        placeholder="Enter invoice number"
                        value={formik.values.invoiceNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.invoiceNumber &&
                      formik.errors.invoiceNumber && (
                        <div className="text-danger mt-2">
                          {formik.errors.invoiceNumber}
                        </div>
                      )}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12} md={2}>
                    <div className="mb-2 mt-3">Invoice Date</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <InputGroup>
                      <DatePicker
                        selected={formik.values.invoicebillDate || new Date()}
                        onChange={date =>
                          formik.setFieldValue("invoicebillDate", date)
                        }
                        dateFormat="dd-mm-yyyy" // Format to display year, month, and day
                        id="invoicebillDate"
                        className="form-control custom-content mt-2"
                        onBlur={() =>
                          formik.setFieldTouched("invoicebillDate", true)
                        }
                        minDate={minDate} // Set the minimum datev
                      />
                    </InputGroup>
                    {/* <div className="mb-0 transactioin">
                      To create transaction dated before 01/07/2017, click here
                    </div> */}
                  </Col>
                  <Col xs={12} md={1}>
                    <div className="mb-2 mt-3">Due Date</div>
                  </Col>
                  <Col xs={12} md={2}>
                    <InputGroup>
                      <DatePicker
                        selected={formik.values.billDate || new Date()}
                        onChange={date =>
                          formik.setFieldValue("billDate", date)
                        }
                        dateFormat="dd-mm-yyyy"
                        id="billDate"
                        className={`form-control custom-content mt-5`}
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
                  <Col md={5} className="mt-5"></Col>
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
                                    <p className="text-muted mb-0 mt-2">SGST</p>
                                  </Col>
                                  <Col xs="5">
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
                                  <Col xs="3">
                                    <h5 className="font-size-15 mt-2 mr-5">
                                      ₹{showcgst}
                                    </h5>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs="4">
                                    <p className="text-muted mb-0 mt-2">CGST</p>
                                  </Col>
                                  <Col xs="5">
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
                                      ₹{showsgst}
                                    </h5>
                                  </Col>
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
                                        onChange={handleDiscountChange}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="3">
                                    <h5 className="font-size-15 mt-2 mr-5">
                                      ₹{discount}
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
                                        onChange={handleAddittionalChange}
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
                              inline
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
                                checked={
                                  formikModal.values.customerType === "Business"
                                }
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
                              />{" "}
                              Business
                            </Label>
                          </div>
                          <div>
                            <Label
                              check
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
                                checked={
                                  formikModal.values.customerType ===
                                  "Individual"
                                }
                                onChange={formikModal.handleChange}
                                onBlur={formikModal.handleBlur}
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
                            placeholder="Custtomer Email"
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
                            type="text"
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
                            value={formikModal.values.panCard}
                            onChange={formikModal.handleChange}
                            onBlur={formikModal.handleBlur}
                            placeholder="Enter Pan Number"
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
                      <Col xs={12} md={2} className="mt-1">
                        <Label for="gstNumber">GST Number</Label>
                      </Col>
                      <Col xs={12} md={5}>
                        <FormGroup>
                          <Input
                            type="text"
                            id="gstNumber"
                            name="gstNumber"
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
                    <Label for="cityState">State*</Label>
                      </Col> 
                      <Col xs={12} md={6} className="mt-1">
                        <FormGroup>
                      
                          <Input
                            type="text"
                            id="city"
                            name="city"
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
                    <Label for="cityState">City</Label>
                      </Col> 
                      <Col xs={12} md={6} className="mt-1">
                        <FormGroup>
                      
                          <Input
                            type="text"
                            id="state"
                            name="state"
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
                            type="text"
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
