import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import './style.css'
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

  Table,
  Row,Col
} from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { getAllDebtors as ongetAllDebtors}  from '../../../store/actions'
import CurrencyFormat from 'react-currency-format';
import Select from "react-select"
import * as moment from "moment";
// import { hover } from "@testing-library/user-event/dist/types/convenience";

// import '../../../pages/Dashboard/users/send-bill-transaction/sendbilltransaction.scss'
const ReportedDefaulterModel = props => {
    const [DebtorsList, setDebtorsList] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const { isOpen, toggle , GetAllInvoice } = props
    const [filteredInvoiceList, setfilteredInvoiceList]=useState([])

    const customStyles = {
     
      control: (provided, state) => ({
        ...provided,
        background: "#FAFAFA",
        width:"300px",
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
          margin:2
        })
      }),
      // Add more styles as needed for other parts of the Select component
    };

  console.log("PROPSS", GetAllInvoice)
  const { GetAllDebtors } = useSelector(state => ({
    GetAllDebtors: state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response : [],
  }))
  const dispatch = useDispatch()
  const handleInputChange = inputValue => {
    // Handle input change here
  }
  const [totalValue, settotalValue]=useState([])
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

useEffect(()=>{
  setDebtorsList( GetAllDebtors != undefined && GetAllDebtors.length != 0 ? GetAllDebtors.map((item)=>{
    return {
      "value": item.id , "label":  item.firstname+" "+item.lastname
    }
  }):[])
  
},[DebtorsList])

useEffect(()=>{
  const { isOpen, toggle , GetAllInvoice } = props
  dispatch(ongetAllDebtors());
  console.log("ABSCS0 props0", props)


},[filteredInvoiceList])

// console.log("GetAllDebtors Data",DebtorsList,GetAllInvoice,GetAllDebtors)
const TotalDebtorPayment =(item)=>{
  if(item != undefined){
    settotalValue(item.remainingAmount)

  }
}
const handleFilterInvoiceList = (item)=>{
  var filteredArrays =  []
  filteredArrays =  GetAllInvoice.filter(value=>value.debtorId == item.value)
  console.log("filteredInvoiceList",filteredInvoiceList,filteredArrays[0])
  setfilteredInvoiceList([filteredArrays[0]])
  
}
const [filteredCustomerDetail, setfilteredCustomerDetail] = useState([])
console.log("filteredCustomerDetailfilteredCustomerDetail",filteredCustomerDetail)
const handleSelectCustomer =(item)=>{
  setSelectedOption(item)

  var filteredArray =  []
  filteredArray =  GetAllDebtors.filter(value=>value.id == item.value)
  // console.log("ITEM +",filteredArray)
  setfilteredCustomerDetail(filteredArray[0])

  handleFilterInvoiceList(item)
}
console.log("filteredCustomerDetail",GetAllDebtors,filteredCustomerDetail)
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle} 
    >
      <div className="modal-contents">
        <ModalHeader toggle={toggle}>Report A Defaulter</ModalHeader>
      
    
            <ModalBody className="" >
            <form>
            <Row className="selectionList">
                  <Col xs={12} md={2}>
                    <div className="mb-2"><b className="mt-2">Customer Name*</b></div>
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
      options={DebtorsList}
      styles={customStyles}
      value={selectedOption}
      onChange={selected => handleSelectCustomer(selected)}
    />
                      
                    </div>
                  </Col>
                  <Col xs={12} md={3}>
                    <div className="d-inline">
                      <Button variant="link" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />{" Add New Customer"}
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

               {filteredCustomerDetail.length != 0? <Row className="mt-4">
                  <Label>
                    Company name - {filteredCustomerDetail.companyName}
                  </Label>
                  <Label>
                    Company Email - {filteredCustomerDetail.customerEmail}
                  </Label>
                  <Label>
                    Company Mobile - {filteredCustomerDetail.customerMobile}
                  </Label>
                  <Label>
                    GST Number - {filteredCustomerDetail.gstin}
                  </Label>
                  <Label>
                  Address - {filteredCustomerDetail.address1} , {filteredCustomerDetail.address2} , {filteredCustomerDetail.city}, {filteredCustomerDetail.zipcode}
                  </Label>
                </Row>:""}

                <Row className="tableRow">
                <table className="table table-bordered tableRowtable" >
       <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Company Name</th>
      <th scope="col">Invoice number</th>
      <th scope="col">Date</th>
      <th scope="col">Amount</th>
     
    </tr>
  </thead>
  <tbody>
    {filteredInvoiceList != undefined && filteredInvoiceList.length != 0 ?filteredInvoiceList.map((item)=>{
      return <tr key={item}>
        <td>
          <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={()=>TotalDebtorPayment(item)}/>
          </td>
        <td>
{console.log("HELLO0", item)}
          {item!= undefined ?item.debtor.companyName:''}
        </td>
        <td> {item != undefined ?item.invoiceNumber:""}</td>
        <td>{ moment(item != undefined ?item.dueDate:'').format("DD-MMM-YYYY")}</td>
        <td className="text-end">
          
        <CurrencyFormat value={item != undefined ?item.remainingAmount.toFixed(2):''} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{}</div>} />
        </td>

      </tr>
    }):''}
    </tbody></table>
    

                </Row>
                <Row>
                <Col  md={8}></Col>
                 {totalValue.length != 0 ? <Col md={3} className="text-end">
                  <b>TOTAL</b> - <b> {totalValue.toFixed(2)}</b>
                  </Col>:""}
                  
                </Row>

            </ModalBody>

              
           
      </div>
      <ToastContainer />

    </Modal>
  )
}

ReportedDefaulterModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDefaulterModel
