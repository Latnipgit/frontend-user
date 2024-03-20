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
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector, isViewDetailMOdalOpenSelector, requestModelSelector, selectInvoiceListMap } from "store/debtors/debtors.selecter"
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

import {
  DueAmount,
  SrNo,
} from ".././company-search/companyssearchColl";

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
  const toggleViewModal3 = () => pGErElo()
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
  const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  const toggleReqEdit = () => dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
  const [isRequestedEdit, setisRequestedEdit] = useState(false)


  const GetAllInvoice = useSelector(selectInvoiceListMap)

  const pGErElo = () => {
    dispatch(setIsReportDefOpen(!isReportDefOpen));
    window.location.reload()
  }

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
  const [requestedData, setrequestedData] = useState('')

  const requestEdit = (item) => {
    console.log("ITEMMMMM", item)
    setrequestedData(item)
    dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }

    setisRequestedEdit(true)


    // dispatch(requestInvoiceDefEdit(payload))
  }

  const handleFilterdata = (filters) => {
    if (GetAllInvoice) {
      if (filters === "") {
        const revArr = GetAllInvoice.reverse()
        setFilteredData(revArr)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }
  };

  const DueSincedate = (cell) => {
    const today = new Date();
    const currentDate = new Date(cell.cell.row.original.debtor.createdAt);

    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      return differenceInDays;
    };

    return (
      <div className="" style={{ padding: "2px 5px", fontSize: "12px" }}>
        <div className=" text-center bg-danger rounded text-light p-1">
          <div className="text-capitalize">
            {calculateDateDifference()}  &nbsp;
            <span className="ml-1">Days</span> </div>
          <div className="text-capitalize" >{moment(cell.cell.row.original.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
        </div>
      </div>
    );
  };


  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {

          return <div
            className="company-name-cell"
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;;
        },
      },
      {
        Header: "BUYER NAME",
        accessor: "CompanyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.cell.row.original.debtor.companyName}
          </div>


        },
      },
      {
        Header: "INVOICE NUMBER",
        accessor: "PANCARD",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div className="d-flex">
            {cellProps.cell.row.original.invoices.map((x) => {
              return <p key={x}>{x.invoiceNumber}, &nbsp;</p>
            })}
          </div>
        },
      },
      {
        Header: "ADDRESS",
        accessor: "GST",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "200px" }}>
            {cellProps.cell.row.original.debtor.address1},<br />{cellProps.cell.row.original.debtor.address2}
          </div>
        },
      },
      {
        Header: "DUE AMOUNT",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "STATUS",
        accessor: "STATUS",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div className="pt-4  text-capitalize"><span className="text-danger ">{cellProps.cell.row.original.status}</span></div>
        },
      },

      {
        Header: "DUE FROM",
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSincedate {...cellProps} />;
        },
      },


      {
        Header: "ACTION",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">
              <div className="pt-2">
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Record Payment" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank' onClick={() => viewModel(cellProps.cell.row.original)

                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>


                  {/* <img src={RecordPayImg} className="iconsImage"/> */}

                </button>

                &nbsp;
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Request Edit" rel='noreferrer'
                  target='_blank' onClick={() => requestEdit(cellProps.cell.row.original)


                  }
                  disabled={isRequestedEdit == true}
                >
                  <i className='bx bx-edit textsizing' ></i>
                  {/* <img src={ReqEdit} className="iconsImage"/> */}

                </button>
                &nbsp;
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Upload Pending Files" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank' onClick={() => handleUploadFiles(cellProps.cell.row.original)
                  }>
                  <i className='bx bx-cloud-upload textsizing' ></i>
                </button>
                &nbsp;
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Upload CA Certificate" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank' onClick={() => {
                    toggleViewModal2()
                    setinvoiceIdsForCAcertificate(cellProps.cell.row.original.invoices[0].invoiceNumber)
                  }

                  }>
                  {/* <i className='bx bx-file textsizing' ></i> */}
                  <img src={CaImg} className="" style={{ height: "22.5px" }} />
                </button>
                &nbsp;
                <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="View Details" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank'

                  onClick={() => handleViewDetail(cellProps.cell.row.original)}>
                  <i className='fa fa-eye textsizing' style={{ fontSize: "19.5px" }}></i>

                  {/* <img src={profileimg} className="iconsImage"/> */}


                </Button>


              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue} selected={selected} />
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} customerName={invoiceIdsForCAcertificate} requestor={'CREDITOR'} />
      <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} />
      <ReportIncoiceModel isOpen={isReportDefOpen} toggle={toggleViewModal3} GetAllInvoice={GetAllInvoice} />
      <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} />
      <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} />
      <RequestEditMessageModal isOpen={isRequestEditModalOpen} toggle={toggleReqEdit} requestedData={requestedData} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />



          <Row>
            <Col md={10} className="pl-3" style={{ textTransform: "capitalize" }}>
              <h5 className="m-1">My Complaints  : {sessionStorage.getItem("COMPANY")}</h5>
            </Col>
            <Col md={2}>

              <Button className="btn btn-md btn-info" onClick={() => handleReportDefaulter()}>Report a Defaulter</Button>
              {/* <div data-tip="msg to show" data-for='toolTip1' data-place='top'>Tooltip</div>
<ReactTooltip id="toolTip1" /> */}
            </Col>
          </Row>
          {GetAllInvoice != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Buyer"} /> : ""}
          <Row className="">

            {GetAllInvoice != undefined && (<TableContainer
              columns={columns}
              data={filteredData.length > 0 ? filteredData : GetAllInvoice}
              isGlobalFilter={false}
              isAddOptions={false}
              customPageSize={10}
            />)}


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
              return <span key={item}>{item.invoiceNumber}{" " + " "} &nbsp;</span>
            })}</td>

            <td className="pt-4 d-flex text-capitalize reportDebAdd">{item.debtor.companyName}
              <br />
              {item.debtor.address1} <br />{item.debtor.address2},  <br />{item.debtor.city}</td>


            <td className="pt-4">
              {numberFormat(item.invoices[0].remainingAmount)}
              {/*           <CurrencyFormat value={item.invoices[0].remainingAmount.toFixed(1)} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}

            </td>
            <td className="pt-4  text-capitalize"><span className="text-danger ">{item.status}</span></td>
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
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Record Payment" href={item.url} rel='noreferrer'
                  target='_blank' onClick={() => viewModel(item)

                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>


                  {/* <img src={RecordPayImg} className="iconsImage"/> */}

                </button>

                &nbsp;
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
                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Upload Pending Files" href={item.url} rel='noreferrer'
                  target='_blank' onClick={() => handleUploadFiles(item)
                  }>
                  <i className='bx bx-cloud-upload textsizing' ></i>
                </button>
                &nbsp;
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
