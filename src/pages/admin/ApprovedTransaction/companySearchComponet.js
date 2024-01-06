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

export const CompanySerchForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    company: '',
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
    }
    onFilter(resetAray)
  }
  const handleNameChange = (event) => {
    const nameValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      company: nameValue,
    }));
  }


  return (

    <Container fluid={true} className="mt-5">
      <Row>
        <Col lg={12}>
          <Card>
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

                <Col xs={12} className=''>


                  <button type="submit" className="btn btn-primary w-md ml-2" onClick={handleSubmit}>
                    Search
                  </button>
                  &nbsp;
                  &nbsp;
                  <button type="submit" className="btn btn-secondary w-md mr-2" onClick={handleReset}>
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


