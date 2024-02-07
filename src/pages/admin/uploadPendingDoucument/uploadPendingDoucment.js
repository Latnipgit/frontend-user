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
import { selectUploadingPendingListData, selectTransactionsRaisedByMeData, selectTransactionsSentToMeData, selectTransactionsRaisedByMeDataMap, selectTransactionsSentToMeDataMap } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import UploadPendingDocModel from "./uploadPendingDoc"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import { numberFormat } from "./uploadPendingDoc"
import ViewDetailsReportDefaultModal from "../Invoice/viewDetailsReportDefaultModal"
import { ReportRaisedByMeTable } from "./uploadRaisedByMe"
import { ReportSentTomeTable } from "./uploadSentTome"
import { selectUploadPendigDocOpen, uploadPendigDocSelector } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import { setUploadPednigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.action"
/* import './style.css' */
// import { ToastContainer } from "react-toastify"
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


const UploadPendingListModule = props => {
    const dispatch = useDispatch();
    const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector);
    const isReportDefOpen = useSelector(selectReportDefOpen);



    const selectTransactionsRaisedByMe = useSelector(selectTransactionsRaisedByMeDataMap);
    const selectTransactionsSentToMe = useSelector(selectTransactionsSentToMeDataMap);

    const uploadFilesModalShow = useSelector(selectUploadPendigDocOpen);
    const toggleUploiadFiles = () => dispatch(setUploadPednigDocOpen(!uploadFilesModalShow));

    useEffect(() => {
        dispatch(getAllInvoice());
        dispatch(setIsViewDetailModalOpen())
        dispatch(fetchUploadPendingListStart())
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
        dispatch(setUploadPednigDocOpen(!uploadFilesModalShow))
    }


    const Reatings = (cell) => {
        return <div>4.2</div>;
    };

    const DueSincedate = (cell) => {
        const today = new Date();
        const newDate = cell.cell.row.original.paymentDate != undefined ? cell.cell.row.original.paymentDate.split("-").reverse().join("-") : "";
        const currentDate = new Date(newDate);

        const calculateDateDifference = () => {
            const differenceInMilliseconds = today - currentDate;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            return differenceInDays;
        };

        return (
            <div className="" style={{ padding: "2px 15px" }}>
                <div className=" text-center bg-danger rounded text-light p-1">
                    <div className="text-capitalize">
                        {calculateDateDifference()}  &nbsp;
                        <span className="ml-1">Days</span> </div>
                    <div className="text-capitalize" >{cell.cell.row.original.paymentDate}</div>
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
                    return <SrNo {...cellProps} />;
                },
            },
            {
                Header: "COMPANY NAME",
                accessor: "CompanyName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {cellProps.cell.row.original.defaulterEntry.creditor.companyName}
                    </div>

                },
            },
            {
                Header: "INVOICE NUMBER",
                accessor: "PANCARD",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {cellProps.cell.row.original.defaulterEntry.invoices.map((x) => {
                            return <span key={x}>{x.invoiceNumber}, &nbsp;</span>
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
                    return <div className="d-flex text-capitalize">{cellProps.cell.row.original.defaulterEntry.creditor.companyName}
                        <br />
                        {cellProps.cell.row.original.defaulterEntry.creditor.address1} {cellProps.cell.row.original.defaulterEntry.creditor.address2}, {cellProps.cell.row.original.defaulterEntry.creditor.city}
                    </div>
                },
            },
            {
                Header: "DUE AMOUNT",
                accessor: "totalAmount",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {numberFormat(cellProps.cell.row.original.defaulterEntry.totalAmount)}
                    </div>;
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
                Header: "RATINGS",
                accessor: "RATINGS",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <Reatings {...cellProps} />;
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
                                &nbsp;
                                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                    title="Upload Pending Files" href={cellProps.cell.row.original.url} rel='noreferrer'
                                    target='_blank' onClick={() => handleUploadFiles(cellProps.cell.row.original)

                                    }>
                                    <i className='bx bx-cloud-upload textsizing' ></i>
                                </button>
                                &nbsp;


                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    );
    const columns2 = useMemo(
        () => [
            {
                Header: "Sr No",
                accessor: "SrNo",
                filterable: false,
                disableFilters: true,
                Cell: cellProps => {
                    return <SrNo {...cellProps} />;
                },
            },
            {
                Header: "COMPANY NAME",
                accessor: "CompanyName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {cellProps.cell.row.original.defaulterEntry.debtor.companyName}
                    </div>

                },
            },
            {
                Header: "INVOICE NUMBER",
                accessor: "PANCARD",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {cellProps.cell.row.original.defaulterEntry.invoices.map((x) => {
                            return <span key={x}>{x.invoiceNumber}, &nbsp;</span>
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
                    return <div className=" d-flex text-capitalize">
                        {cellProps.cell.row.original.defaulterEntry.debtor.companyName}
                        <br />
                        {cellProps.cell.row.original.defaulterEntry.debtor.address1} {cellProps.cell.row.original.defaulterEntry.debtor.address2}, {cellProps.cell.row.original.defaulterEntry.debtor.city}
                    </div>
                },
            },
            {
                Header: "DUE AMOUNT",
                accessor: "totalAmount",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {numberFormat(cellProps.cell.row.original.defaulterEntry.totalAmount)}
                    </div>;
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
                Header: "RATINGS",
                accessor: "RATINGS",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <Reatings {...cellProps} />;
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
                                &nbsp;
                                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                    title="Upload Pending Files" href={cellProps.cell.row.original.url} rel='noreferrer'
                                    target='_blank' onClick={() => handleUploadFiles(cellProps.cell.row.original)

                                    }>
                                    <i className='bx bx-cloud-upload textsizing' ></i>
                                </button>
                                &nbsp;


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
            <UploadPendingDocModel isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} invoiceId={invoiceIdsForCAcertificate} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} />
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
                        <TableContainer
                            columns={columns}
                            data={selectTransactionsRaisedByMe}
                            isGlobalFilter={false}
                            isAddOptions={false}
                            customPageSize={20}
                        />

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
                        <TableContainer
                            columns={columns2}
                            data={selectTransactionsSentToMe}
                            isGlobalFilter={false}
                            isAddOptions={false}
                            customPageSize={20}
                        />
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}



export default withRouter(UploadPendingListModule)
