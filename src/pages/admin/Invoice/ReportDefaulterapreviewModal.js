import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import PropTypes from "prop-types"
import axios from "axios";

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
import './style.css'
import { setConfirmReportDefaultModal,setPreviewModalOpen} from "../../../store/debtors/debtors.actions"
import { confirReportDefaultModel,ReportDefPreviewModal } from "store/debtors/debtors.selecter"
import ConfirmReportModal from'./ConfirmReportDefaulterModal'


const ReportDefPreviewModals = props => {
  const { isOpen, toggle ,selected ,filteredCustomerDetail} = props
 const handleSubmit =()=>{
  toast.success("Reported Defaulter successfully")

 }
 const dispatch = useDispatch()
console.log("filteredCustomerDetail",filteredCustomerDetail)
 const isConfirmModalOpen = useSelector(confirReportDefaultModel)
 const toggleViewModal = () =>  dispatch(setConfirmReportDefaultModal(!confirReportDefaultModel));


 const checkboxStyle = {
  border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
  borderRadius: '4px', // Optional: Add rounded corners for a nicer look
  padding: '5px', // Optional: Add padding to the checkbox
  marginRight: '5px', // Optional: Add some spacing between the checkbox and label
};
  
const handleFeedbackModal = ()=>{
    
 
    dispatch(setConfirmReportDefaultModal(!isConfirmModalOpen))
  }

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
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Report Defaulter Preview</ModalHeader>
        <ConfirmReportModal isOpen={isConfirmModalOpen} toggle={toggleViewModal}   />

      <ModalBody className="bg-light">
 <Row className="p-3">
 <Row className="">
            <div className="mb-2"><b className="">Company Detail -</b></div>

            <Label className="text-capitalize">
               Name - {filteredCustomerDetail.companyName}
            </Label>
            <Label className="text-capitalize">
             Email - {filteredCustomerDetail.customerEmail}
            </Label>
            <Label className="text-capitalize">
              Mobile - {filteredCustomerDetail.customerMobile}
            </Label>
            <Label className="text-capitalize">
              GST Number - {filteredCustomerDetail.gstin}
            </Label>
            <Label className="text-capitalize">
{console.log("filteredCustomerDetail.address1",filteredCustomerDetail.address1)}
              Address - {filteredCustomerDetail.address1 != ''? filteredCustomerDetail.address1 +",":''} {filteredCustomerDetail.address2 != ''? filteredCustomerDetail.address2 +",":''} {filteredCustomerDetail.city != ''? filteredCustomerDetail.city +",":''} {filteredCustomerDetail.zipcode}
            </Label>
            <Label className="text-uppercase">
              PAN Number - {filteredCustomerDetail.companyPan}
            </Label>
          </Row> 
          <div className="mb-3 mt-3"><b className="">Invoice Detail</b></div>

          <Row className="bg-white p-3">
          <Row>
<Col md={3}><strong>Invoice Number - BAF-656525</strong></Col>
<Col md={3}><strong>Due Date - 12 Aug 2012</strong></Col>
<Col md={3}><strong>Due Amount - 6,500</strong></Col>

          </Row>
          <Row className="mt-2">
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Invoice Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file-jpg mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Dispatch Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Transportation Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Purchase Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
          </Row>

          </Row>

          <Row className="bg-white p-3 mt-2">
          <Row>
<Col md={3}><strong>Invoice Number - BAF-656525</strong></Col>
<Col md={3}><strong>Due Date - 12 Aug 2012</strong></Col>
<Col md={3}><strong>Due Amount - 6,500</strong></Col>

          </Row>
          <Row className="mt-2">
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Invoice Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file-jpg mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Dispatch Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Transportation Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
            <Col md={3}>
           <Row>
            <Col md={8} className="pt-4">
            <strong>Purchase Document</strong>
            </Col>
            <Col md={4}>
           <i className='bx bxs-file mt-2 fileSizing'></i>
            </Col>
           </Row>
            
            </Col>
          </Row>

          </Row>




          <Row>
          <div className="mt-3 mb-3">
              <Row>
                <Col md={9}>  <b>Customer Feedback</b>
                </Col>
                <Col md={3}>
                <b className=" ">Answers</b>
                </Col>
              </Row>
            </div>
            <div className="mb-1">

            <Row>
                <Col md={9}> 
                <span className="mb-2">

1. Is the customer facing financial difficulty?    </span>
                </Col>
                <Col md={3}>
              
              
                <strong>Yes</strong>

  

        

                </Col>
              </Row>
          

            </div>
     

<div className="mb-1">
<Row>
                <Col md={9}> 
                <span className="mb-2">

2. Does the customer have intention to pay?   </span>
                </Col>
                <Col md={3}>
                <strong>Yes</strong>

              
                </Col>
              </Row>
</div>

           <div className="mb-1">
           <Row>
                <Col md={9}> 
                <span className="mb-2">

3. Does the customer currently buy the same product from your competitors? </span>
                </Col>
                <Col md={3}>
              
                <strong>Yes</strong>

        
                </Col>
              </Row>
         
        
    </div>


<div className="mb-1">
<Row>
                <Col md={9}> 
                <span className="mb-2">

4. Does the customer operate from OWn premises or rented premises?   </span>
                </Col>
                <Col md={3}>
                <strong>Yes</strong>

                </Col>
              </Row>
</div>

       
          <div className="mb-1">
          <Row>
                <Col md={9}> 
                <span className="mb-2">

5. Has the customer changed his place of business since buying the goods from you?   </span>
                </Col>
                <Col md={3}>
               <strong>Owned</strong>
                </Col>
              </Row>
          </div>
         
            <div>
            <Row>
                <Col md={9}> 
                <span className="mb-2">

6. How old your business relationship with this customer?  </span>
                </Col>
                <Col md={3}>
                <strong>5 years</strong>
              
                </Col>
              </Row> 
            </div>



            

      
          
          </Row>
          <div className="mb-3 mt-3"><b className="">Rating</b></div>

          <div className="mb-1">
      <Row>
                <Col md={9}> 
                <span className="mb-2">

1. Integrity</span>
                </Col>
                <Col md={3}>
                <span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>
 
 <span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>

<span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>
              
              <span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>
                </Col>
              </Row>
      </div>

         <div className="mb-1">
      <Row>
                <Col md={9}> 
                <span className="mb-2">

2. Responsiveness</span>
                </Col>
                <Col md={3}>
                <span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>
 
 <span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>
               
              <span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star'
 style={{ color:'  #ffdb4d', fontSize:'18px'}}
 ></i></span>
                </Col>
              </Row>
      </div>

         <div>
      <Row>
                <Col md={9}> 
                <span className="mb-2">

3. Timely Payment </span>
                </Col>
                <Col md={3}>
                <span>
 <i className='bx bxs-star' 
 style={{ color: '  #ffdb4d', fontSize:'18px'}}
 ></i></span>
 
   <span>
 <i className='bx bxs-star'
 style={{ color: '  #ffdb4d', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' 
 style={{ color: '  #ffdb4d', fontSize:'18px'}}
 ></i></span>
              
               
   <span>
 <i className='bx bxs-star' 
 style={{ color: '  #ffdb4d', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' 
 style={{ color: '  #ffdb4d', fontSize:'18px'}}
 ></i></span>
                </Col>
              </Row>
      </div> 


          <Row>

          </Row>

 </Row>
   </ModalBody>
       
        <ModalFooter>
        <Button type="button" color="secondary" onClick={toggle}>
            Back
          </Button>
            <Button type="button" color="primary" onClick={()=>handleFeedbackModal()}>
Process
            </Button>
         
        </ModalFooter>
      </div>
      <ToastContainer />

    </Modal>
  )
}

ReportDefPreviewModals.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportDefPreviewModals
