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

const ReportMedefulterComponent = props => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selected, setSelected] = useState('');
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [viewModalData, setViewModalData] = useState('');
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const [isOpenmark, setIsOpenmark] = useState(false)
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
    dispatch(fetchReportMeDefulterStart())
    dispatch(setIsViewDetailModalOpen())
    dispatch(markAsDisputedModalOpenAction())
    getDays()
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

    dispatch(markAsDisputedModalOpenAction(payload))
  }

  const handleViewDetail = (item) => {

    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    setViewModalData(item)
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  }
  const additionalValue = "Hello from additional prop!";
  return (
    <React.Fragment>
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} additionalValue={additionalValue} selected={selected} />
      <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} />
      {/* <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} /> */}
      <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} />
      <MarkDisputedMadal isOpen={markAsDisputed} toggle={toggleMarkAsDisputed} selected={selected} />
      <MarkDisputedPopModule isOpen={isOpenmark} toggle={markOpenModule} currentindex={currentindex} markedDisputed={markedDisputed} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          {props.isClickedToReported != undefined && props.isClickedToReported != false ?


            <div>
              <br />
              <br />
              <br />
            </div>
            : ""
          }
          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Reported Me As a Defaulter</h5>
            </Col>
            {selectReportMeDeflist != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Seller"} /> : ""}
          </Row>
          <Row className="p-4  ml-5">
            {selectReportMeDeflist != undefined && selectReportMeDeflist != null && selectReportMeDeflist.length != 0 ?


              
         
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Seller Name</th>
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
                {filteredData.length >= 0 ? <ReportMeDefulterList selectReportMeDeflistData={filteredData} viewModel={viewModel} toggleViewModal2={toggleViewModal2} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} requestEdit={requestEdit} markedDisputed={markedDisputed} handleViewDetail={handleViewDetail} toggleMarkAsDisputed={toggleMarkAsDisputed} markOpenModule={markOpenModule}/> :
                 <ReportMeDefulterList selectReportMeDeflistData={selectReportMeDeflist} viewModel={viewModel} toggleViewModal2={toggleViewModal2} toggleMarkAsDisputed={toggleMarkAsDisputed} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} requestEdit={requestEdit} markedDisputed={markedDisputed} handleViewDetail={handleViewDetail} markOpenModule={markOpenModule} />}
              </tbody>
            </table>
            :
            <Card style={{ height:'60vh'}}>
              <CardBody className="text-center p-5 ">
                <h5 className="mt-5">
                  No Data Found
                </h5>
              </CardBody>
            </Card>
            }

          </Row>
        </CardBody>
      </Card>
    </React.Fragment >
  );
}

const ReportMeDefulterList = ({ selectReportMeDeflistData, viewModel, toggleViewModal2, setinvoiceIdsForCAcertificate, getDaysArray, requestEdit, markedDisputed, handleViewDetail, markOpenModule }) => {
 
 {console.log("markOpenModulemarkOpenModule",markOpenModule)}

  return (
    <>
      {selectReportMeDeflistData != undefined && selectReportMeDeflistData.length != 0 ? selectReportMeDeflistData.map((item, index) => {
        return <tr key={item}>
          <th scope="row" className="pt-4">{index + 1}</th>
          <td className="pt-4 text-capitalize">{item.debtor.companyName}</td>
          <td className="pt-4">{item.invoices[0].invoiceNumber}</td>
          <td style={{ width: "220px" }}>
            {item.debtor.address1}<br />{item.debtor.address2}
          </td>
          <td className="pt-4">
            {numberFormat(item.totalAmount)}
            {/* <CurrencyFormat value={item.totalAmount} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}
          </td>
          <td>
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


              <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="Record Payment" href={item.url} rel='noreferrer'
                target='_blank' onClick={() => viewModel(item)

                }>
                <i className='bx bx-wallet-alt textsizing' ></i>
              </button>

              &nbsp;

              {/* <Button className="btn btn-info btn-sm"
                  onClick={() => requestEdit(item)

                  }
                >
                  <i className='bx bx-edit textsizing' ></i>
                </Button> */}
              <Button  className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="Disputed Transaction" href={item.url} rel='noreferrer'
                target='_blank' onClick={() => markOpenModule(item)

                }>
                {/* <i className='bx bx-edit textsizing' ></i> */}
                <i className='bx bx-window-close textsizing'></i>
              </Button>

              &nbsp;

              {/* <Button className="btn btn-info btn-sm"
                  onClick={() => handleUploadFiles(item)

                  }
                >
                  <i className='bx bx-cloud-upload textsizing' ></i>


                </Button> */}
              {/*               <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                title="Upload Pending Files" href={item.url} rel='noreferrer'
                target='_blank' onClick={() => handleUploadFiles(item)

                }>
                <i className='bx bx-cloud-upload textsizing' ></i>
              </button>

              &nbsp; */}
              {/* <Button className="btn btn-info btn-sm"
                  onClick={() => {
                    toggleViewModal2()
                    setinvoiceIdsForCAcertificate(item.invoices[0].invoiceNumber)
                  }

                  }
                >
                  <i className='bx bx-file textsizing' ></i>
                </Button> */}
              <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
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
                <i className='fa fa-eye textsizing' style={{ fontSize: "19.5px" }}></i>   </Button>


            </div>
          </td>
        </tr>
      }) : 
     ""
      }
      <ToastContainer />
    </>
  )
}

export default withRouter(ReportMedefulterComponent)
