

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { addNewCompany } from "../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';

//redux
import {  useDispatch } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  Form,
  CardBody,
  Card,
  Container,
  Row, Col
} from "reactstrap"

const ReportedDebtorsModel = props => {
  document.title = "Register | Bafana - User & Dashboard";
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [companyName, setcompanyName] = useState('');
  const logindata = (localStorage.getItem("authUser")) != undefined ? JSON.parse(localStorage.getItem("authUser")) : ''
  const [gstValidation, setGSTValidation] = useState({
    touched: false,
    error: ''
  });

  const [panValidation, setPanValidation] = useState({
    touched: false,
    error: ''
  });

 



  const dispatch = useDispatch();
  useEffect(() => {
    setName(logindata.name)

  },[logindata])

  const formSubmit = () => {
    const payload = {
      "companyName": companyName != '' ? companyName : props.getCompanyList[0].companyName,
      "gstin": gstNumber != '' ? gstNumber : props.getCompanyList[0].gstin,
      "companyPan": panNumber != '' ? panNumber : props.getCompanyList[0].companyPan,
}
    dispatch(addNewCompany(payload));
    toast.success("Registration successfully")
     window.location.reload()

  }

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      name: '',
      companyName: '',
      password: '',
      aadharNumber: '',
      mobileNumber: '',
      gstNumber: '',
      panNumber: '',

    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      name: Yup.string().required("Please Enter Your Name"),
      companyName: Yup.string().required("Please Enter Your Company Name"),
      password: Yup.string().required("Please Enter Your Password"),
      aadharNumber: Yup.string().required("Please Enter Your aadhar Number"),
      mobileNumber: Yup.string().required("Please Enter Your Mobile Number"),
      gstNumber: Yup.string().required("Please Enter Your gst Number"),
      panNumber: Yup.string().required("Please Enter Your pan Number"),
    })
  });
  const { isOpen, toggle } = props




  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      // show={show}
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Add a Company</ModalHeader>
        <ModalBody>

          <div className="account-pages">
            <Container>
              <Row className="justify-content-center">
                <Col xl={12}>
                  <Card className="overflow-hidden">

                    <CardBody className="pt-0">
                      <div className="p-2">
                        <Form
                          className="form-horizontal"
                        

                        >

                          {console.log("logindatalogindata", logindata)}
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Name</Label>
                                <Input
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  placeholder={logindata != undefined ? logindata.name : 'Enter Name'}
                                  onChange={formik.handleChange}
                                  value={logindata != undefined ? logindata.name : ''}
                                  disabled
                                />
                               
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Company Name</Label>
                                <Input
                                  name="companyName"
                                  type="text"
                                  className="form-control"
                                  placeholder={props.getCompanyList[0] != undefined ? props.getCompanyList[0].companyName:'Enter Company Name'}
                                  onChange={(event) => setcompanyName(event.target.value)}
                         
                                />
                               
                              </div>
                            </Col>
                          </Row>

                          <Row>
                     
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Mobile Number (Indian)</Label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">(+91)-</span>
                                  </div>
                                  <input
                                    name="mobileNumber"
                                    type="number"
                                  
                                    className="form-control"
                                    placeholder="Enter 10-digit mobile number"
                                    onChange={(e) => setMobile(e.target.value)}
                                 
                                    pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                                    maxLength="10" // Restrict input to 10 characters
                                  />
                                 
                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter email"
                                  type="email"
                                  onChange={formik.handleChange}
                                  value={logindata != undefined ? logindata.emailId : ""}
                                  disabled

                                />
                              
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <div className="mb-3">
                                <Label className="form-label">GST Number</Label>
                                <Input
                                  id="gstNumber"
                                  name="gstNumber"
                                  className="form-control text-uppercase"
                                  placeholder='Enter your GST Number'
                                  type="text"
                                  onChange={(event) => setGSTNumber(event.target.value)}
                             
                                />
                             
                              </div>
                            </Col>
                            <Col>

                              <div className="mb-3">
                                <label className="form-label">PAN Number</label>
                                <input
                                  id="panNumber"
                                  name="panNumber"
                                  className={`form-control text-uppercase ${panValidation.touched && panValidation.error ? 'is-invalid' : ''}`}
                                  placeholder='Enter PAN number'
                                  type="text"
                                  onChange={(event) => setPanNumber(event.target.value)}
                               
                                />
                            
                              </div>
                            </Col>
                          </Row>
                          <Row>
                           

                            <Col md={6}>
                           
                            </Col>
                          </Row>
                          <div>
                            <p className="mb-0">
                              By registering you agree to the Bafana{" "}
                              <a href="#" className="text-primary">
                                Terms of Use
                              </a>
                            </p>
                          </div>

                        </Form>
                        <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary waves-effect waves-light "
                            type="submit"
                            style={{ width: '150px' }}
                            onClick={() => formSubmit()}
                          >
                            Add Company
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                </Col>
              </Row>
              <ToastContainer/>
            </Container>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ReportedDebtorsModel.propTypes = 
{
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDebtorsModel
