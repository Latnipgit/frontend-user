import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "../Invoice/ReportedModel"
import ReportedDefaulterModel from '../Invoice/ReportDefaulterModel'
import UploadCACertificateModel from '../Invoice/uploadCACertificateModel'
import ReportIncoiceModel from '../Invoice/ReportInvoiceModel'
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
import CurrencyFormat from 'react-currency-format';
// import ReactTooltip from "react-tooltip";
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
//import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen } from "store/debtors/debtors.selecter"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import moment from 'moment'

/* import './style.css' */



const ReportMedefulterComponent = props => {
  const [modal1, setModal1] = useState(false);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [selected, setSelected] = useState('');
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const toggleViewModal2 = () => setModal2(!modal3);
  //const [modal4, setModal4] = useState(false);
  /*  const toggleViewModal3 = () => setModal4(!modal4); */
  const dispatch = useDispatch();
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const viewModels = (value) => {
    setModal3(true)
  }
  const dummyData = [{
    "companyName": "Latnip",
    "InvoiceNUmber": "BAF-65650",
    "Address": "Jodhpur",
    "amount": "90000",
    "DueFrom": "12-05-2003",
    "debtor":
    {
      "firstname": "Harshit",
      "lastname": "sharma"
    }


  },
  {
    "companyName": "TATA",
    "InvoiceNUmber": "BAF-69850",
    "Address": "Jaiour",
    "amount": "98000",
    "DueFrom": "13-05-2012",
    "debtor":
    {
      "firstname": "Harshit",
      "lastname": "sharma"
    }


  },
  {
    "companyName": "Jio",
    "InvoiceNUmber": "BAF-65980",
    "Address": "Pali",
    "amount": "65000",
    "DueFrom": "24-09-2020",
    "debtor":
    {
      "firstname": "Harshit",
      "lastname": "sharma"
    }


  }]

  const handleUploadFiles = () => {
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }

  return (
    <React.Fragment>
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} />
      <UploadCACertificateModel isOpen={modal3} toggle={toggleViewModal2} />
      <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} />

      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />
          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Report me as a Defaulter</h5>
            </Col>
          </Row>
          <Row className="p-4  ml-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company Name</th>
                  {/* <th scope="col">Refrence Number</th> */}
                  <th scope="col">Invoice Number</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Address</th>
                  <th scope="col">Due Amount</th>
                  <th scope="col">Due From</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">Upload Document</th> */}
                </tr>
              </thead>
              <tbody>
                {dummyData != undefined ? dummyData.map((item, index) => {
                  return <tr key={item}>
                    {console.log("NEW TABLE ", item)}
                    <th scope="row" className="pt-4">{index + 1}</th>
                    <td className="pt-4 text-capitalize">{item.companyName}</td>
                    <td className="pt-4">{item.InvoiceNUmber}</td>
                    <td>
                      {item.Address}
                    </td>
                    <td className="pt-4">{item.amount}</td>
                    <td>
                      {item.DueFrom}
                    </td>
                    <td>
                      <div className="pt-2">
                        {/*                  <Button className="btn btn-info btn-sm "
                          onClick={() => viewModel(item)

                          }

                        >
                          <i className='bx bx-wallet-alt textsizing' ></i>
                        </Button>

                        <a>
                        </a>
                        &nbsp; */}

                        <Button className="btn btn-info btn-sm"
                        // onClick={() => viewModels()

                        // }
                        >
                          <i className='bx bx-edit textsizing' ></i>
                        </Button>

                        &nbsp;

                        <Button className="btn btn-info btn-sm"
                          onClick={() => handleUploadFiles()

                          }
                        >
                          <i className='bx bx-cloud-upload textsizing' ></i>


                        </Button>

                        &nbsp;
                        <Button className="btn btn-info btn-sm"
                          onClick={() => viewModels()
                          }
                        >
                          <i className='bx bx-file textsizing' ></i>
                        </Button>


                      </div>
                    </td>
                  </tr>
                }) : ''}


              </tbody>
            </table>

          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(ReportMedefulterComponent)
