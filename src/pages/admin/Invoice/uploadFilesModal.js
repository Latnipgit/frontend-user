import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,

  Table,
  Row, Col
} from "reactstrap"


const UploadPendingFiles = props => {
  const { isOpen, toggle,uploadFilesModelDataForUpload  } = props
const handleFileChange = ()=>{

}
const PDF ="https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"
// console.log("uploadFilesModelDataForUpload",uploadFilesModelDataForUpload.invoices)

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
        <ModalHeader toggle={toggle}>Upload Pending Files</ModalHeader>

        <ModalBody>
    
{uploadFilesModelDataForUpload != undefined && uploadFilesModelDataForUpload.invoices!= undefined ? uploadFilesModelDataForUpload.invoices.map((item)=>{
  return    <Row className="bg-light p-3 mt-2" key={item}>
  <Row>
<Col md={3}><strong>Invoice Number - {item.invoiceNumber}</strong></Col>
<Col md={3}><strong>Due Date - {moment(item.dueDate).format("DD-MM-YYYY")}</strong></Col>
<Col md={4}><strong className="d-flex">Due Amount - 
<CurrencyFormat value={item.remainingAmount.toFixed(1)} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

</strong></Col>
<Col md={2}>

</Col>

  </Row>
  <Row className="mt-2">
    <Col md={3}>
   <Row>
    <Col md={8} className="pt-4">
    <strong>Invoice Document</strong>
    </Col>
    <Col md={4}>
    <a href={PDF}  rel='noreferrer' target='_blank'>
    <i className='bx bxs-file-jpg mt-2 fileSizing'></i>

</a>  
    </Col>
   </Row>
    
    </Col>
    <Col md={3}>
   <Row>
  
    <Col md={12} className="pt-4">
  
    <InputGroup className="text-capitalize">
                    <input
                      type="file"
                      className="form-control"
                      id="uploadPurchaseOrder"
                      accept=".pdf, .doc, .docx, .txt"
                      aria-describedby="fileUploadHelp"
                    //   onChange={e =>
                    //     handleFileChange(e)
                    //   }
                    />
                  </InputGroup>
                  <strong>Dispatch Document</strong>

                  
                        </Col>
   </Row>
    
    </Col>
    <Col md={3}>
   <Row>
    <Col md={8} className="pt-4">
    <strong>Transportation Document</strong>
    </Col>
    <Col md={4}>
    <a href={PDF}  rel='noreferrer' target='_blank'>
    <i className='bx bxs-file mt-2 fileSizing'></i>

</a>              </Col>
   </Row>
    
    </Col>
    <Col md={3}>
   <Row>
    <Col md={8} className="pt-4">
    <strong>Purchase Document</strong>
    </Col>
    <Col md={4}>
    <a href={PDF}  rel='noreferrer' target='_blank'>
    <i className='bx bxs-file mt-2 fileSizing'></i>

</a>              </Col>
   </Row>
    
    </Col>
  </Row>

  </Row>
}):""}
   

        




     

        </ModalBody>
        </div>
    </Modal>
  )
}

UploadPendingFiles.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadPendingFiles
