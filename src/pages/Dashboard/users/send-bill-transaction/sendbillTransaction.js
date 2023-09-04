import React from 'react';
import * as Yup from 'yup';
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';
import {
    Card,
    Col,
    Container,
    Row,
    CardBody,
    CardTitle,
    Label,
    Button,
    Form,
    Input,
    InputGroup,
} from "reactstrap";
const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    gstNumber: Yup.string().required('GST Number is required'),
    panCardNumber: Yup.string().required('PAN Card Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    adharCardNumber: Yup.string().required('Adhar Card Number is required'),
});

const initialValues = {
    customerName: '',
    billDate: '',
    billDescription: '',
    billNumber: '',
    billInvoiveCopy: '',
    creditAmount: '',
    precentage: '',
    creditLimitdays: '',
    remarks:'',
};

const SendBillTransaction = () => {
    const handleSubmit = (values) => {
        // Handle form submission logic here
        console.log(values);
    };

    return (
        <Container fluid className="mt-5">
            <Row>
                <Col lg={12}>
                    <Card className="mt-5">
                        <CardBody>
                            <CardTitle className="h5 mb-4">Send Bill Transactions</CardTitle>

                            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit}>

                                <Col xs={12} md={12}>
                                    <label className="visually-hidden" htmlFor="companyName">
                                        Customer Name
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-account-card-details" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="customerName"
                                            placeholder="Customer Name"
                                        // value={companyName}
                                        // onChange={handleCompanyNameChange}
                                        />
                                    </InputGroup>
                                </Col>

                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="gstNumber">
                                        Bill Date
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-file-document" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="billDate"
                                            placeholder="Bill Date"
                                        // value={gstNumber}
                                        // onChange={handleGstNumberChange}
                                        />
                                    </InputGroup>
                                </Col>

                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="panNumber">
                                        Bill Description
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="billDescription"
                                            placeholder="PAN Card Number"
                                        // value={panNumber}
                                        // onChange={handlePanNumberChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="panNumber">
                                        Bill Number
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="billNumber"
                                            placeholder="Bill Number"
                                        // value={panNumber}
                                        // onChange={handlePanNumberChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="panNumber">
                                        Bill Invoice Copy
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="billInvoiceCopy"
                                            placeholder="Bill Invoice Copy"
                                        // value={panNumber}
                                        // onChange={handlePanNumberChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="panNumber">
                                        Credit Amount
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="creditAmount"
                                            placeholder="Bill Invoice Copy"
                                        // value={panNumber}
                                        // onChange={handlePanNumberChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="panNumber">
                                        Percentage
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="creditAmount"
                                            placeholder="Interest Rate"
                                        // value={panNumber}
                                        // onChange={handlePanNumberChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="panNumber">
                                        Credit Limit Days
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="creditLimitDays"
                                            placeholder="Credit Limit Days"
                                        // value={panNumber}
                                        // onChange={handlePanNumberChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <label className="visually-hidden" htmlFor="remarks">
                                        Remarks
                                    </label>
                                    <InputGroup>
                                        <div className="input-group-text">
                                            <i className="mdi mdi-credit-card" />
                                        </div>
                                        <textarea
                                            className={`form-control`}
                                            id="remarks" // Change the id to "remarks"
                                            placeholder="Remarks" // Change the placeholder to "Remarks"
                                        />
                                    </InputGroup>
                                </Col>

                                <Col xs={12}>
                                    <button type="submit" className="btn btn-primary w-md">
                                        Submit
                                    </button>
                                </Col>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(SendBillTransaction);
