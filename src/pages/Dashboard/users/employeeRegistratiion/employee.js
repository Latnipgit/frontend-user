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
import { useSelector, useDispatch } from "react-redux";
import { addNewEmployeelist } from "../../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
const Employee = () => {
  // Form validation
  const [alertVisible, setAlertVisible] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [fullAccess, setfulaccess] = useState(false)
  const [ladger, setladger] = useState(false)
  const [companysearch, setcompanysearch] = useState(false)
  const [recordPayment, setrecordPayment] = useState(false)
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
  console.log("FULLACCESSs", fullAccess)
  const dispatch = useDispatch();

const handleSubmit=()=>{
  if(validator.isEmail(email)){
  
  
  if(fullAccess == true ){
    
    setladger(true)
    setcompanysearch(true)
    setrecordPayment(true)
 
  const payload = [{
    "name":name,
    "emailId":email,
    "mobile":'12321231',
    "permissions": [
      { "apiName": "companySearch", "allowed": companysearch == true ?'true ':'false'},
      { "apiName": "invoicingLedger", "allowed": ladger == true ? 'true': ' false'},
      { "apiName": "recordPayment", "allowed": recordPayment == true ? 'true':'false'}
  ]
  
  }]
  if(name != "" ){
    if(email != "" ){
console.log("nmmm", name , email)


  dispatch(addNewEmployeelist(payload));
    }
    else{
      toast.error("Please enter email")

    }
}else{
  toast.error("Please enter name")
}

}
else{
  const payload = [{
    "name":name,
    "emailId":email,
    "mobile":'12321231',
    "permissions": [
      { "apiName": "companySearch", "allowed": companysearch == true ?'true ':'false'},
      { "apiName": "invoicingLedger", "allowed": ladger == true ? 'true': ' false'},
      { "apiName": "recordPayment", "allowed": recordPayment == true ? 'true':'false'}
  ]
  
  }]
  console.log("PAYLOAD", payload)
  if(name != "" ){
    if(email != "" ){
console.log("nmmm", name , email)


  dispatch(addNewEmployeelist(payload));
    }
    else{
      toast.error("Please enter email")

    }
}else{
  toast.error("Please enter name")
}

}
  }else{
    toast.error("Please enter valid email")
  }
}
  // React.useEffect(() => {
  //   setIsFormValid(validation.isValid);
  // }, [validation.isValid]);
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
                    // onSubmit={e => {
                    //   e.preventDefault()
                    //   toggleAlert()
                    //   validation.handleSubmit()
                    //   return false
                    // }}
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
                            onChange={(event)=>setname(event.target.value)}
                            // onBlur={validation.handleBlur}
                            // value={validation.values.name || ""}
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
                            // onChange={validation.handleChange}
                            onChange={(event)=>setemail(event.target.value)}

                            // onBlur={validation.handleBlur}
                            // value={validation.values.email || ""}
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

                    {/* <Row>
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
                    </Row> */}

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
                                  onChange={()=> fullAccess == true ?setfulaccess(false):setfulaccess(true)}
                                  // checked={validation.values.access.fullAccess}
                                  // checked={setfulaccess(true)}   
                                                     />{" "}
                                Full access
                              </Label>
                            </FormGroup>

                            <FormGroup check className="mb-2">
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="access.companySearch"
                                  // onChange={validation.handleChange}
                                  onChange={()=> companysearch == true ?setcompanysearch(false):setcompanysearch(true)}

                                  // checked={
                                  //   validation.values.access.companySearch
                                  // }
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
                                  onChange={()=> ladger == true ?setladger(false):setladger(true)}

                                  // onChange={validation.handleChange}
                                  // checked={
                                  //   validation.values.access.invoicingLedger
                                  // }
                                />{" "}
                                Invoicing + ledger
                              </Label>
                            </FormGroup>
                            <FormGroup check className="mb-2">
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="access.recordPayment"
                                  // onChange={validation.handleChange}
                                  onChange={()=> recordPayment == true ?setrecordPayment(false):setrecordPayment(true)}

                                  // checked={
                                  //   validation.values.access.recordPayment
                                  // }
                                />{" "}
                                Record payment
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>
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
                  <Row>
                      <Col lg={1}>
                        {/* disabled={!isFormValid}  */}
                        <Button
                          className="mr-3"
                          color="primary"
                          type="submit"
                          onClick={()=>handleSubmit()} // Show/hide alert before submission
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col lg={1}>
                        {/* <Button
                          className="ml-3"
                          color="secondary"
                          type="button" // Use type="button" for Cancel button
                          onClick={handleCancel} // Clear form fields
                        >
                          Cancel
                        </Button> */}
                      </Col>
                    </Row>
                </CardBody>
              </Card>
            </Col>    
          </Row>
        </Container>
        <ToastContainer />

      </div>
    </React.Fragment>
  )
}

export default Employee
