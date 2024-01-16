import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "./ReportedModel"
import ReportedDefaulterModel from './ReportDefaulterModel'
import UploadCACertificateModel from './uploadCACertificateModel'
import ReportIncoiceModel from './ReportInvoiceModel'
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
import CurrencyFormat from 'react-currency-format';
// import ReactTooltip from "react-tooltip";
/* import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton"; */
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
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit, setIsViewDetailModalOpen, setRequestEditModalOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector, isViewDetailMOdalOpenSelector, requestModelSelector } from "store/debtors/debtors.selecter"
import UploadPendingFiles from "./uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import ViewDetailsReportDefaultModal from './viewDetailsReportDefaultModal'
// import CaImg from '../../../assets/images/newImg/ca.png'
import RecordPayImg from '../../../assets/images/newImg/credit-card.png'
import fileImg from '../../../assets/images/newImg/file (1).png'
import fileImg2 from '../../../assets/images/newImg/file.png'
import CaImg from '../../../assets/images/newImg/CA-BG_Remove.png'
import profileimg from '../../../assets/images/newImg/profile.png'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc"
import RequestEditMessageModal from "./RequestEditMessageModal"
import './style.css'
// import { ToastContainer } from "react-toastify"



const ReportDebtor = props => {
  const [modal1, setModal1] = useState(false);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [selected, setSelected] = useState('');
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  //const [modal4, setModal4] = useState(false);
  /*   */
  const dispatch = useDispatch();
  const [viewModalData, setViewModalData] = useState('');

  const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector);
  const isRequestEditModalOpen = useSelector(requestModelSelector);
  const isReportDefOpen = useSelector(selectReportDefOpen);
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const selectCACertificate = useSelector(selectCACertificateOpen);

  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
  const toggleViewModal3 = () => dispatch(setIsReportDefOpen(!isReportDefOpen));
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
  const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  const toggleReqEdit = () => dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
  const [isRequestedEdit, setisRequestedEdit] = useState(false)


  const GetAllInvoice = useSelector(selectInvoiceList)
  useEffect(() => {
    dispatch(getAllInvoice());
    dispatch(setIsViewDetailModalOpen())
    dispatch(setRequestEditModalOpen())

    getDays()

  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const viewModels = (value) => {
    setModal3(true)
  }



  const additionalValue = "Hello from additional prop!";
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const handleReportDefaulter = () => {
    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    dispatch(setIsReportDefOpen(!isReportDefOpen))
  }


  const handleViewDetail = (item) => {

    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    setViewModalData(item)
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  }

  const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState('')

  const handleUploadFiles = (item) => {
    setuploadFilesModelDataForUpload(item)
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }
  const getDays = () => {
    GetAllInvoice != undefined ? GetAllInvoice.map((item) => {
      const a = moment(item.invoices[0].dueDate);
      const b = moment()
      const c = moment(b).diff(a)
      const d = moment.duration(c)


      if (getDaysArray.length != GetAllInvoice.length) {
        getDaysArray.push(d.days())

      }
    }) : []
  }
  const RequestEditData = useSelector(requestEditSelector)

  const requestEdit = (item) => {
    dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }

    setisRequestedEdit(true)


    dispatch(requestInvoiceDefEdit(payload))
  }

  const handleFilterdata = (filters) => {
    if (GetAllInvoice) {
      if (filters === "") {
        setFilteredData(GetAllInvoice)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }
  };

  return (
    <React.Fragment>
      <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue} selected={selected} />
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} customerName={invoiceIdsForCAcertificate} />
      <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} />
      <ReportIncoiceModel isOpen={isReportDefOpen} toggle={toggleViewModal3} GetAllInvoice={GetAllInvoice} />
      <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} />
      <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} />
      <RequestEditMessageModal isOpen={isRequestEditModalOpen} toggle={toggleReqEdit} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />


          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Report a Defaulter</h5>
            </Col>
            <Col md={2}>

              <Button className="btn btn-md btn-info" onClick={() => handleReportDefaulter()}>Report a Defaulter</Button>
              {/* <div data-tip="msg to show" data-for='toolTip1' data-place='top'>Tooltip</div>
<ReactTooltip id="toolTip1" /> */}
            </Col>
          </Row>
          {GetAllInvoice != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Buyer"} /> : ""}
          <Row className="p-4  ml-5">
            {/* <br/> */}

            {/* <ReactTable
              data={GetAllInvoice != undefined ? GetAllInvoice : []}
              columns={columns}
              showPagination={true}
              defaultPageSize={5}
            /> */}
            <h5 className="m-1">List of My Defaulters</h5>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Buyer Name</th>
                  {/* <th scope="col">Refrence Number</th> */}
                  <th scope="col">Invoice Number</th>
                  <th scope="col" className="reportDebAdd">Address</th>
                  <th scope="col">Due Amount</th>
                  <th scope="col">status</th>
                  {/* <th scope="col">Rating</th> */}

                  <th scope="col">Due From</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">Upload Document</th> */}
                </tr>
              </thead>
              <tbody>

                {filteredData.length >= 0 ? <ReportDefulterTable GetAllInvoicedata={filteredData} viewModel={viewModel} requestEdit={requestEdit} handleUploadFiles={handleUploadFiles} toggleViewModal2={toggleViewModal2} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} handleViewDetail={handleViewDetail} /> : <ReportDefulterTable GetAllInvoicedata={GetAllInvoice} viewModel={viewModel} requestEdit={requestEdit} handleUploadFiles={handleUploadFiles} toggleViewModal2={toggleViewModal2} handleViewDetail={handleViewDetail} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} />}
              </tbody>
            </table>

          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

