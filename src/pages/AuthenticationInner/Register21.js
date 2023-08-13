import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "components/Common/withRouter";
// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "./CarouselPage";


const Register21 = props => {

  //meta title
  document.title="User Register  | Bafana ";
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    mobileNumber: '',
    gstNumber: '',
    panNumber: ''
  });
  const isGSTValid = (gst) => {
    // Implement GST format validation logic here
    // Example: You can use a regular expression to match the expected GST format
    const gstFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstFormat.test(gst);
  };
  const isPanCardValid = (pan) => {
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panFormat.test(pan);
  };
  
  
  
  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    // enableReinitialize: true,

    // initialValues: {
    //   email: '',
    //   username: '',
    //   password: '',
    // },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
       
      dispatch(loginUser(values, props.router.navigate));
    }
  });
  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGSTNumber] = useState('');


  const [gstValidation, setGSTValidation] = useState({
    touched: false,
    error: ''
  });
 
  const [panValidation, setPanValidation] = useState({
    touched: false,
    error: ''
  });

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
    setPanNumber(pan);

    if (panValidation.touched) {
      if (isPanCardValid(pan)) {
        setPanValidation({ touched: true, error: '' });
      } else {
        setPanValidation({ touched: true, error: 'Invalid PAN format' });
      }
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Assuming 'registerUser' is your Redux action
        dispatch(registerUser(formData)); // Dispatch the action with form data
        console.log('Registration successful');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            

            <Col xl={8}>
            
              <div className="auth-full-page-content  p-md-10 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-2 mb-md-5">
                      <Link to="dashboard" className="d-block auth-logo">
                        <h2>Bafana</h2>
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Register account</h5>
                        <p className="text-muted">
                          Get your free Bafana account now.
                        </p>
                      </div>

                      <div className="mt-2">

                        <Form className="form-horizontal"
                          onSubmit={handleSubmit}
                        >
                           {/* Email */}
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
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={validation.touched.email && validation.errors.email ? true : false}
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" // Email validation pattern
                          />
                          {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                          </div>
                          </Col>
                          <Col md={6}>
                          <div className="mb-3">
                          <Label className="form-label">Username</Label>
                          <Input
                          name="username"
                          type="text"
                          className="form-control"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={validation.touched.username && validation.errors.username ? true : false}
                          pattern="^[a-zA-Z0-9_]+$" // Username validation pattern (alphanumeric with underscores)
                          />
                          {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                          ) : null}
                          </div>
                          </Col>
                          </Row>
                          
                         
                          <div className="mb-3">
                          <Label className="form-label">Mobile Number (Indian)</Label>
                          <div className="input-group">
                          <div className="input-group-prepend">
                          <span className="input-group-text">(+91)-</span>
                          </div>
                          <input
                          name="mobileNumber"
                          type="tel"
                          className={`form-control ${
                          validation.touched.mobileNumber && validation.errors.mobileNumber ? "is-invalid" : ""
                          }`}
                          placeholder="Enter 10-digit mobile number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobileNumber || ""}
                          pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                          maxLength="10" // Restrict input to 10 characters
                          />
                          {validation.touched.mobileNumber && validation.errors.mobileNumber ? (
                          <div className="invalid-feedback">{validation.errors.mobileNumber}</div>
                          ) : null}
                          </div>
                          </div>
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
                          onChange={handleGSTChange}
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
                              onChange={handlePanChange}
                              onBlur={handlePanBlur}
                              value={panNumber}
                            />
                            {panValidation.touched && panValidation.error !== '' && (
                              <div className="invalid-feedback">{panValidation.error}</div>
                            )}
                          </div>
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


                        {/* <Form action="dashboard">

                          <div className="mt-1 text-center">
                            <h5 className="font-size-14 mb-3">Sign up using</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary me-1"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info me-1"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form> */}

                        <div className="mt-1 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="pages-login-2"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                            
                          </p>
                          <p className="mb-0">
                        ©{" "}
                        { new Date().getFullYear()}
                        Bafana. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Latnip IT Solution
                      </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Register21);

Register21.propTypes = {
  history: PropTypes.object,
};
