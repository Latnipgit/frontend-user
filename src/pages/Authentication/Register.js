import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import Select from "react-select"

// state and city select
import { City, Country, State } from "country-state-city";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "react-js-loader";
// action

import { registerUser_login, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import index from "pages/Dashboard-Blog";
// toast.configure() 
const Register = props => {

  //meta title
  document.title = "Register | Bafana - User & Dashboard";
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  const [timerStart, setTimerStart] = useState(false);


  const [gstValidation, setGSTValidation] = useState("");

  const [panValidation, setPanValidation] = useState("");
  const [mobileValidation, setmobileValidation] = useState("");
  const [emailValidation, setemailValidation] = useState("");


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


  const handleGSTChange = (event) => {
    const gst = event.target.value;
    setGSTNumber(gst);

    if (gstValidation.touched) {
      if (isGSTValid(gst)) {
        setGSTValidation({ touched: true, error: '' });
      } else {
        setGSTValidation({ touched: true, error: 'Invalid GST format' });
      }
    }
  };
  function isPanCardValid(panCardNumber) {
    const panPattern = /^([A-Z]{5}[0-9]{4}[A-Z]{1})$/;
    return panPattern.test(panCardNumber);
  }
  function isGSTValid(gstNumber) {
    const gstPattern = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1})$/;
    return gstPattern.test(gstNumber);
  }

  const handleGSTBlur = () => {
    if (gstNumber === '') {
      setGSTValidation({ touched: true, error: 'GST number is required' });
    } else if (!isGSTValid(gstNumber)) {
      setGSTValidation({ touched: true, error: 'Invalid GST format' });
    } else {
      setGSTValidation({ touched: true, error: '' });
    }
  };
  const handlePanChange = (event) => {
    const pan = event.target.value.toUpperCase();
    const panPattern = /^([A-Z]{5}[0-9]{4}[A-Z]{1})$/;
    if (pan.test(panPattern)) {
      setPanNumber(pan);
    }
    else {
      setPanValidation('Enter valid Pan Number')
    }



  };
  const handlePanBlur = () => {
    if (panNumber === '') {
      setPanValidation({ touched: true, error: 'PAN number is required' });
    } else if (!isPanCardValid(panNumber)) {
      setPanValidation({ touched: true, error: 'Invalid PAN format' });
    } else {
      setPanValidation({ touched: true, error: '' });
    }
  };
  function isAadharNumberValid(aadharNumber) {
    if (!/^\d{12}$/.test(aadharNumber)) {
      return false;
    }

    const aadharArray = aadharNumber.split('').map(Number);
    const checksumDigit = aadharArray[11];

    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += aadharArray[i];
    }

    const calculatedChecksum = (sum % 10 + 1) % 10;

    return checksumDigit === calculatedChecksum;
  }

  const dispatch = useDispatch();


  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
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
      state: '',
      city: '',

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
      state: Yup.string().required("Please Select state"),
      city: Yup.string().required("Please Select city"),
    })
  });



  const apiRespo = useSelector(state => (state.register_login_reducer.apiResponse))

  useEffect(() => {
    // dispatch(apiError(""));
    localStorage.removeItem("tokenemployeeRegister")
    localStorage.removeItem("COMPANY-ID")

    if (timerStart == true) {
      const interval = setInterval(() => {
        setTimerStart(false)
      }, 2000);
      return () => clearInterval(interval);
    }

    if (apiRespo != undefined) {
      if (apiRespo == true) {
        const newPageUrl = '/login'
        toast.success('registration successfully please check your Email ')
        const intervals = setInterval(() => {
          window.location.href = newPageUrl;
        }, 2000);
        return () => clearInterval(intervals);
      }
      else {

        toast.error('user already existes')

      }

    }
  }, [apiRespo, timerStart]);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        {timerStart == false ?
          <Container>
            <Row className="justify-content-center">
              <Col xl={8}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free Bafana account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="p-2">
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
                          const user = {
                            name: formik.values.name,
                            password: formik.values.password,
                            companyName: formik.values.companyName,
                            gstNumber: gstNumber.toUpperCase(),
                            // aadharNumber: formik.values.aadharNumber,
                            panNumber: panNumber.toUpperCase(),
                            email: formik.values.email,
                            state: selectedState.value,
                            city: selectedCity.value,

                          };
                          if (formik.values.name != '' && formik.values.email != '' && gstNumber != '' && panNumber != "" && selectedState != "" && selectedCity != "") {

                            dispatch(registerUser_login(user, props.router.navigate));
                            setTimerStart(true)

                          }
                          return false;
                        }}
                      >


                        <Row>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name || ""}
                                invalid={formik.touched.name && formik.errors.name ? true : false}
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Company Name</Label>
                              <Input
                                name="companyName"
                                type="text"
                                className="form-control"
                                placeholder="Enter company name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.companyName || ""}
                              // invalid={formik.touched.companyName && formik.errors.companyName ? true : false}
                              // Add your company name validation logic here
                              />
                              {formik.touched.companyName && formik.errors.companyName ? (
                                <FormFeedback type="invalid">

                                  {formik.errors.companyName}

                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
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
                                onBlur={formik.handleBlur}
                                // value={formik.values.email || ""}
                                invalid={formik.touched.email && formik.errors.email ? true : false}

                              />
                              {formik.touched.email && formik.errors.email ? (
                                <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Mobile Number (Indian)</Label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">(+91)-</span>
                                </div>
                                <input
                                  name="mobileNumber"
                                  type="tel"
                                  className={`form-control ${formik.touched.mobileNumber && formik.errors.mobileNumber ? "is-invalid" : ""
                                    }`}
                                  placeholder="Enter 10-digit mobile number"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.mobileNumber || ""}
                                  pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                                  maxLength="10" // Restrict input to 10 characters
                                />
                                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                  <div className="invalid-feedback">{formik.errors.mobileNumber}</div>
                                ) : null}
                              </div>
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
                                className="form-control"
                                placeholder="Enter GST Number"
                                type="text"
                                onChange={(e) => setGSTNumber(e.target.value)}
                                onBlur={handleGSTBlur}
                                value={gstNumber}
                                invalid={gstValidation.touched && gstValidation.error !== ''}
                              />
                              {gstValidation.touched && gstValidation.error !== '' && (
                                <FormFeedback type="invalid">{gstValidation.error}</FormFeedback>
                              )}
                            </div>
                          </Col>
                          <Col>

                            <div className="mb-3">
                              <label className="form-label">PAN Number</label>
                              <input
                                id="panNumber"
                                name="panNumber"
                                className={`form-control ${panValidation.touched && panValidation.error ? 'is-invalid' : ''}`}
                                placeholder="Enter PAN Number"
                                type="text"
                                // onChange={handlePanChange}
                                onChange={(e) => setPanNumber(e.target.value)}

                                onBlur={handlePanBlur}
                              // value={panNumber}
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
                              <label className="form-label">State*</label>
                              <Select
                                id="primaryContact"
                                className="custom-content"
                                options={salutationState}
                                styles={colourStyles}
                                value={selectedState}
                                onChange={selected => setSelectedState(selected)}
                                placeholder="Select State"
                              />
                              {formik.touched.state && formik.errors.state ? (
                                <FormFeedback type="invalid">{formik.errors.state}</FormFeedback>
                              ) : null}
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
                                placeholder="Select City"
                              />
                              {formik.touched.city && formik.errors.city ? (
                                <FormFeedback type="invalid">{formik.errors.city}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>


                          <Col md={6}>

                          </Col>
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
                        <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary waves-effect waves-light "
                            type="submit"

                          >
                            Register Now
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link to="/login" className="font-weight-medium text-primary">
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Bafana. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by Latnip IT Solution
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
          :
          <div className="" style={{ paddingTop: '150px' }}>

            <Loader type="hourglass" bgColor={"gray"} color={"gray"} title=" Please wait..." size={150} />

          </div>
        }
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(Register);
Register.propTypes = {
  history: PropTypes.object,
};