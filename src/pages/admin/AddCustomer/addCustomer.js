import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import 'react-table-6/react-table.css'
import { AddcustomerFomr } from "./addCustomerForm"
import { addCustomerlist } from "../../../store/actions"
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
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux";
import { getAllDebtors, setIsReportDefOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, selectDebtorsList } from "store/debtors/debtors.selecter"
import moment from 'moment'

const AddCustomer = props => {
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const dispatch = useDispatch();

  const isReportDefOpen = useSelector(selectReportDefOpen);
  const toggleViewModal3 = () =>  dispatch(setIsReportDefOpen(!isReportDefOpen));

  const GetAllDebtors = useSelector(selectDebtorsList)
  console.log(GetAllDebtors);

  useEffect(() => {
    dispatch(getAllDebtors());
    getDays()

  }, [])

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
  
const handleReportDefaulter = ()=>{
  setShowModal(true)
  //dispatch(setIsReportDefOpen(!isReportDefOpen))
}
const getDays = ()=>{
    GetAllDebtors != undefined ? GetAllDebtors.map((item)=>{
   const a = moment(item.dueDate);
    const b =moment()
    const c = moment(b).diff(a)
    const d = moment.duration(c)
    if(getDaysArray.length != GetAllDebtors.length ){
      getDaysArray.push(d.days())

    }
  }):[]
}
  return (
    <React.Fragment>
      <Card>
        <CardBody>
            <div className="mb-4 h4 card-title"></div>
          <br/>
          <br/>
          <br/>
        <Row>
          <Col md={10} className="pl-3">
            <h5 className="m-1">Add Customer</h5>
          </Col>
          <Col md={2}>
            <Button className="btn btn-md btn-info" onClick={()=>handleReportDefaulter()}>Add new customer</Button>
          </Col>
        </Row>

          <Row className="p-4  ml-5">
          {/* <br/> */}
          
            {/* <ReactTable
              data={GetAllDebtors != undefined ? GetAllDebtors : []}
              columns={columns}
              showPagination={true}
              defaultPageSize={5}
            /> */}
       
       <table className="table table-bordered">
       <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Customer Name</th>
      {/* <th scope="col">Refrence Number</th> */}
      <th scope="col">companyName</th>
      <th scope="col">Address</th>
      <th scope="col">GST Number</th>
      {/* <th scope="col">Status</th> */}
      <th scope="col">Mobile Number</th>
      <th scope="col">Email</th>
{/*       <th scope="col">Due From</th>
      <th scope="col">Action</th> */}
      {/* <th scope="col">Upload Document</th> */}
    </tr>
  </thead>
  <tbody>
   {GetAllDebtors != undefined ? GetAllDebtors.map((item, index)=>{
    return  <tr key={item}>
      {console.log("NEW TABLE ", item)}
      
    <th scope="row" className="pt-4">{index + 1}</th>
    {/* <td className="pt-4">{item.debtor.firstname} {item.debtor.lastname}</td> */}
    <td className="pt-4 text-capitalize">{item.firstname +''+item.lastname}</td>
    {/* <td className="pt-4">{item.referenceNumber}</td> */}
    <td className="pt-4 text-capitalize">{item.companyName}</td>
    <td className="pt-4 text-capitalize">{item.address1},{item.address2},{item.city}</td>
    <td className="pt-4 text-capitalize">{item.gstin}</td>
    <td className="pt-4 text-start">{item.customerMobile}</td>
    {/* <td className="pt-4">{item.status}</td> */}
    <td className="pt-4 text-start">
      {/* <CurrencyFormat value={item.remainingAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}
      {item.customerEmail}
    </td>

   {/*  <td >
   
    <div className="" style={{ padding:"2px 15px"}}>
      
  <div className=" text-center bg-success rounded text-light">
    <div className="text-capitalize">
      
       {getDaysArray[index]}  &nbsp;


       <span className="ml-1">Days</span> </div>
    <div className="text-capitalize" >{moment(item.dueDate).format("MM-DD-YY")}</div>
  </div>
</div>
           
    </td>
    <td>
    <div className="pt-2">
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModel(item)
               
              }
            >
           Record Payment
            </Button>
            &nbsp;

            <Button className="btn btn-info btn-sm"
              // onClick={() => viewModels()
               
              // }
            >
           Request Edit
            </Button>
  
          </div>
    </td> */}
    {/* <td>
    <div className="pt-2">
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModels()
               
              }
            >
           Upload Document
            </Button>
  
          </div>
    </td> */}
  </tr>
   }):''} 
   
  
  </tbody>
       </table>

          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>
            Add New Customer{" "}
        </ModalHeader>
        <ModalBody>
           <AddcustomerFomr/>
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
    </React.Fragment>
  );
}

export default withRouter(AddCustomer)
