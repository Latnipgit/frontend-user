import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import { useFormik } from "formik"
import "../send-bill-transaction/sendbilltransaction.scss"
import { addCustomerlist } from "../../../../store/actions"
import { useSelector, useDispatch } from "react-redux"
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
import { getAllDebtors as ongetAllDebtors}  from '../../../../store/actions'
import { addInvoiceBill}  from '../../../../store/actions'
import debtorslist from "pages/admin/DebtorsList/debtorslist"

import * as moment from "moment";

const SendBillTransaction = () => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [customerType, setCustomerType] = useState("Business")
  const [DebtorsList, setDebtorsList] = useState([])
  const [getDebtor, setgetDebtor] = useState([])

  const colourStyles = {
    menuList: styles => ({
        ...styles,
        background: '#FFFFFF'
    })
 
  }
 
  const { getAllDebtorsList } = useSelector(state => ({
    getAllDebtorsList: state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response:[],
   }));

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
    DebtorsID: "",
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
    uploadPurchaseOrder: "",
    uploadchallanDispatchDocument: "",
    uploadInvoice: "",
    uploadTransportationDocumentDeliveryReceipt: "",
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      // Handle form submission logic here
    
    },
  })

  
  const [salutations, setsalutations] = useState([
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss", value: "Miss" },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
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
console.log("selectedOption", selectedOption)
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
  const [fileData, setFileData] = useState({
    uploadPurchaseOrder: null,
    uploadchallanDispatchDocument: null,
    uploadInvoice: null,
    uploadTransportationDocumentDeliveryReceipt: null,
  })
  const handleFileChange = (event, fieldName) => {
    const files = event.target.files
    if (files.length > 0) {
      setFileData({ ...fileData, [fieldName]: files[0] })
    }
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
    const value = parseFloat(e.target.value)
    if (value.length == 0) {
      setAdjustmentsValue(0)
    } else {
      
        setAdjustmentsValue(value)
      
        setTotal(total+value)
        
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
  const handleFormSubmit = item => {
    
   
    const dummy =[
      {
        "debtorType": item.customerType,
        "salutation":selectedOption.value,
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

  const formikSendBill = useFormik({
    initialValues: {
    customerName:"",
    RefrenceNumber:"",
    invoiceNumber:"",
    invoiceDate:"",
    dueDate:"",
    itemDetail:[],
    subtotal:"",
    tax:"",
    discount:"",
    adjustment:"",
    grandTotal:"",
    puchaseOrderFile:"",
    challanfile:"",
    invoiceFile:"",
    TransportFile:""
    },})

  const handleFormSubmitSendBill = item => {
    const dueDated = moment(new Date(item.dueDate)).format("DD-MM-YYYY")
    const inVoiceDated = moment(new Date(item.invoiceDate)).format("DD-MM-YYYY")

   

  const dummy=[  {
      "debtorId": selectedOption.value,
      "billDate": inVoiceDated,
      "billDescription": "bill Description Nit",
      "billNumber": "65456",
      "creditAmount": total,
      "remainingAmount": "986", 
      "status": "as",
      "interestRate": "2",
      "creditLimitDays": "20",
      "remark": "asasas",
      "items": data,
      "subTotal": subtotal,
      "tax": cgst != ''? cgst :sgst,
      "referenceNumber": "654VF55",
      "invoiceNumber": item.invoiceNumber,
      "dueDate": dueDated,
      "percentage": "5"

}]
    dispatch(addInvoiceBill(dummy))
  }
useEffect(()=>{
  dispatch(ongetAllDebtors());
  setDebtorsList(getDebtor!= undefined && getDebtor.length != 0 ? getDebtor.map((item)=>{
    return {
      "value": item.id , "label":  item.firstname+" "+item.lastname
    }
  }):[])
  setgetDebtor(getAllDebtorsList!= undefined? getAllDebtorsList:[])
},[getDebtor])
 return (
    <Container fluid className="mt-5 mb-5 text-capitalize">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h2 mb-4">Send Bill Transactions</CardTitle>

              <form>
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
                        options={DebtorsList}
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
                        disabled
                        name="referenceNumber"
                        placeholder="Enter Reference number"
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
                        type="number"
                        className={`form-control custom-content mt-2`}
                        id="invoiceNumber"
                        name="invoiceNumber"
                        placeholder="Enter Invoice number"
                        // value={formikSendBill.values.invoiceNumber}
                        onChange={number =>
                          formikSendBill.setFieldValue("invoiceNumber", number.target.value)
                        }
                        // onBlur={formik.handleBlur}
                      />
                    </InputGroup>
                    {formik.touched.invoiceNumber &&
                      formik.errors.invoiceNumber && (
                        <div className="text-danger mt-2">
                          {formikSendBill.errors.invoiceNumber}
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
                        selected={formikSendBill.values.invoiceDate || new Date()}
                        onChange={date =>
                          formikSendBill.setFieldValue("invoiceDate", date)
                        }
                        dateFormat="dd-MMM-yyyy" // Format to display year, month, and day
                        id="invoicebillDate"
                        className="form-control custom-content mt-2"
                        onBlur={() =>
                          formikSendBill.setFieldTouched("invoiceDate", true)
                        }
                        //minDate={minDate} // Set the minimum datev
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
                        selected={formikSendBill.values.dueDate || new Date()}
                        onChange={date =>
                          formikSendBill.setFieldValue("dueDate", date)
                        }
                        dateFormat="dd-MMM-yyyy" // Format to display year, month, and day
                        id="billDate"
                        className={`form-control custom-content mt-5`}
                        placeholderText="dd-mm-yyyy"
                        onBlur={() => formikSendBill.setFieldTouched("dueDate", true)}
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
                                placeholder="Enter Item Detail"
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
                                        type="number"
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
                                        type="number"
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
                                        type="number"
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
                                        type="number "
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
                                      ₹{total.toFixed()}
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
                        Upload File to Purchase Order
                          </div>

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
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                        <Col md={5} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                          Upload File to challan / Dispatch Document
                          </div>

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
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
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
                          Upload File to Invoice
                          </div>

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
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                        <Col md={5} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                          Upload File to Transportation Document / Delivery
                            Receipt
                          </div>

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
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                </form>
                <Row>
                  <Col xs={12} md={1}>
                    <div className="d-flex flex-column align-items-start mt-5 mb-5">
                      <button
                        className="btn btn-primary mt-5"
                        onClick={() => handleFormSubmitSendBill(formikSendBill.values)}
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
                                onChange={()=>[
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
                                onChange={()=>[
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(SendBillTransaction)
