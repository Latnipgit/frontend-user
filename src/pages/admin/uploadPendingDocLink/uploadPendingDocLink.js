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
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify"
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    InputGroup
} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPendingListStart } from "store/UploadPendingDocList/UploadPendingDocList.action"
import { selectTransactionsRaisedByMeDataMap, selectTransactionsSentToMeDataMap } from "store/UploadPendingDocList/UploadPendingDocList.selecter"


import { selectUploadPendigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import { setUploadPednigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.action"

import {
    SrNo,
} from ".././company-search/companyssearchColl";


export const UploadPendingLinkModule = props => {
    const dispatch = useDispatch();
    const [selectType, setSelectType] = useState('')
    const selectTransactionsRaisedByMe = useSelector(selectTransactionsRaisedByMeDataMap);
    const selectTransactionsSentToMe = useSelector(selectTransactionsSentToMeDataMap);
    const uploadFilesModalShow = useSelector(selectUploadPendigDocOpen);
    const toggleUploiadFiles = () => dispatch(setUploadPednigDocOpen(!uploadFilesModalShow));

    useEffect(() => {
        dispatch(fetchUploadPendingListStart())
        setSelectType('CREDITOR')
    }, [])

    const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState({
        "_id": "659ac60b09487214a4524532",
        "defaulterEntryId": "6597242c61de1d0e991d5ee6",
        "defaulterEntry": {
            "_id": "6597242c61de1d0e991d5ee6",
            "debtor": {
                "_id": "658ea4412a986850aee3851d",
                "companyName": "ltim",
                "gstin": "99693257",
                "companyPan": "ltim",
                "creditorCompanyId": "658c45c62a986850aee382d9",
                "debtorType": "Business",
                "salutation": "Mr.",
                "firstname": "Rohan",
                "lastname": "Sharma",
                "customerEmail": "santathenoobda2000@gmail.com",
                "customerMobile": "9969325740",
                "address1": "address1",
                "address2": "address2",
                "city": "city",
                "state": "state",
                "zipcode": "zipcode",
                "createdAt": "2023-12-29T10:49:37.889Z",
                "updatedAt": "2024-01-06T11:48:39.536Z",
                "__v": 0,
                "ratings": [
                    "658ead01153533b5c9a64815",
                    "658eae3435fed113fd8946bc",
                    "658ff0821e6170796a2da0a5",
                    "65993e1751e7593b89f1adda"
                ]
            },
            "creditorCompanyId": "658c45c62a986850aee382d9",
            "invoices": [
                {
                    "_id": "6597242c61de1d0e991d5ede",
                    "billDate": "2023-12-04",
                    "billDescription": "Bill for things",
                    "billNumber": 11223344,
                    "creditAmount": 1200000,
                    "remainingAmount": 800000,
                    "interestRate": 10,
                    "creditLimitDays": 20,
                    "remark": "remarks",
                    "items": [
                        {
                            "name": "V8 Engine",
                            "quantity": "1",
                            "cost": "1000000"
                        },
                        {
                            "name": "Anti-waffe Tyres",
                            "quantity": "1",
                            "cost": "1000000"
                        }
                    ],
                    "subTotal": 500,
                    "tax": 50,
                    "referenceNumber": "12",
                    "invoiceNumber": "123",
                    "dueDate": "2023-12-24T00:00:00.000Z",
                    "percentage": "45",
                    "type": "EXTERNAL",
                    "purchaseOrderDocument": [
                        {
                            "_id": "659ba50f91dc6f176dca2210",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (1).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699150785-4e572cadd6b78a12-WAY2023055%20(1).pdf",
                            "uniqueName": "1704699150785-4e572cadd6b78a12-WAY2023055 (1).pdf",
                            "createdAt": "2024-01-08T07:32:31.710Z",
                            "updatedAt": "2024-01-08T07:32:31.710Z",
                            "__v": 0
                        }
                    ],
                    "challanDocument": [
                        {
                            "_id": "659ba58091dc6f176dca221c",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (2).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699263803-662f0f6d9aa40a7f-WAY2023055%20(2).pdf",
                            "uniqueName": "1704699263803-662f0f6d9aa40a7f-WAY2023055 (2).pdf",
                            "createdAt": "2024-01-08T07:34:24.736Z",
                            "updatedAt": "2024-01-08T07:34:24.736Z",
                            "__v": 0
                        }
                    ],
                    "invoiceDocument": [
                        {
                            "_id": "659ba50f91dc6f176dca2210",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (1).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699150785-4e572cadd6b78a12-WAY2023055%20(1).pdf",
                            "uniqueName": "1704699150785-4e572cadd6b78a12-WAY2023055 (1).pdf",
                            "createdAt": "2024-01-08T07:32:31.710Z",
                            "updatedAt": "2024-01-08T07:32:31.710Z",
                            "__v": 0
                        }
                    ],
                    "transportationDocument": [
                        {
                            "_id": "659ba50f91dc6f176dca2210",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (1).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699150785-4e572cadd6b78a12-WAY2023055%20(1).pdf",
                            "uniqueName": "1704699150785-4e572cadd6b78a12-WAY2023055 (1).pdf",
                            "createdAt": "2024-01-08T07:32:31.710Z",
                            "updatedAt": "2024-01-08T07:32:31.710Z",
                            "__v": 0
                        }
                    ],
                    "createdAt": "2024-01-04T21:33:32.886Z",
                    "updatedAt": "2024-01-20T09:33:16.314Z",
                    "__v": 0,
                    "otherDocuments": []
                },
                {
                    "_id": "6597242c61de1d0e991d5ee4",
                    "billDate": "2023-12-04",
                    "billDescription": "Bill for things",
                    "billNumber": 11223344,
                    "creditAmount": 1200000,
                    "remainingAmount": 800000,
                    "interestRate": 10,
                    "creditLimitDays": 20,
                    "remark": "remarks",
                    "items": [
                        {
                            "name": "V8 Engine",
                            "quantity": "1",
                            "cost": "1000000"
                        },
                        {
                            "name": "Anti-waffe Tyres",
                            "quantity": "1",
                            "cost": "1000000"
                        }
                    ],
                    "subTotal": 500,
                    "tax": 50,
                    "referenceNumber": "12",
                    "invoiceNumber": "123",
                    "dueDate": "2023-12-24T00:00:00.000Z",
                    "percentage": "45",
                    "type": "EXTERNAL",
                    "purchaseOrderDocument": [
                        {
                            "_id": "659ba58091dc6f176dca221c",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (2).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699263803-662f0f6d9aa40a7f-WAY2023055%20(2).pdf",
                            "uniqueName": "1704699263803-662f0f6d9aa40a7f-WAY2023055 (2).pdf",
                            "createdAt": "2024-01-08T07:34:24.736Z",
                            "updatedAt": "2024-01-08T07:34:24.736Z",
                            "__v": 0
                        }
                    ],
                    "challanDocument": [
                        {
                            "_id": "659ba50f91dc6f176dca2210",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (1).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699150785-4e572cadd6b78a12-WAY2023055%20(1).pdf",
                            "uniqueName": "1704699150785-4e572cadd6b78a12-WAY2023055 (1).pdf",
                            "createdAt": "2024-01-08T07:32:31.710Z",
                            "updatedAt": "2024-01-08T07:32:31.710Z",
                            "__v": 0
                        }
                    ],
                    "invoiceDocument": [
                        {
                            "_id": "659ba50f91dc6f176dca2210",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (1).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699150785-4e572cadd6b78a12-WAY2023055%20(1).pdf",
                            "uniqueName": "1704699150785-4e572cadd6b78a12-WAY2023055 (1).pdf",
                            "createdAt": "2024-01-08T07:32:31.710Z",
                            "updatedAt": "2024-01-08T07:32:31.710Z",
                            "__v": 0
                        }
                    ],
                    "transportationDocument": [
                        {
                            "_id": "659ba50f91dc6f176dca2210",
                            "userId": "658c5db12a986850aee382ed",
                            "name": "WAY2023055 (1).pdf",
                            "url": "https://bafanabackendfilestorage.blob.core.windows.net/bafana-backend-files-container/1704699150785-4e572cadd6b78a12-WAY2023055%20(1).pdf",
                            "uniqueName": "1704699150785-4e572cadd6b78a12-WAY2023055 (1).pdf",
                            "createdAt": "2024-01-08T07:32:31.710Z",
                            "updatedAt": "2024-01-08T07:32:31.710Z",
                            "__v": 0
                        }
                    ],
                    "createdAt": "2024-01-04T21:33:32.936Z",
                    "updatedAt": "2024-01-20T09:33:18.016Z",
                    "__v": 0,
                    "otherDocuments": []
                }
            ],
            "totalAmount": "-800000",
            "createdAt": "2024-01-04T21:33:32.949Z",
            "updatedAt": "2024-01-08T16:27:35.258Z",
            "__v": 0,
            "status": "PAID",
            "creditor": {
                "_id": "658c45c62a986850aee382d9",
                "companyName": "Rohan Test Company",
                "gstin": "29GGGGG1314R9Z6",
                "companyPan": "ABCTY1234D",
                "createdAt": "2023-12-27T15:41:58.381Z",
                "updatedAt": "2023-12-27T15:41:58.381Z",
                "__v": 0,
                "city": "Mumbai",
                "state": "Maharashtra"
            }
        },
        "amtPaid": "260000",
        "requestor": "DEBTOR",
        "paymentDate": "22-12-2023",
        "debtorAttachments": [],
        "creditorAttachments": [],
        "status": "DOCUMENTS_NEEDED",
        "pendingWith": "USER",
        "approvedByCreditor": "false",
        "isDispute": false,
        "createdAt": "2024-01-07T15:40:59.599Z",
        "updatedAt": "2024-02-06T08:38:14.858Z",
        "__v": 1,
        "documentsPendingSince": "2024-02-06T00:00:00.000Z",
        "creditoradditionaldocuments": [
            "659ba58091dc6f176dca221c"
        ],
        "creditorcacertificate": [
            "659ba50f91dc6f176dca2210"
        ],
        "debtoradditionaldocuments": [],
        "debtorcacertificate": [],
        "adminRemarksForCreditor": "Creditor Should upload all documents again",
        "adminRemarksForDebtor": "debtor should upload cacertificate and additionaldocuments",
        "documentsRequiredFromCreditor": [
            "purchaseOrderDocument",
            "challanDocument",
            "invoiceDocument",
            "transportationDocument",
            "cacertificate",
            "additionaldocuments"
        ],
        "documentsRequiredFromDebtor": [
            "cacertificate",
            "additionaldocuments"
        ],
        "isDocumentsRequiredByCreditor": true,
        "SrNo": 4
    })

    const submitCheck = (value) => {
        if (value) toast.success("File Upload Successfully")
    }

    const [uploadCAId, setuploadCAId] = useState('')
    const [uploadAdditionId, setuploadAdditionId] = useState('')
    const [warongText, setWarongText] = useState(false)
    const cuuretchek = 1

    const [docData, setDocData] = useState([
        {
            invoiceId: "",
            uploadpurchaseId: "",
            uploadChallanId: "",
            uploadInvoiceId: "",
            uploadTransportId: "",
        },
    ])


    /*  function handInvoiceID(value, currenIndex) {
       debugger
       const newData = [...docData]
   
       const payload = 
       newData[currenIndex].invoiceId = value
       setDocData(newData)
     } */



    /*   const uploadUploadPednigFile = useSelector(uploadUploadPednigDocID) */
    const handleFileChange = (event, fieldName, currenIndex) => {
        const files = event.target.files
        const formData = new FormData();
        formData.append('file', files[0]);   //append the values with key, value pair
        formData.append('fieldName', fieldName);
        uploadFile(formData, currenIndex)

    }

    function uploadFile(formData, currenIndex) {
        const token = sessionStorage.getItem("tokenemployeeRegister")
        const headers = {
            'x-access-token': token != null ? token : '',
        };
        axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
            headers: headers
        })
            .then((response) => {

                if (response.data.response.fieldName == "invoiceDocument") {
                    const newData = [...docData]
                    newData[currenIndex].uploadInvoiceId = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "purchaseOrderDocument") {
                    const newData = [...docData]
                    newData[currenIndex].uploadpurchaseId = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "challanDocument") {
                    const newData = [...docData]
                    newData[currenIndex].uploadChallanId = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "transportationDocument") {
                    const newData = [...docData]
                    newData[currenIndex].uploadTransportId = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "cacertificate") {

                    setuploadCAId(response.data.response)
                }
                if (response.data.response.fieldName == "additionaldocuments") {

                    setuploadAdditionId(response.data.response)
                }
            })
            .catch((error) => {

            })
    }

    const handleSubmit = (item) => {
        const payload = {
            "paymentId": "65aba5d07c7388ab35450afa",
            "type": selectType, // DEBTOR/CREDITOR
            // Below documents are required for type DEBTOR
            "debtorcacertificate": selectType == 'DEBTOR' ? uploadCAId.documentId : '',
            "debtoradditionaldocuments": selectType == 'DEBTOR' ? uploadAdditionId.documentId : '',
            // Below documents are required for type CREDITOR
            "creditorcacertificate": selectType == 'CREDITOR' ? uploadCAId.documentId : '',
            "creditoradditionaldocuments": selectType == 'CREDITOR' ? uploadAdditionId.documentId : '',
            "attachment": selectType == 'DEBTOR' ? docData : ''
        }
        if (selectType == "CREDITOR") {
            let checkvalue = false
            docData.map((obj) => {
                checkvalue = Object.values(obj).includes('')
            })
            if (checkvalue) {
                setWarongText(true)
                return
            }
        }

        const uploadCA = Object.keys(uploadCAId).length;
        if (uploadCA == 0) {
            setWarongText(true)
            return
        }


        /*     const uploadAddition = Object.keys(uploadAdditionId).length;
            if (uploadAddition == 0) {
              setWarongText(true)
              return
            } */


        toggle()
        submitCheck(true)
        dispatch(uploadUploadPednigDocID(payload))


    }

    const createinvoiceObj = () => {
        uploadFilesModelDataForUpload.defaulterEntry.invoices.map((item, currenIndex, arr) => {
            if (currenIndex == 0) {
                const newData = [...docData]
                newData[currenIndex].invoiceId = item._id
                setDocData(newData)
            }

            if (currenIndex > 0) {
                setDocData([
                    ...docData,
                    {
                        invoiceId: item._id,
                        uploadpurchaseId: "",
                        uploadChallanId: "",
                        uploadInvoiceId: "",
                        uploadTransportId: "",
                    },
                ])
            }
        })
    }

    useEffect(() => {
        if (uploadFilesModelDataForUpload != '' && uploadFilesModelDataForUpload.defaulterEntry.invoices != undefined) {
            createinvoiceObj()
        }

    }, [cuuretchek])

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="mb-4 h4 card-title"></div>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col md={10} className="pl-3">
                            <h5 className="m-1">Upload Pending Documents</h5>
                        </Col>
                    </Row>
                    {uploadFilesModelDataForUpload != '' && uploadFilesModelDataForUpload.defaulterEntry.invoices != undefined ? uploadFilesModelDataForUpload.defaulterEntry.invoices.map((item, currenIndex) => {

                        return <Row className="bg-light p-3 mt-2" key={item}>
                            <Row>
                                <Col md={3}><strong>Invoice Number : {item.invoiceNumber}</strong></Col>
                                <Col md={3}><strong>Due Date : {moment(item.dueDate).format("DD-MM-YYYY")}</strong></Col>
                                <Col md={4}><strong className="d-flex">Due Amount :
                                    <CurrencyFormat value={item.remainingAmount.toFixed(1)} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

                                </strong></Col>
                                <Col md={2}>

                                </Col>

                            </Row>
                            <Row className="mt-4">
                                {selectType == 'CREDITOR' && (<>
                                    {uploadFilesModelDataForUpload.documentsRequiredFromCreditor.map((value, indix) => {
                                        return (value !== "cacertificate" && value !== "additionaldocuments" && (
                                            <Col md={3} key={indix}>
                                                <Row>
                                                    <Col md={12}>
                                                        <InputGroup className="text-capitalize">
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id={value}
                                                                accept=".pdf, .png, .jpg, .jpeg"
                                                                aria-describedby="fileUploadHelp"
                                                                onChange={e =>
                                                                    handleFileChange(e, value, currenIndex)
                                                                }
                                                            />
                                                        </InputGroup>
                                                        <b>{value == "purchaseOrderDocument" && ('Purchase Order Document')}
                                                            {value == "challanDocument" && ('Challan Document')}
                                                            {value == "invoiceDocument" && ('Invoice Document')}
                                                            {value == "transportationDocument" && ('Transportation Document')}
                                                        </b>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )

                                        )
                                    })}</>)}
                            </Row>
                        </Row>
                    }) : ""}
                    {selectType == 'CREDITOR' && (
                        <Row className="bg-light p-3 mt-2">
                            <Row className="mt-4">
                                {selectType == 'CREDITOR' && (<>
                                    {uploadFilesModelDataForUpload.documentsRequiredFromCreditor.map((value, indix) => {
                                        return (
                                            <>
                                                {value == "cacertificate" || value == "additionaldocuments" ? (<Col md={3} key={value}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <InputGroup className="text-capitalize">
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id={value}
                                                                    accept=".pdf, .png, .jpg, .jpeg"
                                                                    aria-describedby="fileUploadHelp"
                                                                    onChange={e =>
                                                                        handleFileChange(e, value)
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <b>
                                                                {value == "cacertificate" && ('CA Certificate Document')}
                                                                {value == "additionaldocuments" && ('Additional Document')}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                </Col>) : ""}
                                            </>
                                        )
                                    })}</>)}
                            </Row>
                        </Row>
                    )}

                    {selectType == 'DEBTOR' && (
                        <Row className="bg-light p-3 mt-2">
                            <Row className="mt-4">
                                {selectType == 'DEBTOR' && (<>
                                    {uploadFilesModelDataForUpload.documentsRequiredFromDebtor.map((value, indix) => {
                                        return (
                                            <>
                                                {value == "cacertificate" || value == "additionaldocuments" ? (<Col md={3} key={value}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <InputGroup className="text-capitalize">
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id={value}
                                                                    accept=".pdf, .png, .jpg, .jpeg"
                                                                    aria-describedby="fileUploadHelp"
                                                                    onChange={e =>
                                                                        handleFileChange(e, value)
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <b>
                                                                {value == "cacertificate" && ('CA Certificate Document')}
                                                                {value == "additionaldocuments" && ('Additional Document')}
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                </Col>) : ""}
                                            </>
                                        )
                                    })}</>)}
                            </Row>
                        </Row>
                    )}

                    <Row className="mt-3">
                        <Col md={10} className="text-center mt-2">
                            {warongText && <b className="text-danger ">Please Upload All Document</b>}

                        </Col>
                        <Col md={2} className="text-end">
                            <Button className="btn btn-info" onClick={() => handleSubmit()}>Submit</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <ToastContainer />
        </React.Fragment>
    );
}



