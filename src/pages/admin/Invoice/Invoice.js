import React, { useState, useEffect,useMemo} from "react"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import { getAllDebtors as ongetAllDebtors}  from '../../../../src/store/actions'
import { getAllInvoice as ongetAllInvoice}  from '../../../../src/store/actions'
// import "../../../pages/Dashboard/users/send-bill-transaction/sendbillTransaction"
import TableContainer from "../../../components/Common/TableContainer"
import SendbillTransaction from "../../../pages/Dashboard/users/send-bill-transaction/sendbillTransaction";

import moment from 'moment'
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
import InvoiceDetailViewModel from "./InvoiceDetailViewModel";
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

const Invoice = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
   
  })

  const [selectedOption, setSelectedOption] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false)
  const CloseshowInvoiceDetail = () => setShowInvoiceDetail(!showInvoiceDetail);

  const [newCustomerName, setNewCustomerName] = useState("")
  const [SelectedInvoice, setSelectedInvoice] = useState({})
  const [customerType, setCustomerType] = useState("Business")
  const [isDebtorExists, setisDebtorExists] = useState("false")

  var options =[
    { label: "Add Customer", value: "Add Customer", isAddCustomer: true },
    
  ] 
  const {GetAllDebtors} = useSelector(state=>({
    GetAllDebtors: state.DebtorsReducer.debtors!= undefined ? state.DebtorsReducer.debtors.response:[],
  }))
  const {GetAllInvoice} = useSelector(state=>({
    GetAllInvoice: state.DebtorsReducer.getInvoiceList!= undefined ? state.DebtorsReducer.getInvoiceList.response:[],
  }))
  console.log("GetAllInvoiceGetAllInvoice", GetAllInvoice)
const[datas, setdatas]= useState(options)
 
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(ongetAllDebtors());
  dispatch(ongetAllInvoice());
  
  if(GetAllDebtors != []){
    setisDebtorExists(true)
  }
  else{
    setisDebtorExists(false)
  }
 options=[ options]
},[])
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
console.log("selected.isAddCustomer", selected)
    if (selected.isAddCustomer) {
      setShowModal(true)
    } else {
      setSelectedOption(selected)
    }
  }
console.log("selectedOptionselectedOption", selectedOption)
  const handleCloseModal = () => {
    setShowModal(false)
  }


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

    setShowApproveModal(false);
  };

  const [showApproveModal, setShowApproveModal] = useState(false);


