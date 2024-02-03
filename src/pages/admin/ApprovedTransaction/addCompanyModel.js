

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { addNewCompany } from "../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';

//redux
import { useDispatch } from "react-redux";
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
  Row, Col,
  FormGroup,
} from "reactstrap"
import Select from "react-select"

// state and city select
import { City, Country, State } from "country-state-city";

const ReportedDebtorsModel = props => {
  document.title = "Register | Bafana - User & Dashboard";
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  const [zipcode, setZipcode] = useState('');
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

  }, [logindata])


  //city and State

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);

  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")


  const [salutationState, setsalutationState] = useState([])
  const [salutationCity, setSalutationCity] = useState([])

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })
  }

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);



  useEffect(() => {
    if (stateData) {
      const selectState = stateData.filter((state) => state.name == selectedState.value)
      setCityData(City.getCitiesOfState(country?.isoCode, selectState[0]?.isoCode));
    }

  }, [selectedState]);

  useEffect(() => {
    if (stateData) {
      const stateDatalist = stateData.map((value, index) => {
        return { label: value.name, value: value.name }
      })
      setsalutationState(stateDatalist)
    }
  }, [stateData]);

  useEffect(() => {
    if (cityData) {
      const stateDatalist = cityData.map((value, index) => {
        return { label: value.name, value: value.name }
      })
      setSalutationCity(stateDatalist)
    }
  }, [cityData]);

  //

  const [gstNumberValid, setGstNumberValid] = useState(true)
  const [panNumberValid, setPanNumberValid] = useState(true)
  const [zipcodeValid, setZipcodeValid] = useState(true)
  const [mobileNumberValid, setMobileNumberValid] = useState(true)

  const formikModal = useFormik({
    enableReinitialize: true,

    initialValues: {
      companyName: '',
      mobileNumber: '',
      gstNumber: '',
      panNumber: '',
      state: '',
      city: '',
      zipcode: '',
    },

    validate: values => {
      const errors = {}
      if (!values.companyName) {
        errors.companyName = "Company Name is required"
      }
      if (!values.mobileNumber) {
        errors.mobileNumber = "Phone Number is required"
        setMobileNumberValid(false)
      } else if (!/^([0|+[9,1]{1,2})?([6-9][0-9]{9})$/.test(values.mobileNumber)) {
        errors.mobileNumber = "Invalid Phone Number"
        setMobileNumberValid(false)
      } else {
        setMobileNumberValid(true)
      }
      if (!values.gstNumber) {
        errors.gstNumber = "GST Number is required"
        setGstNumberValid(false)
      } else if (!/^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(values.gstNumber)) {
        errors.gstNumber = "Invalid GST Number"
        setGstNumberValid(false)
      } else {
        setGstNumberValid(true)
      }
      if (!values.panNumber) {
        errors.panNumber = "PANCARD is required"
        setPanNumberValid(false)
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.panNumber)) {
        errors.panNumber = "Invalid PANCARD"
        setPanNumberValid(false)
      } else {
        setPanNumberValid(true)
      }
      if (!values.zipcode) {
        errors.zipcode = "zipcode is required"
        setZipcodeValid(false)
      } else if (!/^\d{6}$/.test(values.zipcode)) {
        errors.zipcode = "Invalid Zipcode"
        setZipcodeValid(false)
      } else {
        setZipcodeValid(true)
      }
      return errors
    },
    onSubmit: values => {
    },
  });

  const formSubmit = (item, e) => {
    if (gstNumberValid && panNumberValid && zipcodeValid && mobileNumberValid) {
      const payload = {
        "companyName": item.companyName,
        "gstin": item.gstNumber,
        "companyPan": item.panNumber,
        "state": selectedState.value != undefined ? selectedState.value : '',
        "city": selectedCity.value != undefined ? selectedCity.value : '',
        "zipcode": item.zipcode,
      }
      let checkvalue = Object.values(payload).includes('')
      if (checkvalue) return
      dispatch(addNewCompany(payload));
      toast.success("Registration successfully")
      window.location.reload()
    }
    return
  }
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
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Personal Name</Label>
                                <Input
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  placeholder={logindata != undefined ? logindata.name : 'Enter Name'}
                                  onChange={formikModal.handleChange}
                                  value={logindata != undefined ? logindata.name : ''}
                                  disabled
                                />

                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Company Name</Label>
                                <Input
                                  type="text"
                                  id="companyName"
                                  name="companyName"
                                  value={formikModal.values.companyName}
                                  className="text-capitalize"

                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter Company Name"
                                />
                                {formikModal.touched.companyName &&
                                  formikModal.errors.companyName && (
                                    <div className="text-danger">
                                      {formikModal.errors.companyName}
                                    </div>
                                  )}

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
                                  <FormGroup>
                                    <Input
                                      type="number"
                                      id="mobileNumber"
                                      name="mobileNumber"
                                      value={formikModal.values.mobileNumber}
                                      onChange={formikModal.handleChange}
                                      onBlur={formikModal.handleBlur}
                                      placeholder="Mobile Number"
                                    />
                                    {formikModal.touched.mobileNumber &&
                                      formikModal.errors.mobileNumber && (
                                        <div className="text-danger">
                                          {formikModal.errors.mobileNumber}
                                        </div>
                                      )}
                                  </FormGroup>
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
                                  onChange={formikModal.handleChange}
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
                                  type="text"
                                  id="gstNumber"
                                  name="gstNumber"
                                  className="text-uppercase"

                                  value={formikModal.values.gstNumber}
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter GST Number"
                                />
                                {formikModal.touched.gstNumber &&
                                  formikModal.errors.gstNumber && (
                                    <div className="text-danger">
                                      {formikModal.errors.gstNumber}
                                    </div>
                                  )}

                              </div>
                            </Col>
                            <Col>

                              <div className="mb-3">
                                <label className="form-label">PAN Number</label>
                                <Input
                                  type="text"
                                  id="panNumber"
                                  name="panNumber"
                                  className="text-uppercase"

                                  value={formikModal.values.panNumber}
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter Pan Number"
                                />
                                {formikModal.touched.panNumber &&
                                  formikModal.errors.panNumber && (
                                    <div className="text-danger">
                                      {formikModal.errors.panNumber}
                                    </div>
                                  )}

                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="mb-3">
                                <label className="form-label">State*</label>
                                <Select
                                  id="primaryContact"
                                  className="custom-content"
                                  options={salutationState}
                                  styles={colourStyles}
                                  value={selectedState}
                                  onChange={selected => setSelectedState(selected)}
                                  placeholder="SELECT STATE"
                                />
                                {panValidation.error && panValidation.error != '' && (
                                  <div className="invalid-feedback">{panValidation.error}</div>
                                )}
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-3">
                                <label className="form-label">City*</label>
                                <Select
                                  id="primaryContact"
                                  className="custom-content"
                                  options={salutationCity}
                                  styles={colourStyles}
                                  value={selectedCity}
                                  onChange={selected => setSelectedCity(selected)}
                                  placeholder="SELECT CITY"
                                />
                                {panValidation.error && panValidation.error != '' && (
                                  <div className="invalid-feedback">{panValidation.error}</div>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="mb-3">
                                <Label className="form-label">Zip Number</Label>
                                <Input
                                  type="number"
                                  id="zipcode"
                                  name="zipcode"
                                  value={formikModal.values.zipcode}
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter 6 digit zipcode"
                                />
                                {formikModal.touched.zipcode &&
                                  formikModal.errors.zipcode && (
                                    <div className="text-danger">
                                      {formikModal.errors.zipcode}
                                    </div>
                                  )}

                              </div>
                            </Col>
                            <Col>
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
                            onClick={(e) => formSubmit(formikModal.values, e)}
                          >
                            Add Company
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                </Col>
              </Row>
              <ToastContainer />
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
