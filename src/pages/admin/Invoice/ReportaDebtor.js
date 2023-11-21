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
import ReportedDefaulterModel from './ReportDefaulterModel'
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
import { success } from "toastr"
// import { invoiceList } from "common/data"

  //Creditors

 
  const ReportDebtor = props => {
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggleViewModal = () => setModal1(!modal1);
    const toggleViewModal1 = () => setModal2(!modal2);

    const getInvoiceList  = useSelector(state => 
      console.log("getInvoiceList", state.invoices.invoiceDetail
      )

      )
   
    const dispatch = useDispatch();
     
    useEffect(()=>{
      dispatch(ongetInvoices());
    },[getInvoiceList])
    const sampleDataCreditors = [
      { "Refnumber": "#BF-001", "invoiveno":"BAF-9696" ,"Buyer": "Rohan", "Days":"120 Days","Amount": "8000", "DueFrom": "20 january 2022" , "status":"Pending"},
      { "Refnumber": "#BF-002", "invoiveno":"BAF-9699" ,"Buyer": "harshit","Days":"130 Days", "Amount": "15000", "DueFrom": "12 march 2022" , "status":"Complete"},
      { "Refnumber": "#BF-003", "invoiveno":"BAF-9698" ,"Buyer": "akshay", "Days":"120 Days","Amount": "8500", "DueFrom": "21 july 2022" , "status":"Pending"},
      { "Refnumber": "#BF-004", "invoiveno": "BAF-9689" ,"Buyer": "ram", "Days":"90 Days","Amount": "9400", "DueFrom": "20 january 2022" , "status":"Complete"},
      { "Refnumber": "#BF-005", "invoiveno": "BAF-9690","Buyer": "shyan","Days":"170 Days", "Amount": "9900", "DueFrom": "20 january 2022" , "status":"Pending"},
  
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
          Header: "Refrence Number",
          accessor: "Refnumber",
          filterable: false,
          disableFilters: true,
         
        },
        {
          Header: "Invoice No.",
          accessor: "invoiveno",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: "Customer Name",
          accessor: "Buyer",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: "Due Amount",
          accessor: "Amount",
          disableFilters: true,
          filterable: false,
       
        },
        {
          Header: 'Due From',
          disableFilters: true,
          filterable: false,
          accessor: (row) => {
            console.log("YUHYUH",row)
          },
          Cell: cellProps => {
            return (
<div className="">
  <div className=" text-center bg-success rounded text-light">
  <div className="text-capitalize">{cellProps.row.original.Days}</div>
  <div className="text-capitalize" >{cellProps.row.original.DueFrom}</div>
  </div>
</div>
            )}
        },

       
        {
          Header: "Action",
          accessor: "status",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return (
<div>
  <Button className="btn btn-sm btn-info"
  onClick={toggleViewModal1}
  >Report a Defaulter</Button>
</div>
            )}
        },
       
        
       
      ],
      []
    );
    const additionalValue = "Hello from additional prop!";

  return (
    <React.Fragment>
            <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue}/>
            <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} />

      <Card>
        <CardBody>
     
          <div className="mb-4 h4 card-title"></div>
          <br/>
          <br/>
          <br/>
          <div className="mb-4 h4 card-title">Report a Defaulter</div>
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
