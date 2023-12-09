import React, { useState, useEffect } from "react"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import { useFormik } from "formik"
// import "../send-bill-transaction/sendbilltransaction.scss"
import { addCustomerlist } from "../../../store/actions"
import { useSelector, useDispatch } from "react-redux"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Table,
  InputGroup,
  Form,
  CardTitle,
  FormGroup,
  Label,
  InputGroupAddon,
} from "reactstrap"
import { getAllDebtors as ongetAllDebtors}  from '../../../store/actions'
import { addInvoiceBill}  from '../../../store/actions'
// import { addFiles}  from '../../../store/actions'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


import * as moment from "moment";
import { mdiClipboardSearchOutline } from "@mdi/js"

const SendBillTransaction = (props) => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedCompany, setselectedCompany] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [customerType, setCustomerType] = useState("Business")
  const [DebtorsList, setDebtorsList] = useState([])
  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)


  const colourStyles = {
    menuList: styles => ({
        ...styles,
        background: '#FFFFFF'
    })
 
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
    },}
  )

  const { getAllDebtorsList } = useSelector(state => ({
    getAllDebtorsList: state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response:[],
   }));

 

  const [salutations, setsalutations] = useState([
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss", value: "Miss" },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
  ])




useEffect(()=>{
  dispatch(ongetAllDebtors());
setDebtorsList( getAllDebtorsList != undefined ? getAllDebtorsList.map((item)=>{
    return {
      "value": item.id , "label":  item.firstname+" "+item.lastname
    }
  }):[])
},[])
const handleFilterForInvoice = (value)=>{
  setSelectedOption(value)
  let resArr = []
  const newColors = getAllDebtorsList.filter(color => color.id == value.value);
  setselectedCompany(newColors[0])
  // {getAllDebtorsList.filter=(person)=>{
  //   let i = person.id ==  value.value

  //   return resArr.push(newColors)
  // }
  
  // getAllDebtorsList.filter=(item)=>{
  //   var i = resArr.findIndex(x => value.value == item.id);
  //   if(i <= -1){
  //     resArr.push({i});
  //   }
    
  //   return null;

}

console.log("getAllDebtorsList 99",selectedCompany )


console.log("DEBTOR LIST", getAllDebtorsList, DebtorsList)
 return (
    <Container fluid className="mt-5 mb-5 text-capitalize">
      <Row>
        <Col lg={12}>
          <Card className="mt-5">
            <CardBody>
              <CardTitle className="h2 mb-4">
                 <Row>
                   <Col md={10}>
                     <h5>Report Defaulter</h5>
                   </Col>
                   {/* <Col md={2} className="text-end"> */}
                   {/* <Button className="btn btn-sm btn-info" onClick={()=>window.location.reload()}> Rep</Button>

                   </Col> */}
        </Row> 

               </CardTitle>
              <form>
                <Row className="custom-row">
                  <Col xs={12} md={2}>
                    <div className="mb-2">Customer Name*</div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="d-inline">
                      <label
                        className="visually-hidden custom-content"
                        htmlFor="customerSelect"
                      >
                        Select Customer
                      </label>
                      <Select
                        id="customerSelect"
                        className="custom-content"
                        options={DebtorsList}
                        value={selectedOption}
                        onChange={selected => 
                        handleFilterForInvoice(selected)
                        }
                        placeholder="Select or add a customer"
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={2}>
                    <div className="d-inline">
                      <Button variant="link" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />{" "} Add New Customer
                        {/* Assuming you have an icon library */}
                      </Button>

                      <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add New Customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Hi Akshay Neriya
                          {/* Your form for adding a customer goes here */}
                          {/* You can use Form controls or any other input elements */}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary">Save Customer</Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Col>
                </Row>



           
                </form>
   {selectedCompany.length !=0 ? <Row className="pt-3 pr-3 pl-3">
  <h5>Customer Detail</h5>
  </Row>:""}
  {selectedCompany.length !=0 ?   <Row className="pt-1 pr-3 pl-3 pb-3">

                  <Col md={6}>
                    <Label>
                      company name - &nbsp;
                      {
                      selectedCompany.companyName
                    }
                    </Label>
                    <br/>
                    <Label>
                      Email - &nbsp;
                      {
                      selectedCompany.customerEmail
                    } 
                    </Label>
                    <br/>
                    <Label>
                      Pan - &nbsp;
                      {
                      selectedCompany.companyPan
                    } 
                    </Label>
                    <br/>
                    <Label>
                      Contact no. - &nbsp;
                      {
                      selectedCompany.customerMobile
                    } 
                    </Label>
                    <br/>
                    <Label>
                      Address - &nbsp;
                      {
                      selectedCompany.address1
                    } &nbsp; {
                      selectedCompany.address2
                    } , &nbsp;  
                    { selectedCompany.zipcode},
                    &nbsp; {
                      selectedCompany.city
                    }
                    </Label>
                  </Col>
                  <Col md={6}></Col>
                </Row>:""}
              
              <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>
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
                                onChange={()=>[
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
                                onChange={()=>[
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
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    onClick={() => handleFormSubmit(formikModal.values)}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer />

    </Container>
  )
}

export default withRouter(SendBillTransaction)
