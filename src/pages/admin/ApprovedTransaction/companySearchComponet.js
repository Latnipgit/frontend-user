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

export const CompanySerchForm = ({ onFilter, SearchName }) => {
  const [filters, setFilters] = useState('');

  useEffect(() => {
    onFilter(filters);
  }, [filters])

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
              <Form className="row row-cols-lg-auto g-3 align-items-center">
                <Col xs={12} md={12}>
                  <InputGroup>
                    {/* <div className="input-group-text">
                        <i className="mdi mdi-account-card-details" />
                    </div> */}
                    <input
                      type="text"
                      style={{ width: '20rem' }}
                      className={`form-control`}
                      id="nameFilter"
                      placeholder={`${SearchName} Name Search`}
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


