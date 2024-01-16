import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import { getAllDebtors as ongetAllDebtors } from '../../../../src/store/actions'
//import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import { getAllInvoice } from "../../../../src/store/debtors/debtors.actions";
// import "../../../pages/Dashboard/users/send-bill-transaction/sendbillTransaction"
import TableContainer from "../../../components/Common/TableContainer"
import SendbillTransaction from "../../../pages/Dashboard/users/send-bill-transaction/sendbillTransaction";
// ES6
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
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
// import { colors } from "react-select/dist/declarations/src/theme";
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
const ButtonViewModel = (value) => {
  return <div>
    <Button onClick={() => ViewClick(value)}>
      submit
    </Button>
  </div>
}
const Invoice = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,

  })
  const [validationMessage, setValidationMessage] = useState("")

  const [selectedOption, setSelectedOption] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelInvoice, setShowModelInvoice] = useState(false);
  const toggleViewModel = () => {
    setShowModelInvoice(!showModelInvoice);
  }

  const [newCustomerName, setNewCustomerName] = useState("")
  const [SelectedInvoice, setSelectedInvoice] = useState('')
  const [customerType, setCustomerType] = useState("Business")
  const [isDebtorExists, setisDebtorExists] = useState("false")

  var options = [
    { label: "Add Customer", value: "Add Customer", isAddCustomer: true },

  ]
  const { GetAllDebtors } = useSelector(state => ({
    GetAllDebtors: state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response : [],
  }))
  const { GetAllInvoice } = useSelector(state => ({
    GetAllInvoice: state.DebtorsReducer.getInvoiceList != undefined ? state.DebtorsReducer.getInvoiceList.response : [],
  }))

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ongetAllDebtors());
    dispatch(getAllInvoice());

    if (GetAllDebtors != []) {
      setisDebtorExists(true)
    }
    else {
      setisDebtorExists(false)
    }
    options = [options]
  }, [])






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


  const handleSubmit = (values) => {
    const payload = [
      {
        "debtorId": "653d66ff46909fdc75ecdb6e",
        "billDate": formik.values.billDate,
        "billDescription": formik.values.billDescription,
        "billNumber": formik.values.billNumber,
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
  }
  const viewModel = (value) => {



    setSelectedInvoice(value)
    setShowModelInvoice(true)

  }


  const columns = useMemo(() => [

    {
      Header: "Customer Name",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },

      accessor: "",
      filterable: false,
      disableFilters: true,
      Cell: cellProps => {
        return (<div className="text-capitalize" >{cellProps.original.debtor.firstname + " " + cellProps.original.debtor.lastname}</div>

        )
      }
    },
    {
      Header: "Refrence #",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },

      accessor: "referenceNumber",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Invoice #",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },

      accessor: "invoiceNumber",
      disableFilters: true,
      filterable: false,
    },

    {
      Header: "Status",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },

      accessor: "status",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Due Date",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },

      accessor: "billDate",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Amount",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600', },
      style: { padding: "15px" },

      accessor: "creditAmount",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Due Balance",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },

      accessor: "remainingAmount",
      disableFilters: true,
      filterable: false,
    },



    {
      Header: "Action",
      headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
      style: { padding: "15px" },
      accessor: "",
      disableFilters: true,
      filterable: false,
      Cell: (cellProps) => (
        <div>
          <Button className="btn btn-info btn-sm"
            onClick={() => viewModel(cellProps.original)}
          >
            View Invoice
          </Button>

        </div>
      )
    },



  ]
  )

  return (
    <Container fluid className="mt-5 mb-5">

      <InvoiceDetailViewModel isOpen={showModelInvoice} toggle={toggleViewModel} SelectedInvoice={SelectedInvoice} />
      {isDebtorExists == false ?
        <SendbillTransaction isDebtorExists={isDebtorExists} />
        : <Row className="mt-5">
          <Row className="mt-5">
            <Col md={8}>
              <h5 > &nbsp; &nbsp;&nbsp;Invoice List</h5>
            </Col>
            <Col md={4} className="text-end">
              <Button className="btn btn-sm btn-info" onClick={() => setisDebtorExists(false)}> <i className='bx bx-plus'></i> Create Invoice</Button>
            </Col>
            <Row>
            </Row>
            <Row className="p-4  ml-5">

              <ReactTable
                data={GetAllInvoice != undefined ? GetAllInvoice : []}
                columns={columns}
                showPagination={true}
                showPaginationTop={false}
                showPaginationBottom={true}
                showPageSizeOptions={true}
                defaultPageSize={5}
              />

            </Row>
          </Row>
        </Row>}
    </Container>
  )
}

export default withRouter(Invoice)
