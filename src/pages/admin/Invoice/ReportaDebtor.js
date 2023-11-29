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
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
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
import { getInvoices as ongetInvoices } from '../../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import { success } from "toastr"
import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import moment from 'moment'

// import { invoiceList } from "common/data"

//Creditors


const ReportDebtor = props => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selected, setSelected] = useState('');
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);


  const dispatch = useDispatch();
  const { GetAllInvoice } = useSelector(state => ({
    GetAllInvoice: state.DebtorsReducer.getInvoiceList != undefined ? state.DebtorsReducer.getInvoiceList.response : [],
  }))
  useEffect(() => {
    // dispatch(ongetInvoices());
    dispatch(ongetAllInvoice());
  }, [])
  console.log("GetAllInvoice", GetAllInvoice)

  const viewModel =(value)=>{
    setSelected(value)
    setModal2(true)
  }
  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600',  },
        style:{padding:"15px"},
          width: 50,

        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },

      {
        Header: "Refrence Number",
        accessor: "referenceNumber",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style:{padding:"15px"},
        filterable: false,
        disableFilters: true,

      },
          {
            Header: "Customer Name",
            accessor: "",
            headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
            style:{padding:"15px"},
            filterable: false,
            disableFilters: true,
            Cell: cellProps => {
              return ( <div className="text-capitalize" >{cellProps.original.debtor.firstname +" "+ cellProps.original.debtor.lastname}</div>

      )}
          },
      {
        Header: "Due Amount",
        accessor: "remainingAmount",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style:{padding:"15px"},
        disableFilters: true,
        filterable: false,

      },
      {
        Header: 'Due From',
        disableFilters: true,
        filterable: false,
        accessor: "",

        Cell: cellProps => {
          const a = moment(cellProps.original.dueDate);
          const b =moment()
          const c = moment(b).diff(a)
          const d = moment.duration(c)
          console.log("ABABAB",d.days())
          return (

            <div className="" style={{ padding:"5px 35px"}}>
              <div className=" text-center bg-success rounded text-light">
                <div className="text-capitalize">
                  {
                    d.days()

                  } Days </div>
                <div className="text-capitalize" >{moment(cellProps.original.dueDate).format("MM-DD-YY")}</div>
              </div>
            </div>
          )
        }
      },


     
      {
        Header: "Action",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
  style:{padding:"15px"},
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => (
          <div>
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModel(cellProps.original)
               
              }
            >
           Report a Defaulter
            </Button>
  
          </div>
        )
      },



    ],
    []
  );
  const additionalValue = "Hello from additional prop!";

  return (
    <React.Fragment>
      <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue} selected={selected} />
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} />

      <Card>
        <CardBody>
 <div className="mb-4 h4 card-title"></div>
          <br/>
          <br/>
          <br/>
          <div className="mb-4 h4 card-title">Report a Defaulter</div>
        
          {/*  <TableContainer
            columns={columns}
            data={GetAllInvoice!= undefined ? GetAllInvoice:[]}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          /> */}

          <Row className="p-4  ml-5">
          <br/>
          
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
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(ReportDebtor)
