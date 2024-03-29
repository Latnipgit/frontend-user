import React, { useState, useEffect } from "react"
import Select from "react-select"
import { useFormik } from "formik"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,
  FormGroup,
  Table,
  Row, Col
} from "reactstrap"
import { useDispatch, useSelector } from 'react-redux'
import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter"
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { addNewCustomerlist } from "store/sendbilltransacttion/actions"

// state and city select
import { City, Country, State } from "country-state-city";

export const AddcustomerFomr = () => {
  const [selectedOption, setSelectedOption] = useState("")
  const [salutations, setsalutations] = useState([
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss", value: "Miss" },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
  ])
  const dispatch = useDispatch();
  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));

  const handleInputChange = inputValue => {
    // Handle input change here
  }

  const [gstNumberValid, setGstNumberValid] = useState(true)
  const [panNumberValid, setPanNumberValid] = useState(true)
  const [zipcodeValid, setZipcodeValid] = useState(true)
  const [mobileNumberValid, setMobileNumberValid] = useState(true)
  const [emailidValid, setemailidValid] = useState(true)

  const formikModal = useFormik({
    initialValues: {
      customerTypeIndividual: "",
      customerTypeBusiness: "",
      customerType: "Business",
      primaryContact: "",
      firstname: "",
      lastname: "",
      salutation: "",
      companyName: "",
      customerEmail: "",
      customerPhone: "",
      gstNumber: "",
      panCard: "",
      address1: "",
      address2: undefined,
      city: "",
      state: "",
      zipcode: "",
    },


    validate: values => {
      const errors = {}

      if (!values.customerType) {
        errors.customerType = "Customer Type is required"
      }
      if (!values.primaryContact) {
        errors.primaryContact = "Primary Contact is required"
      }
      if (!values.companyName) {
        errors.companyName = "Company Name is required"
      }
      if (!values.customerEmail) {
        errors.customerEmail = "Customer Email is required"
        setemailidValid(false)
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.customerEmail)) {
        errors.customerEmail = "Invalid email address"
        setemailidValid(false)
      } else {
        setemailidValid(true)
      }
      if (!values.customerPhone) {
        errors.customerPhone = "Phone Number is required"
        setMobileNumberValid(false)
      } else if (!/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(values.customerPhone)) {
        errors.customerPhone = "Invalid Phone Number"
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
      //else if (
      //   !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\w{1}\d{1}$/.test(values.gstNumber)
      // ) {
      //   errors.gstNumber = "Invalid GST Number"
      // }
      if (!values.panCard) {
        errors.panCard = "PANCARD is required"
        setPanNumberValid(false)
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.panCard)) {
        errors.panCard = "Invalid PANCARD"
        setPanNumberValid(false)
      } else {
        setPanNumberValid(true)
      }
      if (!values.address1) {
        errors.address1 = "Address 1 is required"
      }
      if (!values.cityState) {
        errors.cityState = "City/State is required"
      }
      if (!values.zipcode) {
        errors.zipcode = "Zipcode is required"
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
  })


  //city and State

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);

  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [salutationState, setsalutationState] = useState([])
  const [salutationCity, setSalutationCity] = useState([])

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

  const handleFormSubmit = (item, e) => {
    
    const dummy = [
      {
        "debtorType": item.customerType,
        "salutation": selectedOption.value,
        "firstname": item.firstname,
        "lastname": item.lastname,
        "customerEmail": item.customerEmail,
        "customerMobile": item.customerPhone,
        "address1": item.address1,
        "address2": item.address2 == "" ? undefined :item.address2,
        "city": selectedCity.value != undefined ? selectedCity.value : '',
        "state": selectedState.value != undefined ? selectedState.value : '',
        "zipcode": item.zipcode,
        "gstin": item.gstNumber,
        "companyPan": item.panCard,
        "companyName": item.companyName
      }
    ]
    if (gstNumberValid && panNumberValid && zipcodeValid && mobileNumberValid && emailidValid  ) {
      let dummyData = dummy[0]
      
      let checkvalue = Object.values(dummyData).includes('')
      if (checkvalue) return
      dispatch(addNewCustomerlist(dummy))
      toggleAddCustomer()
      e.preventDefault();
    }
  }

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }



  return (
    <Modal isOpen={isAddCustomerOpen}>
      <ModalHeader toggle={() => toggleAddCustomer()}>
        Add New Customer{" "}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formikModal.handleSubmit}>
          <Row className="mt-2">
            <Col xs={12} md={4}>
              <Label for="customerType">Customer Type*</Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
                <div className="form-check form-check-inline">
                  <Label
                    check
                    // inline
                    className={
                      formikModal.values.customerType === "Business"
                        ? "selected"
                        : ""
                    }
                  >
                    <Input
                      className="ember-view form-check-input"
                      type="radio"
                      id="customerTypeBusiness"
                      name="customerType"
                      value="Business"
                      onChange={() => [
                        formikModal.values.customerType === "Business"
                          ? "selected"
                          : ""
                      ]}
                    />{" "}
                    Business
                  </Label>
                </div>
                <div>
                  <Label
                    // check
                    inline
                    className={
                      formikModal.values.customerType === "Individual"
                        ? "selected"
                        : ""
                    }

                  >
                    <Input
                      type="radio"
                      id="customerTypeIndividual"
                      name="customerType"
                      value="Individual"
                      onChange={() => [
                        formikModal.values.customerType === "Individual"
                          ? "selected"
                          : ""
                      ]}
                    />{" "}
                    Individual
                  </Label>
                </div>
                {formikModal.touched.customerType &&
                  formikModal.errors.customerType && (
                    <div className="text-danger">
                      {formikModal.errors.customerType}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4} className="mt-2">
              <Label for="customerType">Primary Contact*</Label>
            </Col>
            <Col xs={12} md={3}>
              <div className="d-inline">
                <label
                  className="visually-hidden custom-content"
                  htmlFor="primaryContact"
                >
                  Select Customer
                </label>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={salutations}
                  styles={colourStyles}
                  value={selectedOption}
                  onChange={selected => setSelectedOption(selected)}
                  onInputChange={handleInputChange}
                  placeholder="Salutation"
                />
              </div>
            </Col>
            <Col xs={12} md={3}>
              <FormGroup>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="text-capitalize"
                  value={formikModal.values.firstname}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="First Name"
                />
                {formikModal.touched.firstname &&
                  formikModal.errors.firstname && (
                    <div className="text-danger">
                      {formikModal.errors.firstname}
                    </div>
                  )}
              </FormGroup>
            </Col>
            <Col xs={12} md={3}>
              <FormGroup>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formikModal.values.lastname}
                  onChange={formikModal.handleChange}
                  className="text-capitalize"

                  onBlur={formikModal.handleBlur}
                  placeholder="Last Name"
                />
                {formikModal.touched.lastname &&
                  formikModal.errors.lastname && (
                    <div className="text-danger">
                      {formikModal.errors.lastname}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          {/* <Row>
          <Col xs="12">
            <hr className="bdr-light xlg"></hr>
          </Col>
        </Row> */}
          <Row>
            <Col xs={12} md={4} className="mt-2">
              <Label for="companyName">Company Name*</Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
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
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="customerEmail">Customer Email*</Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
                <Input
                  type="text"
                  id="customerEmail"
                  name="customerEmail"
                  value={formikModal.values.customerEmail}

                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Customer Email"
                />
                {formikModal.touched.customerEmail &&
                  formikModal.errors.customerEmail && (
                    <div className="text-danger">
                      {formikModal.errors.customerEmail}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="customerPhone">Customer Phone</Label>
            </Col>
            <Col xs={12} md={3}>
              <FormGroup>
                <Input
                  type="number"
                  id="customerPhone"
                  name="customerPhone"
                  value={formikModal.values.customerPhone}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Mobile Number"
                  pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                  maxLength="10"
                />
                {formikModal.touched.customerPhone &&
                  formikModal.errors.customerPhone && (
                    <div className="text-danger">
                      {formikModal.errors.customerPhone}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="panCard">PAN*</Label>
            </Col>
            <Col xs={12} md={5}>
              <FormGroup>
                <Input
                  type="text"
                  id="panCard"
                  name="panCard"
                  className="text-uppercase"

                  value={formikModal.values.panCard}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter Pan Number"
                />
                {formikModal.touched.panCard &&
                  formikModal.errors.panCard && (
                    <div className="text-danger">
                      {formikModal.errors.panCard}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-1">
              <Label for="gstNumber">GST Number</Label>
            </Col>
            <Col xs={12} md={5}>
              <FormGroup>
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
              </FormGroup>
            </Col>
          </Row>
          {/* Add similar code for the rest of the fields */}
          <Row>
            <Col xs="12">
              <hr className="bdr-light xlg"></hr>
            </Col>
          </Row>
          <Label for="address1">Address Details</Label>
          <Row>
            <Col xs={12} md={2} className="mt-4">
              <Label for="address1">Address 1*</Label>
            </Col>
            <Col xs={12} md={6} className="mt-2">
              <FormGroup>
                <Input
                  type="textarea"
                  id="address1"
                  name="address1"
                  className="text-capitalize"

                  value={formikModal.values.address1}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Type Address here....."
                />
                {formikModal.touched.address1 &&
                  formikModal.errors.address1 && (
                    <div className="text-danger">
                      {formikModal.errors.address1}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-3">
              <Label for="address2">Address 2</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Input
                  type="textarea"
                  id="address2"
                  name="address2"
                  className="text-capitalize"

                  value={formikModal.values.address2}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Type Address here....."
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="cityState">State*</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={salutationState}
                  styles={colourStyles}
                  value={selectedState}
                  onChange={selected => setSelectedState(selected)}
                  onBlur={formikModal.handleBlur}
                  placeholder="Select State"
                />
                {formikModal.touched.city &&
                  formikModal.errors.city && (
                    <div className="text-danger">
                      {formikModal.errors.city}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="cityState">City*</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={salutationCity}
                  styles={colourStyles}
                  value={selectedCity}
                  onChange={selected => setSelectedCity(selected)}
                  onBlur={formikModal.handleBlur}
                  placeholder="Select City"
                />
                {formikModal.touched.state &&
                  formikModal.errors.state && (
                    <div className="text-danger">
                      {formikModal.errors.state}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="zipcode">Zipcode*</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
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
              </FormGroup>
            </Col>
          </Row>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggleAddCustomer()}>
          Cancel
        </Button>
        <Button
          color="success"
          onClick={(e) => handleFormSubmit(formikModal.values, e)}
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )

}