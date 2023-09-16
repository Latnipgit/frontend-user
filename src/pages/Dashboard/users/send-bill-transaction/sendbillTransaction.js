import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from 'react-select';
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
  CardTitle
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

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    { label: 'Alice', value: 'Alice' },
    { label: 'Bob', value: 'Bob' },
    { label: 'Charlie', value: 'Charlie' },
    { label: 'David', value: 'David' },
  ]);

  const handleInputChange = (inputValue) => {
    // Filter options based on user input
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };



  const [showModal, setShowModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [customerType, setCustomerType] = useState('Business');



  const handleAddCustomer = () => {
    debugger
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveCustomer = () => {
    if (newCustomerName) {
      setOptions([...options, { label: newCustomerName, value: newCustomerName }]);
      setSelectedOption({ label: newCustomerName, value: newCustomerName });
      setShowModal(false);
    }
  };

  const DropdownIndicator = (props) => {
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
    );
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h5 mb-4">Send Bill Transactions</CardTitle>

              <form onSubmit={formik.handleSubmit}>
                <Row>
                <Col xs={12} md={4}>
 
                <div>
      <label className="visually-hidden" htmlFor="customerSelect">
        Select Customer
      </label>
      <Select
        id="customerSelect"
        options={options}
        value={selectedOption}
        onChange={(selected) => setSelectedOption(selected)}
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
                onChange={(e) => setNewCustomerName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="customerType">
              <Form.Label>Customer Type</Form.Label>
              <Form.Check
                type="radio"
                label="Business"
                name="customerType"
                value="Business"
                checked={customerType === 'Business'}
                onChange={() => setCustomerType('Business')}
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

                  <Col xs={12} md={4}>
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
                        className="form-control mt-5"
                        placeholderText="Issue Date"
                        onBlur={() => formik.setFieldTouched("billDate", true)}
                      />
                    </InputGroup>
                    {formik.touched.billDate && formik.errors.billDate && (
                      <div className="text-danger mt-2">
                        {formik.errors.billDate}
                      </div>
                    )}
                  </Col>
                  <Col xs={12} md={4}>
                    <label className="visually-hidden" htmlFor="dueDate">
                      Due Date
                    </label>
                    <InputGroup>
                     
                      <DatePicker
                        selected={formik.values.dueDate}
                        onChange={date => formik.setFieldValue("dueDate", date)}
                        dateFormat="yyyy-MM-dd"
                        id="dueDate"
                        className="form-control mt-5"
                        placeholderText="Due Date"
                        onBlur={() => formik.setFieldTouched("dueDate", true)}
                      />
                    </InputGroup>
                    {formik.touched.dueDate && formik.errors.dueDate && (
                      <div className="text-danger mt-2">
                        {formik.errors.dueDate}
                      </div>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={4}>
                    <label className="visually-hidden mt-4" htmlFor="amount">
                      Amount
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-currency-inr"
                          aria-label="Indian Rupee Icon"
                        />
                      </div>
                      <Input
                        type="text"
                        className={`form-control mt-5`}
                        id="amount"
                        name="amount"
                        placeholder="Amount"
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
                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden"
                      htmlFor="invoiceDescription"
                    >
                      Invoice Description
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-file-document"
                          aria-label="Invoice Icon"
                        />
                      </div>
                      <Input
                        type="text"
                        className={`form-control mt-5`}
                        id="invoiceDescription"
                        name="invoiceDescription"
                        placeholder="Invoice Description"
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

                  <Col xs={12} md={4}>
                    <label className="visually-hidden" htmlFor="billNumber">
                      Bill Number
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-numeric"
                          aria-label="Bill Number Icon"
                        />
                      </div>
                      <Input
                        type="text"
                        className={`form-control mt-5`}
                        id="billNumber"
                        name="billNumber"
                        placeholder="Bill Number"
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
                  {/* Other form fields */}
                  {/* ... */}

                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="interestRate1"
                    >
                      Interest Rate after 30 days
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-calendar"
                          aria-label="Interest Rate After 30 Days Icon"
                        />
                      </div>
                      <Input
                        type="text"
                        className={`form-control mt-5`}
                        id="interestRate1"
                        name="interestRate1"
                        placeholder="Interest Rate after 30 days"
                        value={formik.values.interestRate1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="creditLimitDays"
                    >
                      Credit Limit Days
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
                        <i className="mdi mdi-credit-card" />
                      </div>
                      <input
                        type="text"
                        className={`form-control mt-5`}
                        id="creditLimitDays"
                        name="creditLimitDays"
                        placeholder="Credit Limit Days"
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
                  <Col xs={12} md={4}>
                    <label className="visually-hidden mt-4" htmlFor="remarks">
                      Remarks
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
                        <i
                          className="mdi mdi-comment-text-outline"
                          aria-label="Remarks Icon"
                        />
                      </div>
                      <textarea
                        className={`form-control mt-5`}
                        id="remarks"
                        placeholder="Remarks"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="uploadOriginalBill"
                    >
                      Upload Original Bill
                    </label>
                    <div className="input-group mt-5">
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

                  <Col xs={12} md={4}>
                    <label
                      className="visually-hidden mt-4"
                      htmlFor="uploadPurchaseOrder"
                    >
                      Upload Purchase Order
                    </label>
                    <InputGroup>
                      <div className="input-group-text mt-5">
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
                        className="form-control mt-5"
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

                  <Col xs={12} md={1}>
                    <div className="d-flex flex-column align-items-start mt-5 mb-5">
                      <button
                        type="submit"
                        className="btn btn-primary w-md"
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                  <Col xs={12} md={3}>
                    <div className="d-flex flex-column align-items-start mt-5 mb-5">
                      <button
                        type="button"
                        className="btn btn-secondary w-mdq"
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
