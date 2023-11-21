import React, { useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'

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


const InvoiceDetailViewModel = props => {
 
  const { isOpen, toggle,SelectedInvoice  } = props
  console.log("PROPSSSS", props)
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
        <ModalHeader toggle={toggle}>Invoice Details</ModalHeader>
      
      <ModalBody>
     
<Row>
  <Col md={6}>
  <h5 className="text-start">{SelectedInvoice.debtor}</h5>

  </Col>
  <Col md={6} className="text-end">
  <h3 className="text-end">Tax Invoice</h3>
  <p className="text-end">#{SelectedInvoice.billNumber}</p>

<strong>Balance Due</strong>
<br/>
<strong><i className="bx bx-rupee"></i>{SelectedInvoice.remainingAmount}</strong>
<br/>
<br/>
<p> Invoice Date &nbsp;&nbsp;&nbsp;
{moment(SelectedInvoice.createdAt).format('MM-DD-YYYY')}
</p>
<p>Due Date &nbsp;&nbsp;&nbsp;
{moment(SelectedInvoice.billDate).format('MM-DD-YYYY')}

  </p>
  </Col>
</Row>
<Row>
  <table className="table table-bordered">
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Rate</th>
      <th>Amount</th>
    </tr>
   {isOpen != false ? SelectedInvoice.items != [] ? SelectedInvoice.items.map((items)=>{
    <tr key={items}>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
   }):'':''} 
  </table>
</Row>
<Row>
  <Col md={8}></Col>
  <Col md={4} className="text-end">
    <p>Sub Total - 123</p>
    <p>Total - 123</p>
  </Col>
</Row>
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

InvoiceDetailViewModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default InvoiceDetailViewModel
