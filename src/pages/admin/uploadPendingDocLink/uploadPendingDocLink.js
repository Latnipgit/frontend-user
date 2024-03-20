import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import 'react-table-6/react-table.css'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify"
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    InputGroup,
    Container,
    CardFooter
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
const API_URL = 'https://bafana-backend.azurewebsites.net';
const axiosApi = axios.create({ baseURL: API_URL });
const currenNumner = 1

export const UploadPendingLinkModule = props => {
    const dispatch = useDispatch();
    const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState('')



    console.log('token', uploadFilesModelDataForUpload);

    const location = useLocation()
    const newtoken = useMemo(() => new URLSearchParams(location.search).get('token'), [location.search]);
    const selectType = useMemo(() => new URLSearchParams(location.search).get('userType'), [location.search]);

    useEffect(() => {
        getDataFromToken(newtoken)
    }, [])

    const getDataFromToken = async (newtoken, config = {}) => {
        try {
            const data = { token: newtoken };
            const response = await axiosApi.post('/api/admin/getDocumentsRequiredFromPaymentId', { ...data }, config);
            setuploadFilesModelDataForUpload(response.data.response);
        } catch (error) {
            console.log('error', error);
        }
    };

    const [docData, setDocData] = useState([])

    console.log('docDa', docData);

    const createinvoiceObj = () => {
        const newDataArray = uploadFilesModelDataForUpload.defaulterEntry.invoices.map((item, currentIndex) => {
            const docObj = {};
            uploadFilesModelDataForUpload.documentsRequiredFromCreditor.forEach((value) => {
                if (value !== "cacertificate" && value !== "additionaldocuments" && value !== "PaymentSeller") {
                    docObj[value] = '';
                }
            });
            docObj.invoiceId = item._id;
            return docObj;
        });
        const updatedDocData = [...docData, ...newDataArray];
        setDocData(updatedDocData);
    };


    useEffect(() => {
        if (uploadFilesModelDataForUpload && uploadFilesModelDataForUpload.defaulterEntry && uploadFilesModelDataForUpload.defaulterEntry.invoices) {
            createinvoiceObj();
        }
    }, [uploadFilesModelDataForUpload])

    const submitCheck = (value) => {
        if (value) toast.success("File Upload Successfully")
    }

    const [uploadCAId, setuploadCAId] = useState('')
    const [uploadAdditionId, setuploadAdditionId] = useState('')
    const [warongText, setWarongText] = useState(false)


    /*   const uploadUploadPednigFile = useSelector(uploadUploadPednigDocID) */
    const handleFileChange = (event, fieldName, currenIndex) => {
        const files = event.target.files
        const formData = new FormData();
        formData.append('file', files[0]);   //append the values with key, value pair
        formData.append('fieldName', fieldName)
        formData.append('token', newtoken);
        uploadFile(formData, currenIndex)

    }

    function uploadFile(formData, currenIndex) {
        axiosApi.post('/api/files/uploadDirect', formData)
            .then((response) => {

                if (response.data.response.fieldName == "invoiceDocument") {
                    const newData = [...docData]
                    newData[currenIndex].invoiceDocument = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "purchaseOrderDocument") {
                    const newData = [...docData]
                    newData[currenIndex].purchaseOrderDocument = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "challanDocument") {
                    const newData = [...docData]
                    newData[currenIndex].challanDocument = response.data.response.documentId
                    setDocData(newData)
                }
                if (response.data.response.fieldName == "transportationDocument") {
                    const newData = [...docData]
                    newData[currenIndex].transportationDocument = response.data.response.documentId
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
            "token": newtoken,
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
        } else {
            setWarongText(false)
        }


        /*     const uploadAddition = Object.keys(uploadAdditionId).length;
            if (uploadAddition == 0) {
              setWarongText(true)
              return
            } */
        submitCheck(true)
        sumbitDataSuccessFull(payload)

        setTimeout(() => {
            window.location.href = '/login'
        }, 1000);
    }

    const sumbitDataSuccessFull = async (payload, config = {}) => {
        try {
            const response = await axiosApi.post('/api/user/uploadSupportingDocumentsDirect', { ...payload }, config);
        } catch (error) {
            console.log('error', error);
        }
    };




    const footerStyles = {
        //   backgroundColor: '#333',
        color: '#333',
        padding: '20px',
        textAlign: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
    };

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
                                <Col md={4}><strong className="d-flex">Due Amount : {numberFormat(item.remainingAmount)}</strong></Col>
                                <Col md={2}>

                                </Col>

                            </Row>
                            <Row className="mt-4">
                                {selectType == 'CREDITOR' && (<>
                                    {uploadFilesModelDataForUpload.documentsRequiredFromCreditor.map((value, indix) => {
                                        return (value !== "cacertificate" && value !== "additionaldocuments" && value !== "PaymentSeller" && (
                                            <Col md={3} key={value}>
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
                                    {uploadFilesModelDataForUpload != '' ? uploadFilesModelDataForUpload.documentsRequiredFromCreditor.map((value, index) => {
                                        return (
                                            <>
                                                {value == "cacertificate" || value == "additionaldocuments" ? (
                                                    <Col md={3} key={index}>
                                                        <Row >
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
                                    }) : ''}</>)}
                            </Row>
                        </Row>
                    )}

                    {selectType == 'DEBTOR' && (
                        <Row className="bg-light p-3 mt-2">
                            <Row className="mt-4">
                                {selectType == 'DEBTOR' && (<>
                                    {uploadFilesModelDataForUpload != '' ? uploadFilesModelDataForUpload.documentsRequiredFromDebtor.map((value, indix) => {
                                        return (
                                            <>
                                                {value == "cacertificate" || value == "additionaldocuments" ? (
                                                    <Col md={3} key={`${value} ${indix}`}>
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
                                    }) : ''}</>)}
                            </Row>
                        </Row>
                    )}

                    <Row className="mt-3">
                        <Col md={10} className="text-center mt-2">
                            {warongText && <b className="text-danger ">Please Upload All Documents</b>}

                        </Col>
                        <Col md={2} className="text-end">
                            <Button className="btn btn-info" onClick={() => handleSubmit()}>Submit</Button>
                        </Col>
                    </Row>
                </CardBody>

            </Card>
            <ToastContainer />
            <CardFooter>
                <footer style={footerStyles}>
                    <Row>
                        <Col md={6} >
                            <div className="text-sm-start d-none d-sm-block">
                                {new Date().getFullYear()} © Bafana.
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Design & Develop by Latnip IT Solutions
                            </div>
                        </Col>
                    </Row>
                </footer>
            </CardFooter>

        </React.Fragment>
    );
}



