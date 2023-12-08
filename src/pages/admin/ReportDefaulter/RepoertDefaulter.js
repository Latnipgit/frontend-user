import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import { useFormik } from "formik"
// import "../send-bill-transaction/sendbilltransaction.scss"
import { addCustomerlist } from "../../../store/actions"
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
import { getAllDebtors as ongetAllDebtors}  from '../../../store/actions'
import { addInvoiceBill}  from '../../../store/actions'
// import { addFiles}  from '../../../store/actions'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


import * as moment from "moment";

const SendBillTransaction = (props) => {
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
 console.log("getDebtor",getDebtor)
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

  console.log("propsddd", props)
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
const [uploadInvoiceid,setuploadInvoiceId] = useState("")
const [uploadpurchaseId,setuploadpurchaseId] = useState("")
const [uploadChallanId,setuploadChallanId] = useState("")
const [uploadTransportId,setuploadTransportId] = useState("")
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
    console.log("FILEEE", event.target.files,fieldName)
    if (files.length > 0) {
      setFileData({ ...fileData, [fieldName]: files[0] })
    }
    const formData = new FormData();
   
    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);
   
 
    uploadFile(formData)


  }

  function uploadFile(formData){
    const token = localStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token :'',
    };
    console.log("HEADERDS", headers)
    // fetch('https://bafana-backend.azurewebsites.net/api/files/upload', {
    //   method: 'POST',
    //   body: formData,headers,
    // })
    // .then(response => response.json())
    // .then(lang => response['lang'].slice(-2))
    //   console.log("payloaddddddd",formData)

    //   .then(success => {
    //     console.log("payloaddddddd success",success)

    //     // Do something with the successful response
    //   })
    //   .catch(error => console.log("payloaddddddd error",error)
    // );
    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
      })       
.then((response) => {
  console.log("Response", response)
  if(response.data.response.fieldName == "uploadInvoice"){
    setuploadInvoiceId(response.data.response.documentId)
  }
  if(response.data.response.fieldName == "uploadPurchaseOrder"){
    setuploadpurchaseId(response.data.response.documentId)
  }
  if(response.data.response.fieldName == "uploadchallanDispatchDocument"){
    setuploadChallanId(response.data.response.documentId)
  }
  if(response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`"){
    setuploadTransportId(response.data.response.documentId)
  }
})
.catch((error) => {
  console.log("Response", error)

})
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
    // console.log("selectedOption.value",selectedOption.value!= undefined ? selectedOption.value.slice(-4):"Hello")
console.log("selectedOption",selectedOption.value != null ? selectedOption.value.slice(-6).toUpperCase():'')
  const handleFormSubmitSendBill = item => {
    const dueDated = moment(item.dueDate).format("YYYY-MM-DD")
    const inVoiceDated = moment(item.invoiceDate).format("YYYY-MM-DD")

   

  const dummy=[{
      "debtorId": selectedOption.value,
      "billDate": inVoiceDated,
      "billDescription": "",
      "billNumber": "",
      "creditAmount": total,
      "remainingAmount": total, 
      "status": "",
      "interestRate": "",
      "creditLimitDays": "",
      "remark": "",
      "items": data,
      "subTotal": subtotal,
      "tax": cgst != ''? cgst :sgst,
      "referenceNumber": selectedOption.value != null ? "BAF"+"-"+ selectedOption.value.slice(-6).toUpperCase():'',
      "invoiceNumber": "BAF"+"-"+item.invoiceNumber,
      "dueDate": dueDated,
      "percentage": "",
      "purchaseOrderDocument": uploadpurchaseId,
      "challanDocument": uploadChallanId,
      "invoiceDocument": uploadInvoiceid,
      "transportationDocument": uploadTransportId

}]
if(uploadInvoiceid == ''){

  toast.error("Please Upload Invoice File")
}
else{
  dispatch(addInvoiceBill(dummy))
}
 


  }
useEffect(()=>{
  console.log("getAllDebtorsList",getAllDebtorsList)
  dispatch(ongetAllDebtors());
  setgetDebtor(getAllDebtorsList!= undefined? getAllDebtorsList:[])

  setDebtorsList( getAllDebtorsList != undefined && getAllDebtorsList.length != 0 ? getAllDebtorsList.map((item)=>{
    return {
      "value": item.id , "label":  item.firstname+" "+item.lastname
    }
  }):[])
},[])
 return (
    <Container fluid className="mt-5 mb-5 text-capitalize">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h2 mb-4">
                 <Row>
                   <Col md={10}>
                     <h5>Report Defaulter</h5>
                   </Col>
                   {/* <Col md={2} className="text-end"> */}
                   {/* <Button className="btn btn-sm btn-info" onClick={()=>window.location.reload()}> Rep</Button>

                   </Col> */}
        </Row> 

               </CardTitle>
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
      <ToastContainer />

    </Container>
  )
}

export default withRouter(SendBillTransaction)