const ReportDefulterTable = ({ GetAllInvoicedata, viewModel, isRequestedEdit, requestEdit, handleUploadFiles, toggleViewModal2, setinvoiceIdsForCAcertificate, getDaysArray, handleViewDetail }) => {

  return (
    <>
      {
        GetAllInvoicedata != undefined ? GetAllInvoicedata.map((item, index) => {
          {/* {dummyData != undefined ? dummyData.map((item, index) => { */ }


          return <tr key={item}>
            <th scope="row" className="pt-4">{index + 1}</th>
            <td className="pt-4 text-capitalize">{item.debtor.companyName}</td>
            <td className="pt-4">{item.invoices.map((item) => {
              return <span key={item}>{item.invoiceNumber}, &nbsp;</span>
            })}</td>

            <td className="pt-4 d-flex text-capitalize reportDebAdd">{item.debtor.companyName}
              <br />
              {item.debtor.address1} <br />{item.debtor.address2},  <br />{item.debtor.city}</td>


            <td className="pt-4">
              {numberFormat(item.invoices[0].remainingAmount)}
              {/*           <CurrencyFormat value={item.invoices[0].remainingAmount.toFixed(1)} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}

            </td>
            <td className="pt-4  text-capitalize"><span className="text-danger">{item.status}</span></td>
            {/* <td className="pt-4  text-capitalize">}</td> */}

            <td >

              <div className="" style={{ padding: "2px 15px" }}>

                <div className=" text-center bg-danger rounded text-light">
                  <div className="text-capitalize">

                    {getDaysArray[index]}  &nbsp;


                    <span className="ml-1">Days</span> </div>
                  <div className="text-capitalize" >{moment(item.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
                </div>
              </div>

            </td>

            <td>
              <div className="pt-2">
                {/* <Button className="btn btn-info btn-sm "
                  onClick={() => viewModel(item)

                  }

                >
               
                </Button> */}


                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Record Payment" href={item.url} rel='noreferrer'
                  target='_blank' onClick={() => viewModel(item)

                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>


                  {/* <img src={RecordPayImg} className="iconsImage"/> */}

                </button>

                &nbsp;

                {/* <Button className="btn btn-info btn-sm"
                  onClick={() => requestEdit(item)

                  }
                >
                  <i className='bx bx-edit textsizing' ></i>
                </Button> */}

                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Request Edit" href={item.url} rel='noreferrer'
                  target='_blank' onClick={() => requestEdit(item)


                  }
                  disabled={isRequestedEdit == true}
                >
                  <i className='bx bx-edit textsizing' ></i>
                  {/* <img src={ReqEdit} className="iconsImage"/> */}

                </button>

                &nbsp;

                {/* <Button className="btn btn-info btn-sm"
                  onClick={() => handleUploadFiles(item)

                  }
                >
                  <i className='bx bx-cloud-upload textsizing' ></i>


                </Button> */}
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Upload Pending Files" href={item.url} rel='noreferrer'
                  target='_blank' onClick={() => handleUploadFiles(item)

                  }>
                  <i className='bx bx-cloud-upload textsizing' ></i>
                  {/* <img src={fileImg} className="iconsImage"/> */}

                </button>

                &nbsp;
                {/* <Button className="btn btn-info btn-sm"
                  onClick={() => {
                    toggleViewModal2()
                    setinvoiceIdsForCAcertificate(item.invoices[0].invoiceNumber)
                  }

                  }
                >
                  <i className='bx bx-file textsizing' ></i>
                </Button> */}
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Upload CA Certificate" href={item.url} rel='noreferrer'
                  target='_blank' onClick={() => {
                    toggleViewModal2()
                    setinvoiceIdsForCAcertificate(item.invoices[0].invoiceNumber)
                  }

                  }>
                  {/* <i className='bx bx-file textsizing' ></i> */}
                  <img src={CaImg} className="" style={{ height: "22.5px" }} />
                </button>
                &nbsp;
                <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="View Details" href={item.url} rel='noreferrer'
                  target='_blank'

                  onClick={() => handleViewDetail(item)}>
                  <i className='fa fa-eye textsizing' style={{ fontSize: "19.5px" }}></i>

                  {/* <img src={profileimg} className="iconsImage"/> */}


                </Button>


              </div>
            </td>
            {/* <td>
<div className="pt-2">
<Button className="btn btn-info btn-sm"
onClick={() => viewModels()
 
}
>
Upload Document
</Button>

</div>
</td> */}
          </tr>
        }) : ''
      }
      <ToastContainer />
    </>
  )

}

export default withRouter(ReportDebtor)
