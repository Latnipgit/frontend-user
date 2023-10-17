import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

const Employee = () => {
  // Form validation
  const [alertVisible, setAlertVisible] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const validation = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      access: {
        fullAccess: false,
        companySearch: false,
        invoicingLedger: false,
        recordPayment: false,
      },
      requiredCheckbox: false, // New required checkbox
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string()
        .email("Must be a valid Email")
        .required("Email is required"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
      requiredCheckbox: Yup.boolean()
        .oneOf([true], "This checkbox is required") // Checkbox validation
        .required("This checkbox is required"),
    }),
    onSubmit: values => {
      if (validation.isValid && isAtLeastOneCheckboxSelected(values.access)) {
        console.log("values", values);
        validation.resetForm();
        
      } else {
        // If form is invalid or no checkbox is selected
        toggleAlert();
      }
     
    },
    
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    validateOnMount: true,
  })
  const isAtLeastOneCheckboxSelected = (access) => {
    // Check if at least one checkbox in the 'access' object is selected
    return Object.values(access).some((value) => value);
  };
  const handleCancel = () => {
    validation.resetForm()
  }
  const toggleAlert = () => {
    if (!validation.isValid) {
      setAlertVisible(true)
      setTimeout(() => {
        setAlertVisible(false)
      }, 3000) // Hide the alert after 3 seconds
    }
  }
  React.useEffect(() => {
    setIsFormValid(validation.isValid);
  }, [validation.isValid]);
  console.log("Form data", validation)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Employee Registration</h4>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      toggleAlert()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row>
                      <Col lg={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            name="name"
                            placeholder="Name"
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ""}
                            invalid={
                              validation.touched.name && validation.errors.name
                                ? true
                                : false
                            }
                          />
                          {validation.touched.name && validation.errors.name ? (
                            <div className="text-danger">
                              {validation.errors.name}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col lg={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <div className="text-danger">
                              {validation.errors.email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            name="username"
                            placeholder="Username"
                            type="text"
                            className="form-control"
                            id="username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <div className="text-danger">
                              {validation.errors.username}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col lg={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <div className="text-danger">
                              {validation.errors.password}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <FormGroup className="mb-3">
                          <Label>Access to</Label>
                          <div>
                            <FormGroup check className="mb-2">
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="access.fullAccess"
                                  onChange={validation.handleChange}
                                  checked={validation.values.access.fullAccess}
                                />{" "}
                                Full access
                              </Label>
                            </FormGroup>
                            <FormGroup check className="mb-2">
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="access.companySearch"
                                  onChange={validation.handleChange}
                                  checked={
                                    validation.values.access.companySearch
                                  }
                                />{" "}
                                Company search
                              </Label>
                            </FormGroup>
                         
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                        <FormGroup className="mb-3">
                          <Label></Label>
                          <div>
                        
                            <FormGroup check className="mb-2">
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="access.invoicingLedger"
                                  onChange={validation.handleChange}
                                  checked={
                                    validation.values.access.invoicingLedger
                                  }
                                />{" "}
                                Invoicing + ledger
                              </Label>
                            </FormGroup>
                            <FormGroup check className="mb-2">
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="access.recordPayment"
                                  onChange={validation.handleChange}
                                  checked={
                                    validation.values.access.recordPayment
                                  }
                                />{" "}
                                Record payment
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={1}>
                        {/* disabled={!isFormValid}  */}
                        <Button
                          className="mr-3"
                          color="primary"
                          type="submit"
                          onClick={toggleAlert} // Show/hide alert before submission
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col lg={1}>
                        <Button
                          className="ml-3"
                          color="secondary"
                          type="button" // Use type="button" for Cancel button
                          onClick={handleCancel} // Clear form fields
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>

                     {alertVisible && (
                      <div className="alert alert-danger mt-3">
                        {validation.isValid
                          ? "Please select at least one checkbox."
                          : "Please fix the errors in the form before submitting."}
                      </div>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>    
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Employee
