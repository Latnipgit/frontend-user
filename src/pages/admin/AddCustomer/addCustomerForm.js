import React,{useState} from "react"
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
export const AddcustomerFomr = () =>{
    const [selectedOption, setSelectedOption] = useState("")
    const [salutations, setsalutations] = useState([
        { label: "Mr.", value: "Mr." },
        { label: "Mrs.", value: "Mrs." },
        { label: "Miss", value: "Miss" },
        { label: "Dr.", value: "Dr." },
        { label: "Prof.", value: "Prof." },
      ])

      const handleInputChange = inputValue => {
        // Handle input change here
      }
      
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
          address2: "",
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
          } else if (!/^\S+@\S+\.\S+$/.test(values.customerEmail)) {
            errors.customerEmail = "Invalid email address"
          }
          if (!values.customerPhone) {
            errors.customerPhone = "Customer Phone is required"
          }
          if (!values.gstNumber) {
            errors.gstNumber = "GST Number is required"
          }
          //else if (
          //   !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\w{1}\d{1}$/.test(values.gstNumber)
          // ) {
          //   errors.gstNumber = "Invalid GST Number"
          // }
          if (!values.panCard) {
            errors.panCard = "PANCARD is required"
          } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.panCard)) {
            errors.panCard = "Invalid PANCARD"
          }
          if (!values.address1) {
            errors.address1 = "Address 1 is required"
          }
          if (!values.cityState) {
            errors.cityState = "City/State is required"
          }
          if (!values.zipcode) {
            errors.zipcode = "Zipcode is required"
          } else if (!/^\d{6}$/.test(values.zipcode)) {
            errors.zipcode = "Invalid Zipcode"
          }
    
          return errors
        },
        onSubmit: values => {
        },
      })

    const handleFormSubmit = item => {


    const dummy = [
        {
        "debtorType": item.customerType,
        "salutation": selectedOption.value,
        "firstname": item.firstname,
        "lastname": item.lastname,
        "customerEmail": item.customerEmail,
        "customerMobile": item.customerPhone,
        "address1": item.address1,
        "address2": item.address2,
        "city": item.city,
        "state": item.state,
        "zipcode": item.zipcode,
        "gstin": item.gstNumber,
        "companyPan": item.panCard,
        "companyName": item.companyName
        }
    ]
    dispatch(addCustomerlist(dummy))
    }

    const colourStyles = {
    menuList: styles => ({
        ...styles,
        background: '#FFFFFF'
    })

    }
    const customStyles = {

    control: (provided, state) => ({
        ...provided,
        background: "#FAFAFA",
        width: "300px",
        // match with the menu
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // Overwrittes the different states of border
        borderColor: state.isFocused ? " #4da6ff" : " #80d4ff",
        // Removes weird border around container  
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? " #4da6ff" : " #80d4ff"
        }
    }),
    option: (provided, state) => ({

        // Your custom option styles here
        backgroundColor: state.isFocused ? '#80bfff' : '#FAFAFA',
        ':hover': {
        backgroundColor: '#80bfff', // Change background color on hover
        },


        menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 2
        }),
        menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 2,
        margin: 2
        })
    }),
    // Add more styles as needed for other parts of the Select component
    };

    return(
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
                  placeholder="Work Phone"
                />
                {formikModal.touched.customerPhone &&
                  formikModal.errors.customerPhone && (
                    <div className="text-danger">
                      {formikModal.errors.customerPhone}
                    </div>
                  )}
              </FormGroup>
            </Col>
            <Col xs={12} md={3}>
              <FormGroup>
                <Input
                  type="text"
                  id="customerPhone"
                  name="customerPhone"
                  value={formikModal.values.customerPhone}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Mobile"
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
                  // onBlur={formikModal.handleBlur}
                  placeholder="Enter Pan Number"
                />
                {/* {formikModal.touched.panCard &&
              formikModal.errors.panCard && (
                <div className="text-danger">
                  {formikModal.errors.panCard}
                </div>
              )} */}
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
              <Label for="cityState">City*</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  className="text-capitalize"
                  value={formikModal.values.city}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter City Name"
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
              <Label for="cityState">State</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  className="text-capitalize"

                  value={formikModal.values.state}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter State Name"
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
    )

    }