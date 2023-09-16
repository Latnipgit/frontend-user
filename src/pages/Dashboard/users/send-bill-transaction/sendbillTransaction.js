import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
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
  //     uploadPurchaseOrder: Yup.mixed().test(
  //     "fileFormat",
  //     "Only PDF, JPG, or PNG files are allowed",
  //     value => {
  //       if (!value) return true // Allow if no file is selected
  //       const supportedFormats = ["application/pdf", "image/jpeg", "image/png"]
  //       return supportedFormats.includes(value.type)
  //     }
  //   ),

  //   uploadPurchaseOrder: Yup.mixed().test(
  //     "fileFormat",
  //     "Only PDF, JPG, or PNG files are allowed",
  //     value => {
  //       if (!value) return true // Allow if no file is selected
  //       const supportedFormats = ["application/pdf", "image/jpeg", "image/png"]
  //       return supportedFormats.includes(value.type)
  //     }
  //   ),
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

  //table for adding items
  const [items, setItems] = useState([
    { item: '', quantity: '', rate: '', amount: '' },
  ]);

  const addItemRow = () => {
    setItems([...items, { item: '', quantity: '', rate: '', amount: '' }]);
  };

  const handleInputChangeADD = (event, index) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const removeItemRow = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const [faqsRow, setFaqsRow] = useState(0);

  const addFaqs = () => {
    setFaqsRow(faqsRow + 1);
  };

  const removeFaqsRow = (rowId) => {
    // Create a copy of the current state
    const updatedRows = [...faqsRow];

    // Remove the row with the specified rowId
    updatedRows.splice(rowId, 1);

    // Update the state with the modified rows
    setFaqsRow(updatedRows);
  };

  return (
    <Container fluid className="mt-5 mb-5">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h5 mb-4">Send Bill Transactions</CardTitle>

              <form onSubmit={formik.handleSubmit}>
                {/* select cutomer and create neew customer */}
                <Row>
                  <Col xs={12} md={6}>
                    <div className="mb-2">Customer Name</div>
                    <div>
                      <label
                        className="visually-hidden"
                        htmlFor="customerSelect"
                      >
                        Select Customer
                      </label>
                      <Select
                        id="customerSelect"
                        options={options}
                        value={selectedOption}
                        onChange={selected => setSelectedOption(selected)}
                        onInputChange={handleInputChange}
                        isSearchable
                        components={{ DropdownIndicator }}
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
                  <Col xs={12} md={2}>
                     <div className="mb-2">Invoice Issue Date</div>
                    <label className="visually-hidden" htmlFor="billDate">
                      Issue Date
                    </label>
                    <InputGroup>
                      <DatePicker
                        selected={formik.values.billDate}
                        onChange={date =>
                          formik.setFieldValue("billDate", date)
                        }
                        dateFormat="yyyy-MM-dd"
                        id="billDate"
                        className="form-control"
                        placeholderText="dd-mm-yyyy"
                        onBlur={() => formik.setFieldTouched("billDate", true)}
                      />
                    </InputGroup>
                    {formik.touched.billDate && formik.errors.billDate && (
                      <div className="text-danger mt-2">
                        {formik.errors.billDate}
                      </div>
                    )}
                  </Col>
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
                      <div className="text-danger">
                        {formik.errors.dueDate}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                <Col xs={12} md={2}>
                <div className="mb-2 mt-5">Invoice Number</div>
                    <label className="visually-hidden mt-4" htmlFor="amount">
                      Invoice Number
                    </label>
                    <InputGroup>
                      <Input
                        type="text"
                        className={`form-control`}
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
                  <Col xs={12} md={3}>
                  <div className="mb-2 mt-5">Upload Original Bill</div>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="uploadOriginalBill"
                    >
                      Upload Original Bill
                    </label>
                    <div className="input-group">
                      <label
                        className="input-group-text"
                        htmlFor="uploadOriginalBill"
                      >
                        <i className="mdi mdi-file-document" />
                      </label>
                      <input
                        type="file"
                        className="form-control visually-hidden"
                        id="uploadOriginalBill"
                        name="uploadOriginalBill"
                        accept=".pdf, .jpg, .png"
                        onChange={event => {
                          const selectedFile = event.currentTarget.files[0]
                          setOriginalBillFile(selectedFile)
                          setOriginalBillFileName(
                            selectedFile ? selectedFile.name : ""
                          )
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={originalBillFileName}
                        placeholder="Upload Original Bill"
                      />
                    </div>
                    {formik.errors.uploadOriginalBill && (
                      <div className="text-danger mt-2">
                        {formik.errors.uploadOriginalBill}
                      </div>
                    )}
                  </Col>
                  <Col xs={12} md={3}>
                  <div className="mb-2 mt-5">Upload Purchase Order</div>
                  <label
                      className="visually-hidden mt-4"
                      htmlFor="uploadOriginalBill"
                    >
                      Upload Purchase Order
                    </label>
                    <InputGroup>
                      <div className="input-group-text">
                        <i
                          className="mdi mdi-file-document"
                          aria-label="Upload Purchase Order Icon"
                        />
                      </div>
                      <input
                        type="file"
                        className="form-control-file visually-hidden"
                        id="uploadPurchaseOrder"
                        name="uploadPurchaseOrder"
                        accept=".pdf, .jpg, .png"
                        onChange={event => {
                          setPurchaseOrderFile(event.currentTarget.files[0])
                        }}
                      />
                      <label
                        className="form-control"
                        htmlFor="uploadPurchaseOrder"
                      >
                        Upload Purchase Order
                      </label>
                    </InputGroup>
                    {formik.errors.uploadPurchaseOrder && (
                      <div className="text-danger mt-2">
                        {formik.errors.uploadPurchaseOrder}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                <Col xs={12} md={4}>
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
           
                  <Col xs={12} md={1}>
                    <div className="d-flex flex-column align-items-start mt-5 mb-5">
                      <button type="submit" className="btn btn-primary w-md mt-5">
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
                <Row>
                <div>
      <table id="faqs" className="table table-hover">
        <thead>
          <tr>
            <th>Item Detail</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(faqsRow).keys()].map((index) => (
            <tr key={index}>
              <td><input type="text" className="form-control" placeholder="" /></td>
              <td><input type="text" placeholder="" className="form-control" /></td>
              <td><input type="text" placeholder="" className="form-control" /></td>
              <td><input type="text" placeholder="" className="form-control" /></td>
              <td className="mt-10">
                <button className="badge badge-danger" onClick={() => removeFaqsRow(index)}>
                  <i className="fa fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button onClick={addFaqs} className="badge badge-success">
          <i className="fa fa-plus"></i> ADD NEW
        </button>
      </div>
    </div>
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
