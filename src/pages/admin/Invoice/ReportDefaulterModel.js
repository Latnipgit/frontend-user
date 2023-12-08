import React, { useState } from "react"
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


const ReportedDefaulterModel = props => {
    const [isProceed, setisProceed] = useState(false)
  const { isOpen, toggle ,selected } = props
  console.log("PROPSS", selected)

  const handleFileChange = (event, fieldName) => {
    const files = event.target.files
    console.log("FILEEE", event.target.files,fieldName)
   
    const formData = new FormData();
   
    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);
   
 
    uploadFile(formData)


  }
    
  const [uploadTransportId, setuploadTransportId] = useState('')
  const [uploadpurchaseId, setuploadpurchaseId] = useState('')
  const [uploadInvoiceId, setuploadInvoiceId] = useState('')
  const [uploadChallanId, setuploadChallanId] = useState('')

  

  console.log("selected.debtor",selected.debtorId)
  function uploadFile(formData){
    console.log("UPLOAD FILE", formData)
    const token = localStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token :'',
    };
    
  
    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
      })       
      .then((response) => {
        toast.success("file upload successfully")
        console.log("Response", response)
        if(response.data.response.fieldName == "uploadInvoice"){
          setuploadInvoiceId(response.data.response.documentId)
        }
        if(response.data.response.fieldName == "uploadPurchaseOrder"){
          setuploadpurchaseId(response.data.response.documentId)
        }
        if(response.data.response.fieldName == "uploadchallanDispatchDocument"){
          setuploadChallanId(response.data.response.documentId )
        }
        if(response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`"){
          setuploadTransportId(response.data.response.documentId)
        }
      })
.catch((error) => {
  console.log("Response", error)

})
  }

  const handleProceed =(Value)=>{
    const payload =[{
      "invoiceId": selected.debtorId,
      "purchaseOrderDocument": uploadpurchaseId,
      "challanDocument": uploadChallanId,
      "invoiceDocument": uploadInvoiceId ,
      "transportationDocument": uploadTransportId
  }]
  upload(payload)
  }
  
  useEffect(()=>{
    setisProceed(false)
  },[])
  console.log("uploadpurchaseId", uploadpurchaseId)
  const upload=(value)=>{
    console.log("UPLOAD", value)
    const token = localStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token :'',
    };
    
  
    axios.post('https://bafana-backend.azurewebsites.net/api/transactions/updateInvoiceDocuments', value, {
      headers: headers
      })       
.then((response) => {
  console.log("Response", response)

  toast.success("upload file successfully")

  setInterval(() => {
window.location.reload()
  }, 2000);

})
.catch((error) => {
  console.log("Response", error)
  toast.error("something went wrong")


})
  }
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle} 
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Report A Defaulter</ModalHeader>
      
      <ModalBody>
    {isProceed == false?
<form>
   <Row className="mt-2">
   <Col md={2} ></Col>
    <Col md={2} className=" pt-2"><Label>Name</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter Name"
        value={selected != ''? selected.debtor.firstname +" " + selected.debtor.lastname:''}
        disabled
        />
        </Col>
        <Col md={2} ></Col>

   </Row>

   <Row className="mt-2">
   <Col md={2} ></Col>

    <Col md={2} className=" pt-2"><Label>Company Name</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter Company Name"
                value={selected != ''? selected.debtor.companyName :""}
                disabled

        />
        </Col>
        <Col md={2} ></Col>

   </Row>

   <Row className="mt-2">
   <Col md={2} ></Col>

    <Col md={2} className=" pt-2"><Label>Email</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter Email"
                        value={selected != ''? selected.debtor.customerEmail :""}
                        disabled
                        />
        </Col>
        <Col md={2} ></Col>

   </Row>
   <Row className="mt-2">
   <Col md={2} ></Col>

    <Col md={2} className=" pt-2"><Label>GST Number</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter GST number"
          value={selected != ''? selected.debtor.gstin :""}
          disabled
        />
        </Col>
        <Col md={2} ></Col>

   </Row>
   
</form>
       :
       <form>
        <Label>Please Upload Following Document</Label>

        <Row className="terms">
                  <Col md={11}>
                    <Card className="overflow-hidden rounded-lg bg-light">
                      <CardBody className="pt-0">
                      {selected.purchaseOrderDocument == null ?      <Col md={4} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                        Upload File to Purchase Order
                          </div>

                       <InputGroup className="text-capitalize">
                            <input
                              type="file"
                              className="form-control"
                              id="uploadPurchaseOrder"
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(e, "uploadPurchaseOrder")
                              }
                            />
                          </InputGroup>
                          
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                          
                        </Col>
                        :
                        <div className="text-center">                    <i className='bx bxs-file-pdf' style={{ fontSize:'40px'}}></i>
                    
                          <p> Purchase Order File</p>
                          </div>

                          }
                      
                      
                      {selected.challanDocument == null ?  <Col md={5} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                          Upload File to challan / Dispatch Document
                          </div>

                          <InputGroup>
                            <input
                              type="file"
                              className="form-control"
                              id="uploadchallanDispatchDocument"
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(
                                  e,
                                  "uploadchallanDispatchDocument"
                                )
                              }
                            />

                          </InputGroup>
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>  
                       :
                       <div className="text-center">                    <i className='bx bxs-file-pdf' style={{ fontSize:'40px'}}></i>
                   
                         <p> Challan / Dispatch Document File</p>
                         </div>  
                      }
                      </CardBody>
                    </Card>
                  </Col>

                
                </Row>
                <Row className="terms">
                  <Col md={11}>
                    <Card className="overflow-hidden rounded-lg bg-light">
                      <CardBody className="pt-0">
                       {selected.invoiceDocument == null ? <Col md={4} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                          Upload File to Invoice*
                          </div>

                          <InputGroup>
                            <input
                              type="file"
                              className="form-control"
                              id="uploadInvoice"
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(e, "uploadInvoice")
                              }
                            />
                          </InputGroup>
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                        
                        :
                       <div className="text-center">                    <i className='bx bxs-file-pdf' style={{ fontSize:'40px'}}></i>
                   
                         <p> Invoice Document File</p>
                         </div>  
                      }
                     {selected.transportationDocument== null?   <Col md={5} className="mt-2 hoverable-cell">
                          <div className="mb-2 mt-5">
                          Upload File to Transportation Document / Delivery
                            Receipt
                          </div>

                          <InputGroup>
                            <input
                              type="file"
                              className="form-control"
                              id="uploadTransportationDocumentDeliveryReceipt"
                              accept=".pdf, .doc, .docx, .txt"
                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(
                                  e,
                                  "uploadTransportationDocumentDeliveryReceipt~`"
                                )
                              }
                            />
                          </InputGroup>
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, DOC, DOCX, TXT).
                          </div>
                        </Col>
                        :
                       <div className="text-center">                    <i className='bx bxs-file-pdf' style={{ fontSize:'40px'}}></i>
                   
                         <p> Transportation Document / Delivery Receipt</p>
                         </div>  
                      }
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
       </form>
       
       }

      </ModalBody>
        <ModalFooter>
          {isProceed != true ?   <Button type="button" color="primary" onClick={()=>setisProceed(true)}>
                      Next
            </Button>
            :
            <Button type="button" color="primary" onClick={()=>handleProceed()}>
                      Proceed
            </Button>
            }
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
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
