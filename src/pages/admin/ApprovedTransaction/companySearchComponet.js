import React, { useEffect, useState } from 'react';
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
  const [filters, setFilters] = useState('');
  const [company, setCompany] = useState('');
  const [gstError, setGSTError] = useState('');
  const [panError, setPANError] = useState('');


  useEffect(() => {
    onFilter(filters);
  }, [filters])


  const handleSubmit = (event) => {
    event.preventDefault();
    // onFilter(filters);


  };

  const handleReset = (event) => {
    event.preventDefault();

    const resetAray = {
      company: '',
    }
    onFilter(resetAray)
  }

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setFilters(searchFieldString);
  };

  return (

    <Container fluid={true} className="mt-2">
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
                      value={filters}
                      onChange={onSearchChange}
                    />
                  </InputGroup>
                  {/* {aadharError && <div className="text-danger">{aadharError}</div>} */}
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};


