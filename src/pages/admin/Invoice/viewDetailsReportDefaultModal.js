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
import noFile from '../../../assets/images/newImg/no-document.png'
import pdfImg from '../../../assets/images/newImg/pdf.png'
import jpgImg from '../../../assets/images/newImg/png-file-.png'

const ViewDetailsReportDefaultModal = props => {
  debugger
  const { isOpen, toggle, viewModalData } = props

  const filteredCustomerDetail = viewModalData.creditor
  const allInvoiceListForPreview = viewModalData.invoices

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
        <ModalHeader toggle={toggle}>View Detail</ModalHeader>

        <ModalBody>
          {filteredCustomerDetail != undefined ? <>
            <Row className="">
              <div className="mb-2"><b className="">Company Detail :</b></div>

              <Label className="text-capitalize">
                Name : {filteredCustomerDetail.companyName}
              </Label>
              <Label className="text-capitalize">
                Email : {filteredCustomerDetail.customerEmail}
              </Label>
              <Label className="text-capitalize">
                Mobile : {filteredCustomerDetail.customerMobile}
              </Label>
              <Label className="text-capitalize">
                GST Number : {filteredCustomerDetail.gstin}
              </Label>
              <Label className="text-capitalize">
                Address : {filteredCustomerDetail.address1 != '' ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.zipcode}
              </Label>
              <Label className="text-uppercase">
                PAN Number : {filteredCustomerDetail.companyPan}
              </Label>
            </Row>


            <Row>
              <Col md={10}>
                <div className="mb-3 mt-3"><b className="">Invoice Detail</b></div>

              </Col>
              <Col md={2} className="text-end">

                {/* <Button className="btn btn-info">Edit Invoice</Button> */}
              </Col>
            </Row>

            {viewModalData != undefined ? viewModalData.invoices.map((item) => {
              return <Row className="bg-light p-3 mt-1" key={item}>
                <Row>
                  <Col md={3}><strong>Invoice Number : {item.invoiceNumber}</strong></Col>
                  <Col md={3}><strong>Due Date : {moment(item.dueDate).format("DD-MM-YYYY")}</strong></Col>
                  <Col md={3}><strong>Due Amount : {item.remainingAmount}</strong></Col>
                  <Col md={3}>

                  </Col>

                </Row>

                <Row className="mt-2">
                  <Col md={3}>
                    <Row    >
                      <Col md={8} className="pt-4">
                        <strong>Invoice Document</strong>
                      </Col>
                      <Col md={4} className="mt-2">
                        {item.invoiceDocument != null ?
                          <a href={item.invoiceDocument.url} rel='noreferrer' target='_blank'>
                            {/* <i className='bx bxs-file-jpg mt-2 fileSizing'></i> */}
                            <img src={jpgImg} className="iconsImage shadow" />


                          </a>
                          :
                          // <i className='bx bxs-file-jpg mt-2 fileSizing'></i>
                          <img src={noFile} className="iconsImage shadow" />


                        }
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Dispatch Document</strong>
                      </Col>
                      <Col md={4}>
                        {item.challanDocument != null ? <a href={item.challanDocument.url} rel='noreferrer' target='_blank'>
                          {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                          <img src={jpgImg} className="iconsImage shadow" />


                        </a> :
                          // :                      <i className='bx bxs-file mt-2 fileSizing'></i>
                          <img src={noFile} className="iconsImage shadow" />

                        }
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Transportation Document</strong>
                      </Col>
                      <Col md={4} className="pt-2">
                        {item.transportationDocument != null ? <a href={item.transportationDocument.url} rel='noreferrer' target='_blank'>
                          {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                          <img src={pdfImg} className="iconsImage shadow" />


                        </a>
                          :
                          // <i className='bx bxs-file mt-2 fileSizing'></i>
                          <img src={noFile} className="iconsImage shadow" />

                        }
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Purchase Document</strong>
                      </Col>
                      <Col md={4}>
                        {item.purchaseOrderDocument != null ? <a href={item.purchaseOrderDocument.url} rel='noreferrer' target='_blank'>
                          {/* <i className='bx bxs-file mt-2 fileSizing'></i> */}
                          <img src={pdfImg} className="iconsImage shadow" />


                        </a> :
                          // <i className='bx bxs-file mt-2 fileSizing'></i>
                          <img src={noFile} className="iconsImage shadow" />


                        }          </Col>
                    </Row>

                  </Col>
                </Row>


              </Row>

            })
              : ''


            }

            <Row className="mt-2 mb-2">
              <b>Total Due Amount : {viewModalData.totalAmount}</b>
            </Row>
          </>
            : ""}

        </ModalBody>
      </div>
    </Modal>
  )
}

ViewDetailsReportDefaultModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ViewDetailsReportDefaultModal
