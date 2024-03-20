import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDefaulterModel from '../Invoice/ReportDefaulterModel'
import UploadCACertificateModel from '../Invoice/uploadCACertificateModel'
import 'react-table-6/react-table.css'
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import InlineFilterForm from '../ApprovedTransaction/InlineFilterForm';
import { useDispatch, useSelector } from "react-redux";
import { setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit, setIsViewDetailModalOpen, markAsDisputedModalOpenAction } from "../../../store/debtors/debtors.actions"
import { uploadFilesModalOpen, selectCACertificateOpen, isViewDetailMOdalOpenSelector, markAsDisputedModalOpenSelector } from "store/debtors/debtors.selecter"
import { selectReportMeDefData } from "store/ReportMeDefulter/ReportMeDefulter.selecter"
import { fetchReportMeDefulterStart } from "store/ReportMeDefulter/ReportMeDefulter.action"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import CurrencyFormat from "react-currency-format"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import ViewDetailsReportDefaultModal from "../Invoice/viewDetailsReportDefaultModal"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc"
import CaImg from '../../../assets/images/newImg/CA-BG_Remove.png'
import MarkDisputedMadal from "./markDisputedMadal"
import { MarkDisputedPopModule } from "./markDisputedPop"
import {
  CheckBox,
  SrNo,
  PANCARD,
  AADHAR,
  GST,
  CompanyName,
  DueSince,
  DueAmount,
  Reating
} from ".././company-search/companyssearchColl";
import { differenceInDays, format } from 'date-fns';
const ReportMedefulterComponent = props => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selected, setSelected] = useState('');
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [viewModalData, setViewModalData] = useState('');
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const [selectDisput, setSelectDisput] = useState('')

  const [isOpenmark, setIsOpenmark] = useState(false)
  const [isreload, setIsReloaf] = useState(false)
  const [currentindex, setCurrentindex] = useState({})

  const markOpenModule = (value) => {
    setIsOpenmark(!isOpenmark)
    setCurrentindex(value)

  }



  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const dispatch = useDispatch();
  const selectCACertificate = useSelector(selectCACertificateOpen);
  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));

  const markAsDisputed = useSelector(markAsDisputedModalOpenSelector);
  const toggleMarkAsDisputed = () => dispatch(markAsDisputedModalOpenAction(!markAsDisputed));


  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
  const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector);
  const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  const selectReportMeDeflist = useSelector(selectReportMeDefData)

  useEffect(() => {
        
        const timer = setTimeout(() => {
          dispatch(setIsViewDetailModalOpen())
          dispatch(markAsDisputedModalOpenAction())
          getDays()
        dispatch(fetchReportMeDefulterStart())  
      }, 1000);
      return () => clearTimeout(timer);
      

                 // clearing interval
    
 
  
  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }




  const handleFilterdata = (filters) => {
    if (selectReportMeDeflist) {
      if (filters === "") {
        const revArr = selectReportMeDeflist.reverse()
        setFilteredData(revArr)
      } else {
        const filteredResults = selectReportMeDeflist.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }
  };

  const getDays = () => {
    selectReportMeDeflist != undefined ? selectReportMeDeflist.map((item) => {
      const a = moment(item.invoices[0].dueDate);
      const b = moment()
      const c = moment(b).diff(a)
      const d = moment.duration(c)
      if (getDaysArray.length != selectReportMeDeflist.length) {
        getDaysArray.push(d.days())

      }
    }) : []
  }

  const requestEdit = (item) => {
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }
    dispatch(requestInvoiceDefEdit(payload))
    toast.success("Edit Request Sent Successfully")
  }

  const markedDisputed = (item) => {
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }
    setSelectDisput(item)
    dispatch(markAsDisputedModalOpenAction(payload))
  }

  const handleViewDetail = (item) => {

    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    setViewModalData(item)
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  }
  const DueSincedate = (cell) => {
    const today = new Date();
    const newDate = cell.cell.row.original.invoices != undefined ? cell.cell.row.original.invoices[0].dueDate.split("-").reverse().join("-") : "";
    const currentDate = new Date(newDate);

    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      return differenceInDays;
    };
    const todayGet = moment(today).format("YYYY-MM-DD")
    const CurrentDatss = moment(cell.cell.row.original.invoices[0].dueDate).format("YYYY-MM-DD")
    const startDate = new Date(todayGet);
    const endDate = new Date(CurrentDatss);
    const difference = differenceInDays(startDate, endDate);
    const formattedStartDate = format(startDate, 'dd-MM-yyyy');
    const formattedEndDate = format(endDate, 'dd-MM-yyyy');
    return (
      <div className="" style={{ padding: "2px 5px" }}>
        <div className=" text-center bg-danger rounded text-light p-1">
          <div className="text-capitalize" style={{}}>
            {difference} &nbsp;
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
          </div>;
        },
      },
      {
        Header: "Seller Name",
        accessor: "CompanyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.cell.row.original.creditor.companyName}
          </div>

        },
      },
      {
        Header: "Invoice Number",
        accessor: "PANCARD",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div >
            {cellProps.cell.row.original.invoices.map((x) => {
              return <span key={x}>{x.invoiceNumber}, &nbsp;</span>
            })}
          </div>

        },
      },
      {
        Header: "Address",
        accessor: "GST",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "200px" }}>
            {console.log("cellPropscellPropscellProps",cellProps.cell.row.original)}
            {cellProps.cell.row.original.debtor.address1}<br />{cellProps.cell.row.original.debtor.address2}
          </div>
        },
      },
      {
        Header: "Due Amount",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "Due Form",
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          //   return  <div className="" style={{ padding: "2px 15px" }}>
          //   <div className=" text-center bg-danger rounded text-light p-1">
          //     <div className="text-capitalize">
          //       {getDaysArray[currentindex]}  &nbsp;
          //       <span className="ml-1">Days</span> </div>
          //     <div className="text-capitalize" >{moment(cellProps.cell.row.original.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
          //   </div>
          // </div>;
          return <DueSincedate {...cellProps} />
        },
      },


      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">
              <div className="pt-2">
                <button type="button" rel='noreferrer' className="btn btn-info"
                  target='_blank' onClick={() => viewModel(cellProps.cell.row.original)
                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>
                </button>
                &nbsp;
                <Button className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Disputed Transaction" rel='noreferrer'
                  target='_blank' onClick={() => markOpenModule(cellProps.cell.row.original)

                  }>
                  {/* <i className='bx bx-window-close textsizing'></i> */}
                  <i className='bx bx-x-circle textsizing'></i>
                </Button>
                &nbsp;

                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Upload CA Certificate" rel='noreferrer'
                  target='_blank' onClick={() => {
                    toggleViewModal2()
                    setinvoiceIdsForCAcertificate(cellProps.cell.row.original.invoices[0].invoiceNumber)
                  }
                  }>
                  <img src={CaImg} className="" style={{ height: "22.5px" }} />
                </button>
                &nbsp;
                <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="View Details" rel='noreferrer'
                  target='_blank'
                  onClick={() => handleViewDetail(cellProps.cell.row.original)}>
                  <i className='fa fa-eye textsizing' style={{ fontSize: "19.5px" }}></i>   </Button>


              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  const additionalValue = "Hello from additional prop!";


  const submitCheckRqust1 = (value) => {
    if (value) toast.success("Request send Successfully")
  }
console.log("selectReportMeDeflist",selectReportMeDeflist)
  return (
    <React.Fragment>
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} additionalValue={additionalValue} selected={selected} />
      <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} />
      {/* <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} /> */}
      <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} />
      <MarkDisputedMadal isOpen={markAsDisputed} toggle={toggleMarkAsDisputed} selected={selectDisput} setIsOpenmark={setIsOpenmark} submitCheckRqust1={submitCheckRqust1} />
      <MarkDisputedPopModule isOpen={isOpenmark} toggle={markOpenModule} currentindex={currentindex} markedDisputed={markedDisputed} setIsOpenmark={setIsOpenmark} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          {props.isClickedToReported == undefined && props.isClickedToReported != false ?
            <div>
              <br />
              <br />


            </div>
            : ""
          }

          <Row className="">
            <Col md={12}></Col>
            <Col md={10} className="pl-3" style={{ textTransform: "capitalize" }}>
              <h5 className="m-1">Complaints Against me  {props.isClickedToReported == undefined && props.isClickedToReported != false ? <span>: {sessionStorage.getItem("COMPANY")}</span> : ""}</h5>
            </Col>
            {selectReportMeDeflist != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Seller"} /> : ""}
          </Row>
          <Row className="  ">
            {selectReportMeDeflist != undefined && selectReportMeDeflist != null ?




              <div>


                <TableContainer
                  columns={columns}
                  data={selectReportMeDeflist != undefined && selectReportMeDeflist != null && selectReportMeDeflist.length != 0 ? selectReportMeDeflist : []}
                  isGlobalFilter={false}
                  isAddOptions={false}
                  customPageSize={20}
                />
              </div>
              :
           ""
            }
          </Row>
        </CardBody>
      </Card>
    </React.Fragment >
  );
}

const ReportMeDefulterList = ({ selectReportMeDeflistData, viewModel, toggleViewModal2, setinvoiceIdsForCAcertificate, getDaysArray, handleViewDetail, markOpenModule }) => {
  return (
    <>
      {selectReportMeDeflistData != undefined && selectReportMeDeflistData.length != 0 ? selectReportMeDeflistData.map((item, index) => {
        return <tr key={item} style={{ width: "100vw" }}>
          <th scope="row" className="pt-4" style={{ width: "5%" }}>{index + 1}</th>
          <td className="pt-4 text-capitalize" style={{ width: "15%" }}>{item.ha}</td>
          <td className="pt-4" style={{ width: "15%" }} >{item.invoices[0].invoiceNumber}</td>
          <td style={{ width: "22%" }}>
            {item.debtor.address1}<br />{item.debtor.address2}
          </td>
          <td className="pt-4" style={{ width: "10%" }}>
            {numberFormat(item.totalAmount)}
          </td>
          <td style={{ width: "13%" }}>
            <div className="" style={{ padding: "2px 15px" }}>
              <div className=" text-center bg-danger rounded text-light p-1">
                <div className="text-capitalize">
                  {getDaysArray[index]}  &nbsp;
                  <span className="ml-1">Days</span> </div>
                <div className="text-capitalize" >{moment(item.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
              </div>
            </div>
          </td>
          <td style={{ width: "20%" }}>
            <div className="pt-2">
              <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="Record Payment" href={item.url} rel='noreferrer'
                target='_blank' onClick={() => viewModel(item)
                }>
                <i className='bx bx-wallet-alt textsizing' ></i>
              </button>
              &nbsp;
              <Button className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="Disputed Transaction" href={item.url} rel='noreferrer'
                target='_blank' onClick={() => markOpenModule(item)

                }>
                <i className='bx bx-window-close textsizing'></i>
              </Button>
              &nbsp;
              <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="Upload CA Certificate" href={item.url} rel='noreferrer'
                target='_blank' onClick={() => {
                  toggleViewModal2()
                  setinvoiceIdsForCAcertificate(item.invoices[0].invoiceNumber)
                }
                }>
                <img src={CaImg} className="" style={{ height: "22.5px" }} />
              </button>
              &nbsp;
              <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="View Details" href={item.url} rel='noreferrer'
                target='_blank'

                onClick={() => handleViewDetail(item)}>
                <i className='fa fa-eye textsizing' style={{ fontSize: "19.5px" }}></i>   </Button>


            </div>
          </td>
        </tr>
      }) :
        ""
      }

      1

      <ToastContainer />
    </>
  )
}

export default withRouter(ReportMedefulterComponent)
