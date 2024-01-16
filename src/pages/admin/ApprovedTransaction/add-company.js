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
  companyName: '',
  gstNumber: '',
  panCardNumber: '',
  email: '',
  mobileNumber: '',
  adharCardNumber: '',
};

const AddCompany = () => {
  const handleSubmit = (values) => {
    // Handle form submission logic here
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col lg={12}>
          <Card className="mt-4">
            <CardBody>
              <CardTitle className="h5 mb-4">Add Company</CardTitle>

              <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit}>

                <Col xs={12} md={6}>
                  <label className="visually-hidden" htmlFor="companyName">
                    Company Name
                  </label>
                  <InputGroup>
                    <div className="input-group-text">
                      <i className="mdi mdi-account-card-details" />
                    </div>
                    <input
                      type="text"
                      className={`form-control`}
                      id="companyName"
                      placeholder="Company Name"
                    // value={companyName}
                    // onChange={handleCompanyNameChange}
                    />
                  </InputGroup>
                </Col>

                <Col xs={12} md={6}>
                  <label className="visually-hidden" htmlFor="gstNumber">
                    GST Number
                  </label>
                  <InputGroup>
                    <div className="input-group-text">
                      <i className="mdi mdi-file-document" />
                    </div>
                    <input
                      type="text"
                      className={`form-control`}
                      id="gstNumber"
                      placeholder="GST Number"
                    // value={gstNumber}
                    // onChange={handleGstNumberChange}
                    />
                  </InputGroup>
                </Col>

                <Col xs={12} md={6}>
                  <label className="visually-hidden" htmlFor="panNumber">
                    PAN Card Number
                  </label>
                  <InputGroup>
                    <div className="input-group-text">
                      <i className="mdi mdi-credit-card" />
                    </div>
                    <input
                      type="text"
                      className={`form-control`}
                      id="panNumber"
                      placeholder="PAN Card Number"
                    // value={panNumber}
                    // onChange={handlePanNumberChange}
                    />
                  </InputGroup>
                </Col>

                {/* ... Similar code for other form fields ... */}

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

export default withRouter(AddCompany);
