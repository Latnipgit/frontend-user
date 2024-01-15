import React, { useState } from 'react';
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

const InlineFilterForm = ({ onFilter, handleFilter }) => {
  const [filters, setFilters] = useState({
    company: '',
    pan: '',
    gst: '',
  });
  const [company, setCompany] = useState('');
  const [gstError, setGSTError] = useState('');
  const [panError, setPANError] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(filters);
  };

  const handleReset = (event) => {
  
    event.preventDefault();

    const resetAray = {
      company: '',
      pan: '',
      gst: '',
    }
    setFilters({
      company: '',
      pan: '',
      gst: '',
    })
    handleFilter(filters)
  }
  const validateAadhar = () => {
    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(filters.aadhar)) {
      setAadharError('Invalid Aadhar number');
    } else {
      setAadharError('');
    }
  };
  const validateGST = () => {
    const gstPattern = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1})$/;
    if (!gstPattern.test(filters.gst)) {
      setGSTError('Invalid GST number');
    } else {
      setGSTError('');
    }
  };


  const validatePAN = () => {
    const panPattern = /^([A-Z]{5}[0-9]{4}[A-Z]{1})$/;
    if (!panPattern.test(filters.pan)) {
      setPANError('Invalid PAN number');
    } else {
      setPANError('');
    }
  };

  const handleGSTChange = (event) => {
    const gstValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      gst: gstValue,
    }));
  };
  const handleNameChange = (event) => {
    const nameValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      company: nameValue,
    }));
  }
  const handlePanChange = (event) => {
    const panValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      pan: panValue,
    }));
  };
  const handleAadharChange = (event) => {
    const numericValue = event.target.value;
    //.replace(/\D/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 12); // Limit to maximum 12 characters
    setFilters((prevFilters) => ({
      ...prevFilters,
      company: numericValue,
    }));
  };

  return (

    <Container fluid={true} className="mt-5">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h5 mb-4">Company Search

              </CardTitle>
              <Row>
                <p style={{ fontWeight: '500', fontSize: '12px' }}>
                  Search using any one below details
                </p>
              </Row>
              <Form className="row row-cols-lg-auto g-3 align-items-center">

                <Col xs={12} md={12}>

                  <label className="visually-hidden" htmlFor="nameFilter">Company Name</label>
                  <InputGroup>
                    {/* <div className="input-group-text">
                        <i className="mdi mdi-account-card-details" />
                    </div> */}
                    <input
                      type="text"
                      style={{ width: '15rem' }}
                      className={`form-control`}
                      id="nameFilter"
                      placeholder="Company Name"
                      value={filters.company}
                      onChange={handleNameChange}
                    />
                  </InputGroup>
                  {/* {aadharError && <div className="text-danger">{aadharError}</div>} */}
                </Col>

                <Col xs={12} md={6}>
                  <label className="visually-hidden" htmlFor="gstFilter">
                    GST Number
                  </label>
                  <InputGroup>

                    <input
                      style={{ width: '15rem' }}

                      type="text"
                      className={`form-control ${gstError ? 'is-invalid' : ''}`}
                      id="gstFilter"
                      placeholder="GST Number"
                      value={filters.gst}
                      onChange={handleGSTChange}
                    // onBlur={validateGST}
                    />
                  </InputGroup>
                  {/* {gstError && <div className="invalid-feedback">{gstError}</div>} */}
                </Col>

                <Col xs={12} md={6}>
                  <label className="visually-hidden" htmlFor="panFilter">
                    PAN Card Number
                  </label>
                  <InputGroup>

                    <input
                      style={{ width: '15rem' }}

                      type="text"
                      className={`form-control ${panError ? 'is-invalid' : ''}`}
                      id="panFilter"
                      placeholder="PAN Card Number"
                      value={filters.pan}
                      onChange={handlePanChange}
                    // onBlur={validatePAN}
                    />
                  </InputGroup>
                  {/* {panError && <div className="invalid-feedback">{panError}</div>} */}
                </Col>


                <Col xs={12} className=''>


                  <button type="submit" className="btn btn-primary w-md ml-2" onClick={(e) => handleSubmit(e)}>
                    Search
                  </button>
                  &nbsp;
                  &nbsp;
                  <button type="submit" className="btn btn-secondary w-md mr-2" onClick={(e) => handleReset(e)}>
                    Reset
                  </button>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default InlineFilterForm;
