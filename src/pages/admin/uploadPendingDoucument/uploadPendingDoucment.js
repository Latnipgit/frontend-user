import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "../Invoice/ReportedModel"
import ReportedDefaulterModel from "../Invoice/ReportDefaulterModel"
/* import ReportIncoiceModel from './ReportInvoiceModel' */
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
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit, setIsViewDetailModalOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector, isViewDetailMOdalOpenSelector } from "store/debtors/debtors.selecter"
import { fetchUploadPendingListStart } from "store/UploadPendingDocList/UploadPendingDocList.action"
import { selectUploadingPendingListData, selectTransactionsRaisedByMeData, selectTransactionsSentToMeData } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import UploadPendingDocModel from "./uploadPendingDoc"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import { numberFormat } from "./uploadPendingDoc"
import ViewDetailsReportDefaultModal from "../Invoice/viewDetailsReportDefaultModal"

/* import './style.css' */
// import { ToastContainer } from "react-toastify"



const UploadPendingListModule = props => {
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
    const isReportDefOpen = useSelector(selectReportDefOpen);
    const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
    const selectCACertificate = useSelector(selectCACertificateOpen);

    const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
    const toggleViewModal3 = () => dispatch(setIsReportDefOpen(!isReportDefOpen));
    const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
    const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

    const GetAllInvoice = useSelector(selectInvoiceList)
    const uploadpendingFilelist = useSelector(selectUploadingPendingListData);
    const selectTransactionsRaisedByMe = useSelector(selectTransactionsRaisedByMeData);
    const selectTransactionsSentToMe = useSelector(selectTransactionsSentToMeData);
    console.log('uploadpendingFilelist', uploadpendingFilelist);
    console.log('selectTransactionsRaisedByMe', selectTransactionsRaisedByMe);
    console.log('selectTransactionsSentToMe', selectTransactionsSentToMe);
    useEffect(() => {
        dispatch(getAllInvoice());
        dispatch(setIsViewDetailModalOpen())
        dispatch(fetchUploadPendingListStart())
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
            const a = moment(item.dueDate);
            const b = moment()
            const c = moment(b).diff(a)
            const d = moment.duration(c)
            if (getDaysArray.length != GetAllInvoice.length) {
                getDaysArray.push(d.days())

            }
        }) : []
        console.log("ABABABABABAB", getDaysArray)
    }
    console.log("ABABABABABAB 2", getDaysArray)

    const requestEdit = (item) => {

        console.log("ITEMMMMM", item.invoices[0].invoiceNumber)
        const payload = {
            "invoiceId": item.invoices[0].invoiceNumber
        }

        dispatch(requestInvoiceDefEdit(payload))
        toast.success("Edit Request Sent Successfully")
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
            <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} />
            {/* <UploadPendingDocModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} /> */}
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
                    </Row>
                    <Row className="p-4  ml-5">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Company Name</th>
                                    {/* <th scope="col">Refrence Number</th> */}
                                    <th scope="col">Invoice Number</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Due Amount</th>
                                    <th scope="col">Due From</th>
                                    <th scope="col">Ratings</th>
                                    <th scope="col">Action</th>
                                    {/* <th scope="col">Upload Document</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {selectTransactionsRaisedByMe.length > 0 ? <ReportDefulterTable GetUploadPendingList={selectTransactionsRaisedByMe} viewModel={viewModel} requestEdit={requestEdit} handleUploadFiles={handleUploadFiles} toggleViewModal2={toggleViewModal2} handleViewDetail={handleViewDetail} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} /> : ''}
                            </tbody>
                        </table>


                    </Row>
                </CardBody>

                <CardBody>
                    <div className="mb-4 h4 card-title"></div>
                    <Row>
                        <Col md={10} className="pl-3">
                            <h5 className="m-1">Reported Me As a Defaulter</h5>
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
                                    <th scope="col">Address</th>
                                    <th scope="col">Due Amount</th>
                                    <th scope="col">Due From</th>
                                    <th scope="col">Ratings</th>
                                    <th scope="col">Action</th>
                                    {/* <th scope="col">Upload Document</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {selectTransactionsSentToMe.length > 0 ? <ReportDefulterTable GetUploadPendingList={selectTransactionsSentToMe} viewModel={viewModel} requestEdit={requestEdit} handleUploadFiles={handleUploadFiles} toggleViewModal2={toggleViewModal2} handleViewDetail={handleViewDetail} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} /> : ''}
                            </tbody>
                        </table>


                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

const ReportDefulterTable = ({ GetUploadPendingList, viewModel, requestEdit, handleUploadFiles, toggleViewModal2, setinvoiceIdsForCAcertificate, getDaysArray, handleViewDetail }) => {

    return (
        <>

            {
                GetUploadPendingList != undefined ? GetUploadPendingList.map((item, index) => {
                    {/* {dummyData != undefined ? dummyData.map((item, index) => { */ }
                    return <tr key={item}>
                        {/* {console.log("NEW TABLE ", item.remainingAmount)} */}

                        <th scope="row" className="pt-4">{index + 1}</th>
                        <td className="pt-4 text-capitalize">{item.defaulterEntry.debtor.companyName}</td>
                        <td className="pt-4">{item.defaulterEntry.invoices.map((item) => {
                            return <span key={item}>{item}, &nbsp;</span>
                        })}</td>

                        <td className="pt-4 d-flex text-capitalize">{item.defaulterEntry.debtor.companyName}
                            <br />
                            {item.defaulterEntry.debtor.address1} {item.defaulterEntry.debtor.address2}, {item.defaulterEntry.debtor.city}</td>

                        <td className="pt-4">
                            {numberFormat(item.defaulterEntry.totalAmount)}
                            {/* <CurrencyFormat value={item.defaulterEntry.totalAmount} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}

                        </td>

                        <td >

                            <div className="" style={{ padding: "2px 15px" }}>

                                <div className=" text-center bg-success rounded text-light">
                                    <div className="text-capitalize">

                                        {getDaysArray[index]}  &nbsp;


                                        <span className="ml-1">Days</span> </div>
                                    <div className="text-capitalize" >{item.paymentDate}</div>
                                </div>
                            </div>

                        </td>
                        <td className="pt-4">4.2</td>
                        <td>
                            <div className="pt-2">
                                &nbsp;
                                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                    title="Upload Pending Files" href={item.url} rel='noreferrer'
                                    target='_blank' onClick={() => handleUploadFiles(item)

                                    }>
                                    <i className='bx bx-cloud-upload textsizing' ></i>
                                </button>
                                &nbsp;


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

export default withRouter(UploadPendingListModule)
