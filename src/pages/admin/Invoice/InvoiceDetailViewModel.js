import React, { useEffect, useState } from "react"
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
  Row, Col
} from "reactstrap"


const InvoiceDetailViewModel = props => {
  const { isOpen, toggle, SelectedInvoice } = props

  // useEffect(() => {
  //   const { isOpen, toggle, SelectedInvoice } = props
  // }, [props, SelectedInvoice])
  console.log("props", SelectedInvoice)
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
            <Col md={9}>
              {SelectedInvoice != "" ? <h5 className="text-start">{SelectedInvoice.debtor.firstname} {SelectedInvoice.debtor.lastname}</h5>:""}

            </Col>
            <Col md={3} className="text-end">
              <h3 className="">Tax Invoice</h3>
              <p className="">#{SelectedInvoice.billNumber}</p>

              <strong>Balance Due</strong>
              <br />
              <strong><i className="bx bx-rupee"></i>{SelectedInvoice.remainingAmount}</strong>
              <br />
              <span> Invoice Date &nbsp;&nbsp;&nbsp;
                {moment(SelectedInvoice.createdAt).format('MM-DD-YYYY')}
              </span>
              <br />
              <span>Due Date &nbsp;&nbsp;&nbsp;
                {SelectedInvoice.billDate}
              </span>
              <br />

            </Col>
          </Row>
          <Row className="mt-3">
            <table className="table table-bordered text-center">
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
              {isOpen == true && SelectedInvoice != undefined && SelectedInvoice != {} ? SelectedInvoice.items.map((items) => {
                return <tr key={items}>
                  <td>{items.itemDetail}</td>
                  <td>{items.quantity}</td>
                  <td>{items.rate}</td>
                  <td>{items.amount}</td>
                </tr>
              }) : ''}
            </table>
          </Row>
          <Row>
            <Col md={8}></Col>
            <Col md={4} className="text-end">
              <span><strong>Sub Total - {SelectedInvoice != null ? SelectedInvoice.subTotal : '00'}</strong></span>
              <br />
              <span><strong>Total - {SelectedInvoice != null ? SelectedInvoice.creditAmount : '00'} </strong></span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <span>Thanks For Your Business</span>
            </Col>

          </Row>
        </ModalBody>
        <ModalFooter>
          {/* <Button type="button" color="primary" onClick={()=>setisProceed(true)}>
                      
            </Button> */}
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
