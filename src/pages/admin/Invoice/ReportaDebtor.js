import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
// import { mdiDelete, mdiPlus } from '@mdi/react';
//import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "../send-bill-transaction/sendbilltransaction.scss"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "./ReportedModel"
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
import TableContainer from "../../../components/Common/TableContainer";
import { getInvoices as ongetInvoices}  from '../../../store/actions'
import { useDispatch ,useSelector } from "react-redux";
// import { invoiceList } from "common/data"

  //Creditors

 
  const ReportDebtor = props => {
    const [modal1, setModal1] = useState(false);
    const toggleViewModal = () => setModal1(!modal1);

    const getInvoiceList  = useSelector(state => 
      console.log("getInvoiceList", state.invoices.invoiceDetail
      )

      )
   
    const dispatch = useDispatch();
     
    useEffect(()=>{
      dispatch(ongetInvoices());
    },[getInvoiceList])
    const sampleDataCreditors = [
      { "Refnumber": "#BF-001", "Buyer": "Rohan", "Amount": "8000", "DueFrom": "20 january 2022" , "status":"Pending"},
      { "Refnumber": "#BF-002", "Buyer": "harshit", "Amount": "15000", "DueFrom": "12 march 2022" , "status":"Complete"},
      { "Refnumber": "#BF-003", "Buyer": "akshay", "Amount": "8500", "DueFrom": "21 july 2022" , "status":"Pending"},
      { "Refnumber": "#BF-004", "Buyer": "ram", "Amount": "9400", "DueFrom": "20 january 2022" , "status":"Complete"},
      { "Refnumber": "#BF-005", "Buyer": "shyan", "Amount": "9900", "DueFrom": "20 january 2022" , "status":"Pending"},
  
    ];
    const columns = useMemo(
      () => [
        {
          Header: "#",
          filterable: false,
          disableFilters: true,
          Cell: cellProps => {
            return <input type="checkbox" className="form-check-input" />;
          },
        },
        {
          Header: "Customer Name",
          accessor: "Refnumber",
          filterable: false,
          disableFilters: true,
         
        },
        {
          Header: "Invoice No.",
          accessor: "",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: "Order No.",
          accessor: "",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: "Invoice Date",
          accessor: "",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: "Salesperson",
          accessor: "Amount",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: "Due Amount",
          accessor: "DueFrom",
          disableFilters: true,
          filterable: false,
         
        },
        {
          Header: "status",
          accessor: "status",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return (
<div>
  {cellProps.row.original.status == 'Complete'? <span className="text-success">{cellProps.row.original.status}</span>:<span className="text-danger">{cellProps.row.original.status}</span>}
</div>
            )}
        },
        {
          Header: "Action",
          accessor: "",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return (
<Button className="btn btn-danger btn-sm" onClick={()=>setModal1(true)}>
  Report a Defaulter
</Button>
            )}
        },
       
        
       
      ],
      []
    );
    const additionalValue = "Hello from additional prop!";

  return (
    <React.Fragment>
            <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue}/>

      <Card>
        <CardBody>
     
          <div className="mb-4 h4 card-title"></div>
          <br/>
          <br/>
          <br/>
          <div className="mb-4 h4 card-title">Invoice List</div>
          <TableContainer
            columns={columns}
            data={sampleDataCreditors}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(ReportDebtor)