const handleSubmit =(values)=>{
const payload= [
  {
    "debtorId": "653d66ff46909fdc75ecdb6e",
    "billDate": formik.values.billDate,
    "billDescription": formik.values.billDescription,
    "billNumber":formik.values.billNumber,
    "creditAmount": formik.values.creditAmount,
    "remainingAmount": "800000", 
    "status": "OPEN",
    "interestRate": "9",
    "creditLimitDays": "20",
    "remark": "remarks",
    "items": [],
    "subTotal": "500",
    "tax": "50",
    "referenceNumber": "12",
    "invoiceNumber": "123",
    "dueDate": "2023-12-23",
    "percentage": "45",
     "purchaseOrderDocument": "654f7c6c802e51354055ba17",
    "challanDocument": "654f7c6c802e51354055ba17",
    "invoiceDocument": "654f7c6c802e51354055ba17",
    "transportationDocument": "654f7c6c802e51354055ba17"

}
]
console.log("PAyloadpayload", payload,formik.values)
}
const columns = useMemo(
  () => [
  
    {
      Header: "Customer Name",
      accessor: "debtor",
      filterable: false,
      disableFilters: true,
    },
    {
      Header: "Invoice #",
      accessor: "billNumber",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Order #",
      accessor: "Amount",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: "status",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Due Date",
      accessor: "billDate",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Amount",
      accessor: "creditAmount",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Due Balance",
      accessor: "remainingAmount",
      disableFilters: true,
      filterable: false,
    },
   

    {
      Header: "Action",
      accessor: "",
      disableFilters: true,
      filterable: false,
      Cell: cellProps => {
        return (
          <div>
            {console.log("ROWORW", cellProps.cell.row.original)}
        <Button className="btn btn-info btn-sm" onClick={()=>{
          setShowInvoiceDetail(true),
           setSelectedInvoice(cellProps.cell.row.original)
        }}>
        View Invoice
        </Button>
          </div>
        )
      },
    },
  ],
  []
)


  return (
    <Container fluid className="mt-5 mb-5">
      <InvoiceDetailViewModel isOpen={showInvoiceDetail} toggle={CloseshowInvoiceDetail} SelectedInvoice={SelectedInvoice}/>
    {isDebtorExists == false? 
    //  <Row>
    //     <Col lg={12}>
    //       <Card className="mt-5">
    //         <CardBody>
    //           <CardTitle className="h2 mb-4">
    //             <Row>
    //               <Col md={10}>
    //                 <h5>Invoice</h5>
    //               </Col>
    //               <Col md={2} className="text-end">
    //               <Button className="btn btn-sm btn-info" onClick={()=>setisDebtorExists(true)}> View Invoice List</Button>

    //               </Col>
    //               </Row> 

    //           </CardTitle>

    //           <form>
    //             <Row className="custom-row">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2">Customer Name*</div>
    //               </Col>
    //               <Col xs={12} md={9}>
    //                 <InputGroup>
    //                   <label
    //                     className="visually-hidden custom-content"
    //                     htmlFor="customerSelect"
    //                   >
    //                     Select Customer
    //                   </label>
    //                   <Select
    //                     id="customerSelect"
    //                     className="custom-content1"
    //                     options={datas}
    //                     value={selectedOption}
    //                     onChange={selected => handleOptionSelect(selected)}
    //                     onInputChange={handleInputChange}
    //                     placeholder="Select Or Add a Customer"
    //                   />

    //                   <Button
    //                     variant="outline-primary"
    //                     className="btn btn-primary border-0 advance-search-btn"
    //                     onClick={() => setShowApproveModal(true)}
    //                   >
    //                     <span className="search-icon">
    //                       <svg
    //                         version="1.1"
    //                         id="Layer_1"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         x="0"
    //                         y="0"
    //                         viewBox="0 0 512 512"
    //                         xmlSpace="preserve"
    //                         className="icon icon-sm align-text-bottom"
    //                         width="16"
    //                         height="16"
    //                       >
    //                         <path
    //                           fill="#FFF"
    //                           d="M421 97C365.3 4 244.4-26.3 151.5 29.4S28.3 205.9 83.9 298.8c49.5 82.6 150.5 115.7 237.5 83l66.3 110.7c10 16.7 31.7 22.1 48.4 12.1 16.7-10 22.1-31.7 12.1-48.4L382 345.6c70-61.4 88.4-166 39-248.6zm-85.6 239.5c-76.4 45.8-175.8 20.8-221.6-55.6S93 105.1 169.4 59.3 345.2 38.5 391 114.9s20.8 175.8-55.6 221.6z"
    //                         />
    //                       </svg>
    //                     </span>
    //                   </Button>
    //                 </InputGroup>
    //               </Col>
    //             </Row>
    //             <Row className="mt-2">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-3">Invoice#*</div>
    //               </Col>
    //               <Col xs={12} md={4}>
    //                 <label
    //                   className="visually-hidden mt-4"
    //                   htmlFor="Invoiocenumber"
    //                 >
    //                   Invoice Number
    //                 </label>
    //                 <InputGroup>
    //                   <Input
    //                     type="text"
    //                     className={`form-control custom-content mt-2`}
    //                     id="amount"
    //                     name="amount"
    //                     placeholder="Enter Invoice Number"
    //                     value={formik.values.amount}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                   />
    //                 </InputGroup>
    //                 {formik.touched.amount && formik.errors.amount && (
    //                   <div className="text-danger mt-2">
    //                     {formik.errors.amount}
    //                   </div>
    //                 )}
    //               </Col>
    //             </Row>
    //             <Row className="mt-2">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-3">Order Number</div>
    //               </Col>
    //               <Col xs={12} md={4}>
    //                 <label
    //                   className="visually-hidden mt-4"
    //                   htmlFor="Invoiocenumber"
    //                 >
    //                   Order Number
    //                 </label>
    //                 <InputGroup>
    //                   <Input
    //                     type="text"
    //                     className={`form-control custom-content mt-2`}
    //                     id="amount"
    //                     name="amount"
    //                        placeholder="Enter Order Number"
    //                     value={formik.values.amount}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                   />
    //                 </InputGroup>
    //               </Col>
    //             </Row>
    //             <Row className="mt-3">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-3">Invoice Date</div>
    //               </Col>
    //               <Col xs={12} md={3}>
    //                 <label
    //                   className="visually-hidden mt-4"
    //                   htmlFor="Invoiocenumber"
    //                 >
    //                   Invoice Date
    //                 </label>
    //                 <InputGroup>
    //                   <DatePicker
    //                     selected={formik.values.billDate || new Date()} // Use the selected value or default to today's date
    //                     onChange={date =>
    //                       formik.setFieldValue("billDate", date)
    //                     }
    //                     dateFormat="yyyy-MM-dd"
    //                     id="billDate"
    //                     className={`form-control custom-content mt-2`}
    //                     placeholderText="dd-mm-yyyy"
    //                     onBlur={() => formik.setFieldTouched("billDate", true)}
    //                   />
    //                 </InputGroup>
    //                 <br/>
    //                 <div className="mb-0  transactioin" style={{ paddingTop:'15px'}}>
    //                   To create transaction dated before 01/07/2017, click here
    //                 </div>
    //               </Col>
    //               <Col xs={12} md={1}>
    //                 <div className="mb-2 mt-3">Terms</div>
    //               </Col>
    //               <Col xs={12} md={2}>
    //                 <div className="d-inline">
    //                   <label
    //                     className="visually-hidden mt-5"
    //                     htmlFor="customerSelect"
    //                   >
    //                     Due on reciept
    //                   </label>
    //                   <Select
    //                     id="customerSelect"
    //                     className="custom-content"
    //                     options={options}
    //                     value={selectedOption}
    //                     onChange={selected => setSelectedOption(selected)}
    //                     onInputChange={handleInputChange}
    //                     placeholder="Due on reciept"
    //                     // isSearchable
    //                     // components={{ DropdownIndicator }}
    //                   />
    //                 </div>
    //               </Col>
    //               <Col xs={12} md={1}>
    //                 <div className="mb-2 mt-3">Due Date</div>
    //               </Col>
    //               <Col xs={12} md={2}>
    //                 <label
    //                   className="visually-hidden mt-4"
    //                   htmlFor="Invoiocenumber"
    //                 >
    //                   Due Date
    //                 </label>
    //                 <InputGroup>
    //                   <DatePicker
    //                     selected={formik.values.billDate || new Date()}
    //                     onChange={date =>
    //                       formik.setFieldValue("billDate", date)
    //                     }
    //                     dateFormat="yyyy-MM-dd"
    //                     id="billDate"
    //                     className={`form-control custom-content mt-2`}
    //                     placeholderText="dd-mm-yyyy"
    //                     onBlur={() => formik.setFieldTouched("billDate", true)}
    //                   />
    //                 </InputGroup>
    //               </Col>
    //             </Row>
    //             <Row className="mt-3">
    //               <Col xs="12">
    //                 <hr className="bdr-light xlg"></hr>
    //               </Col>
    //             </Row>
    //             <Row className="mt-3">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-2">Salesperson</div>
    //               </Col>
    //               <Col xs={12} md={4}>
    //                 <div className="d-inline">
    //                   <label
    //                     className="visually-hidden custom-content"
    //                     htmlFor="customerSelect"
    //                   >
    //                     Select Customer
    //                   </label>
    //                   <Select
    //                     id="customerSelect"
    //                     className="custom-content"
    //                     options={options}
    //                     value={selectedOption}
    //                     onChange={selected => setSelectedOption(selected)}
    //                     onInputChange={handleInputChange}
    //                     placeholder="Select or add a salesman"
    //                     // isSearchable
    //                     // components={{ DropdownIndicator }}
    //                   />
    //                 </div>
    //               </Col>
    //             </Row>
    //             <Row>
    //               <Col xs="12">
    //                 <hr className="bdr-light xlg"></hr>
    //               </Col>
    //             </Row>
    //             <Row className="mt-2">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-2">Subject</div>
    //               </Col>
    //               <Col xs={12} md={4}>
    //                 <div className="d-inline">
    //                   <label
    //                     className="visually-hidden custom-content"
    //                     htmlFor="customerSelect"
    //                   >
    //                     Select Customer
    //                   </label>
    //                   <textarea
    //                     className={`form-control custom-content`}
    //                     id="remarks"
    //                     placeholder="let your customer know what this invvoice is for "
    //                   />
    //                 </div>
    //               </Col>
    //             </Row>
    //             <Row>
    //               <Col xs="12">
    //                 <hr className="bdr-light xlg"></hr>
    //               </Col>
    //             </Row>
    //             <Row>
    //               <div className="h5 mb-4">Additional fields</div>
    //             </Row>
    //             <Row className="mt-2">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-3">Due From</div>
    //               </Col>
    //               <Col xs={12} md={3}>
    //                 <label
    //                   className="visually-hidden mt-4"
    //                   htmlFor="Invoiocenumber"
    //                 >
    //                   Invoice Date
    //                 </label>
    //                 <InputGroup>
    //                   <DatePicker
    //                     selected={formik.values.dueDate}
    //                     onChange={date => formik.setFieldValue("dueDate", date)}
    //                     dateFormat="yyyy-MM-dd"
    //                     id="dueDate"
    //                     className="form-control"
    //                     placeholderText="dd-mm-yyyy"
    //                     onBlur={() => formik.setFieldTouched("dueDate", true)}
    //                   />
    //                 </InputGroup>
    //                 {formik.touched.dueDate && formik.errors.dueDate && (
    //                   <div className="text-danger">{formik.errors.dueDate}</div>
    //                 )}
    //                 {/* <div className="mb-0 transactioin">
    //                   To create transaction dated before 01/07/2017, click here
    //                 </div> */}
    //               </Col>
    //               <Col xs={12} md={1}>
    //                 <div className="mb-2 mt-3">Amount</div>
    //               </Col>
    //               <Col xs={12} md={2}>
    //                 <div className="d-inline">
    //                   <label className="visually-hidden mt-4" htmlFor="amount">
    //                     Amount
    //                   </label>
    //                   <InputGroup>
    //                     <Input
    //                       type="text"
    //                       className={`form-control`}
    //                       id="amount"
    //                       name="amount"
    //                       placeholder="Enter amount"
    //                       value={formik.values.amount}
    //                       onChange={formik.handleChange}
    //                       onBlur={formik.handleBlur}
    //                     />
    //                   </InputGroup>
    //                   {formik.touched.amount && formik.errors.amount && (
    //                     <div className="text-danger mt-2">
    //                       {formik.errors.amount}
    //                     </div>
    //                   )}
    //                 </div>
    //               </Col>
    //               <Col xs={12} md={1}>
    //                 <div className="mb-2 mt-3">Invoice Detail</div>
    //               </Col>
    //               <Col xs={12} md={2}>
    //                 <label
    //                   className="visually-hidden"
    //                   htmlFor="invoiceDescription"
    //                 >
    //                   Invoice Description
    //                 </label>
    //                 <InputGroup>
    //                   <Input
    //                     type="text"
    //                     className={`form-control`}
    //                     id="invoiceDescription"
    //                     name="invoiceDescription"
    //                     placeholder="Enter invoice description"
    //                     value={formik.values.invoiceDescription}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                   />
    //                 </InputGroup>
    //                 {formik.touched.invoiceDescription &&
    //                   formik.errors.invoiceDescription && (
    //                     <div className="text-danger mt-2">
    //                       {formik.errors.invoiceDescription}
    //                     </div>
    //                   )}
    //               </Col>
    //             </Row>
    //             <Row className="mt-2">
    //               <Col xs={12} md={2}>
    //                 <div className="mb-2 mt-3">Interest Rate after 30 days</div>
    //               </Col>
    //               <Col xs={12} md={3}>
    //                 <div className="d-inline">
    //                   <label
    //                     className="visually-hidden mt-4"
    //                     htmlFor="interestRate1"
    //                   >
    //                     Interest Rate after 30 days
    //                   </label>
    //                   <InputGroup>
    //                     <Input
    //                       type="text"
    //                       className={`form-control`}
    //                       id="interestRate1"
    //                       name="interestRate1"
    //                       placeholder="Enter interest rate after 30 days"
    //                       value={formik.values.interestRate1}
    //                       onChange={formik.handleChange}
    //                       onBlur={formik.handleBlur}
    //                     />
    //                   </InputGroup>
    //                   {formik.touched.interestRate1 &&
    //                     formik.errors.interestRate1 && (
    //                       <div className="text-danger mt-2">
    //                         {formik.errors.interestRate1}
    //                       </div>
    //                     )}
    //                 </div>
    //               </Col>
    //               <Col xs={12} md={1}>
    //                 <div className="mb-2 mt-3">Bill Number</div>
    //               </Col>
    //               <Col xs={12} md={2}>
    //                 <label className="visually-hidden" htmlFor="billNumber">
    //                   Bill Number
    //                 </label>
    //                 <InputGroup>
    //                   <Input
    //                     type="text"
    //                     className={`form-controls`}
    //                     id="billNumber"
    //                     name="billNumber"
    //                     placeholder="Enter bill number"
    //                     value={formik.values.billNumber}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                   />
    //                 </InputGroup>
    //                 {formik.touched.billNumber && formik.errors.billNumber && (
    //                   <div className="text-danger mt-2">
    //                     {formik.errors.billNumber}
    //                   </div>
    //                 )}
    //               </Col>

    //               <Col xs={12} md={1}>
    //                 <div className="mb-2 mt-3">Credit Limit Days</div>
    //               </Col>
    //               <Col xs={12} md={2}>
    //                 <label
    //                   className="visually-hidden"
    //                   htmlFor="creditLimitDays"
    //                 >
    //                   Credit Limit Days
    //                 </label>
    //                 <InputGroup>
    //                   <input
    //                     type="text"
    //                     className={`form-control`}
    //                     id="creditLimitDays"
    //                     name="creditLimitDays"
    //                     placeholder="Enter credit limit days"
    //                     value={formik.values.creditLimitDays}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                   />
    //                 </InputGroup>
    //                 {formik.touched.creditLimitDays &&
    //                   formik.errors.creditLimitDays && (
    //                     <div className="text-danger mt-2">
    //                       {formik.errors.creditLimitDays}
    //                     </div>
    //                   )}
    //               </Col>
    //             </Row>

    //             <Row className="mt-3">
    //               <Col xs="12">
    //                 <hr className="bdr-light xlg"></hr>
    //               </Col>
    //             </Row>
    //             <Row className="Dragtable mt-3" >
    //               <div className="table-responsive" >
    //                 <table id="faqs" className="table table-hover custom-table 100vw">
    //                   <thead>
    //                     <tr>
    //                       <th>Item Detail</th>
    //                       <th>Quantity</th>
    //                       <th>Rate</th>
    //                       <th>Amount</th>
    //                       <th>+Add</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {data.map((row, index) => (
    //                       <tr key={index}>
    //                         {/* <td>{index + 1}</td> */}
    //                         <td className="hoverable-cell">
    //                           <textarea
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Enter item detail"
    //                             value={row.itemDetail}
    //                             onChange={e =>
    //                               handleItemDetailChange(index, e.target.value)
    //                             }
    //                           />
    //                         </td>
    //                         <td className="hoverable-cell">
    //                           <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Enter Quantity"
    //                             value={row.quantity}
    //                             onChange={e =>
    //                               handleQuantityChange(index, e.target.value)
    //                             }
    //                             onBlur={() => formatQuantity(index)}
    //                           />
    //                         </td>
    //                         <td className="hoverable-cell">
    //                           <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Enter Rate"
    //                             value={row.rate}
    //                             onChange={e =>
    //                               handleRateChange(index, e.target.value)
    //                             }
    //                             onBlur={() => formatRate(index)}
    //                           />
    //                         </td>
    //                         <td className="hoverable-cell">
    //                           <input
    //                             type="text"
    //                             className="form-control"
    //                             value={row.amount}
    //                             disabled
    //                           />
    //                         </td>
    //                         <td>
    //                           {index > 0 ? (
    //                             <span
    //                               className="icon-container delete-icon"
    //                               onClick={() => removeFaqsRow(index)}
    //                             >
    //                               <span className="mdi mdi-delete icon-red"></span>
    //                             </span>
    //                           ) : null}
    //                           <span
    //                             className="icon-container add-icon"
    //                             onClick={addFaqsRow}
    //                           >
    //                             <span className="mdi mdi-plus icon-yellow"></span>
    //                           </span>
    //                         </td>
    //                       </tr>
    //                     ))}
    //                   </tbody>
    //                 </table>
    //               </div>
    //             </Row>

    //             <Row className="Dragtable">
    //               <Col md={5} className="mt-5">
    //                 <div className="mb-2 mt-5">Costomer Notes </div>
    //                 <label className="visually-hidden" htmlFor="remarks">
    //                   Customer notes
    //                 </label>
    //                 <InputGroup>
    //                   <textarea
    //                     className={`form-control`}
    //                     id="remarks"
    //                     placeholder="Thanks for your buisness."
    //                   />
    //                 </InputGroup>
    //                 <div className="mb-0 transactioin">
    //                   Will be displayed on the invoice
    //                 </div>
    //               </Col>
    //               <Col md={1} className="mt-5"></Col>

    //               <Col md={6}>
    //                 <Card className="overflow-hidden rounded-lg bg-light">
    //                   <CardBody className="pt-0">
    //                     <Form>
    //                       <Row>
    //                         <Col sm={12}>
    //                           <div className="pt-4">
    //                             <Row>
    //                               {/* Subtotal */}
    //                               <Col xs="4">
    //                                 <p className="text-muted mb-0">Subtotal</p>
    //                               </Col>
    //                               <Col xs="5"></Col>
    //                               <Col xs="3">
    //                                 <h5 className="font-size-15">
    //                                   ₹{subtotal.toFixed(2)}
    //                                 </h5>
    //                               </Col>
    //                               {/* Discount */}
    //                             </Row>
    //                             <Row>
    //                               <Col xs="4">
    //                                 <p className="text-muted mb-0 mt-2">
    //                                   Discount
    //                                 </p>
    //                               </Col>
    //                               <Col xs="5">
    //                                 <FormGroup>
    //                                   <Input
    //                                     type="text"
    //                                     placeholder="Enter Discount"
    //                                     value={discountValue}
    //                                     onChange={e =>
    //                                       setDiscountValue(e.target.value)
    //                                     }
    //                                   />
    //                                 </FormGroup>
    //                               </Col>
    //                               <Col xs="3">
    //                                 <h5 className="font-size-15 mt-2 mr-5">
    //                                   ₹{discountValue}
    //                                 </h5>
    //                               </Col>
    //                             </Row>

    //                             <Row>
    //                               {/* TDS */}
    //                               <Col xs="4">
    //                                 <p className="text-muted mb-0 mt-2">GST</p>
    //                               </Col>
    //                               <Col xs="5">
    //                                 <FormGroup>
    //                                   <Input
    //                                     type="text"
    //                                     placeholder="Enter GST Per"
    //                                     value={gst}
    //                                     onChange={e => setGST(e.target.value)}
    //                                   />
    //                                 </FormGroup>
    //                               </Col>
    //                               <Col xs="3">
    //                                 <h5 className="font-size-15 mt-2 mr-5">
    //                                   ₹{gst}
    //                                 </h5>
    //                               </Col>
    //                             </Row>
    //                             <Row>
    //                               <Col xs="4">
    //                                 <p className="text-muted mb-0 mt-2">
    //                                   Adjustments
    //                                 </p>
    //                               </Col>
    //                               <Col xs="5">
    //                                 <FormGroup>
    //                                   <Input
    //                                     type="text"
    //                                     placeholder="Enter More Adjustments"
    //                                     value={adjustmentsValue}
    //                                     onChange={e =>
    //                                       setAdjustmentsValue(e.target.value)
    //                                     }
    //                                   />
    //                                 </FormGroup>
    //                               </Col>
    //                               <Col xs="3">
    //                                 <h5 className="font-size-15 mt-2 mr-5">
    //                                   ₹{adjustmentsValue}
    //                                 </h5>
    //                               </Col>
    //                             </Row>
    //                             <Row>
    //                               <Col xs="12">
    //                                 <div className="container">
    //                                   <div className="custom-line"></div>
    //                                 </div>
    //                               </Col>
    //                             </Row>
    //                             <Row>
    //                               <Col xs="4">
    //                                 <p className="text-muted mb-0 mt-2 font-weight-bold">
    //                                   Total (₹)
    //                                 </p>
    //                               </Col>
    //                               <Col xs="5"></Col>
    //                               <Col xs="3">
    //                                 <h5 className="font-size-15 mt-2 mr-5 font-weight-bold">
    //                                   ₹{total.toFixed(2)}
    //                                 </h5>
    //                               </Col>
    //                             </Row>
    //                           </div>
    //                         </Col>
    //                       </Row>
    //                     </Form>
    //                   </CardBody>
    //                 </Card>
    //               </Col>
    //             </Row>
    //             <Row className="terms">
    //               <Col md={12}>
    //                 <Card className="overflow-hidden rounded-lg bg-light">
    //                   <CardBody className="pt-0">
    //                     <Col md={5} className="mt-5">
    //                       <div className="mb-2 mt-5">Terms & Conditions</div>
    //                       <label className="visually-hidden" htmlFor="remarks">
    //                         Terms & Conditions
    //                       </label>
    //                       <InputGroup className="h-100">
    //                         <textarea
    //                           className={`form-control hoverable-cell"`}
    //                           id="remarks"
    //                           placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
    //                         />
    //                       </InputGroup>
    //                     </Col>
    //                     <Col md={5} className="mt-5 hoverable-cell">
    //                       <div className="mb-2 mt-5">
    //                         Attach File(s) to Invoice
    //                       </div>

    //                       <InputGroup>
    //                         <input
    //                           type="file"
    //                           className="form-control"
    //                           id="fileUpload"
    //                           accept=".pdf, .doc, .docx, .txt"
    //                           aria-describedby="fileUploadHelp"
    //                         />
    //                       </InputGroup>
    //                       <div id="fileUploadHelp" className="form-text">
    //                         Choose a file to upload (PDF, DOC, DOCX, TXT).
    //                       </div>
    //                     </Col>
    //                   </CardBody>
    //                 </Card>
    //               </Col>
    //             </Row>
    //             </form>
    //             <Row>
    //               <Col xs={12} md={1}>
    //                 <div className="d-flex flex-column align-items-start mt-5 mb-5">
    //                   <button
                   
    //                     className="btn btn-primary w-md mt-5"
    //                     onClick={()=>handleSubmit()}
    //                   >
    //                     Submit
    //                   </button>
    //                 </div>
    //               </Col>
    //               <Col xs={12} md={1}>
    //                 <div className="d-flex flex-column align-items-start mt-5 mb-5 ml-5" style={{ marginLeft:'35px'}}>
    //                   <button
    //                     type="button"
    //                     className="btn btn-secondary w-mdq mt-5"
    //                     onClick={formik.resetForm}
    //                   >
    //                     Reset
    //                   </button>
    //                 </div>
    //               </Col>
    //             </Row>
              
    //           <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
    //     <ModalHeader toggle={() => setShowModal(false)}>Advanced Search</ModalHeader>
    //     <ModalBody>
          
       
    //     </ModalBody>
    //     <ModalFooter>
    //       <Button color="secondary" onClick={() => setShowModal(false)}>
    //         Cancel
    //       </Button>
    //       <Button color="success" onClick={handleConfirmApprove}>
    //         Approve
    //       </Button>
    //     </ModalFooter>
    //   </Modal>
    //         </CardBody>
    //       </Card>
    //     </Col>
    //   </Row>
    <SendbillTransaction isDebtorExists = {isDebtorExists}/>
      :<Row className="mt-5">
        <Row className="mt-5">
          <Col md={8}>
            <h5>Invoice List</h5>
          </Col>
          <Col md={4} className="text-end">
            <Button className="btn btn-sm btn-info" onClick={()=>setisDebtorExists(false)}> <i className='bx bx-plus'></i> Create Invoice</Button>
          </Col>
        </Row>
<Row className="">
  <Row>
  <TableContainer
                columns={columns}
                data={GetAllInvoice != undefined? GetAllInvoice:[]}
                isGlobalFilter={false}
                isAddOptions={false}
                customPageSize={6}
              />
  </Row>

</Row>
      </Row>}
    </Container>
  )
}

export default withRouter(Invoice)
