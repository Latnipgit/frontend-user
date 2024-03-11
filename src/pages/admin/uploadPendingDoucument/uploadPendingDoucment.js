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
import { ToastContainer, toast } from "react-toastify"
import {
    Row,
    Col,
    Card,
    CardBody,

} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPendingListStart } from "store/UploadPendingDocList/UploadPendingDocList.action"
import { selectTransactionsRaisedByMeDataMap, selectTransactionsSentToMeDataMap } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import UploadPendingDocModel from "./uploadPendingDoc"
import { numberFormat } from "./uploadPendingDoc"
import { selectUploadPendigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import { setUploadPednigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.action"

import {
    SrNo,
} from ".././company-search/companyssearchColl";


const UploadPendingListModule = props => {
    const dispatch = useDispatch();
    const [selectType, setSelectType] = useState('')
    const selectTransactionsRaisedByMe = useSelector(selectTransactionsRaisedByMeDataMap);
    const selectTransactionsSentToMe = useSelector(selectTransactionsSentToMeDataMap);
    const uploadFilesModalShow = useSelector(selectUploadPendigDocOpen);
    const toggleUploiadFiles = () => dispatch(setUploadPednigDocOpen(!uploadFilesModalShow));

    useEffect(() => {
        dispatch(fetchUploadPendingListStart())
    }, [])

    console.log('selectTransactionsRaisedByMe', selectTransactionsRaisedByMe);

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
                                    target='_blank' onClick={() => { handleUploadFiles(cellProps.cell.row.original), setSelectType('CREDITOR') }

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
                                    target='_blank' onClick={() => { handleUploadFiles(cellProps.cell.row.original), setSelectType('DEBTOR') }
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

    const submitCheck = (value) => {
        if (value) toast.success("File Upload Successfully")
    }

    return (
        <React.Fragment>
            {uploadFilesModalShow && (<UploadPendingDocModel isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} selectType={selectType} submitCheck={submitCheck} />)}
            <Card>
                <CardBody>
                    <div className="mb-4 h4 card-title"></div>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col md={10} className="pl-3">
                            <h5 className="m-1">My Complaints</h5>
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
                            <h5 className="m-1">Complaints Against me </h5>
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
            <ToastContainer />
        </React.Fragment>
    );
}



export default withRouter(UploadPendingListModule)
