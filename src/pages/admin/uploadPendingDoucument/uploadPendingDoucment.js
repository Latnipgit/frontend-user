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
import { ReportRaisedByMeTable } from "./uploadRaisedByMe"
import { ReportSentTomeTable } from "./uploadSentTome"

/* import './style.css' */
// import { ToastContainer } from "react-toastify"



const UploadPendingListModule = props => {
    const [modal1, setModal1] = useState(false);
    const [getDaysArray, setgetDaysArray] = useState([]);
    const [getDaysArrySecond, setgetDaysArrySecond] = useState([])
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

        selectTransactionsRaisedByMe.length > 0 ? selectTransactionsRaisedByMe.map((item) => {
            const a = moment(item.defaulterEntry.debtor.createdAt).format("YYYY-MM-DD")
            const today = new Date();
            const newDate = a.split("-").reverse().join("-");
            const currentDate = new Date(a);
            const differenceInMilliseconds = today - currentDate;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            setgetDaysArray(items => [...items, differenceInDays])
        }) : []

        selectTransactionsSentToMe.length > 0 ? selectTransactionsSentToMe.map((item) => {
            const a = moment(item.defaulterEntry.debtor.createdAt).format("YYYY-MM-DD")
            const today = new Date();
            const newDate = a.split("-").reverse().join("-");
            const currentDate = new Date(a);
            const differenceInMilliseconds = today - currentDate;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            setgetDaysArrySecond(items => [...items, differenceInDays])
        }) : []
    }

    const requestEdit = (item) => {

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
                                {selectTransactionsRaisedByMe.length > 0 ? <ReportRaisedByMeTable GetUploadPendingList={selectTransactionsRaisedByMe} viewModel={viewModel} requestEdit={requestEdit} handleUploadFiles={handleUploadFiles} toggleViewModal2={toggleViewModal2} handleViewDetail={handleViewDetail} setinvoiceIdsForCAcertificate={setinvoiceIdsForCAcertificate} getDaysArray={getDaysArray} /> : ''}
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
                                {selectTransactionsSentToMe.length > 0 ? <ReportSentTomeTable GetUploadPendingList={selectTransactionsSentToMe} handleUploadFiles={handleUploadFiles} getDaysArray={getDaysArrySecond} /> : ''}
                            </tbody>
                        </table>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}



export default withRouter(UploadPendingListModule)
