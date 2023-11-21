import React, { useState } from "react"
import PropTypes from "prop-types"

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
  Row,Col
} from "reactstrap"


const ReportedDefaulterModel = props => {
    const [isProceed, setisProceed] = useState(false)
 
  const { isOpen, toggle ,additionalValue } = props
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
        <Input type="text" placeholder="Please Enter Name"/>
        </Col>
        <Col md={2} ></Col>

   </Row>

   <Row className="mt-2">
   <Col md={2} ></Col>

    <Col md={2} className=" pt-2"><Label>Company Name</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter Company Name"/>
        </Col>
        <Col md={2} ></Col>

   </Row>

   <Row className="mt-2">
   <Col md={2} ></Col>

    <Col md={2} className=" pt-2"><Label>Email</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter Email"/>
        </Col>
        <Col md={2} ></Col>

   </Row>
   <Row className="mt-2">
   <Col md={2} ></Col>

    <Col md={2} className=" pt-2"><Label>GST Number</Label></Col>
    <Col md={6}>
        <Input type="text" placeholder="Please Enter GST number"/>
        </Col>
        <Col md={2} ></Col>

   </Row>
   
</form>
       :
       <form>
        <Label>Please Upload Following Document</Label>
       </form>
       
       }

      </ModalBody>
        <ModalFooter>
            <Button type="button" color="primary" onClick={()=>setisProceed(true)}>
                      Proceed
            </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

ReportedDefaulterModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDefaulterModel
