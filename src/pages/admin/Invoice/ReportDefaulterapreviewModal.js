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
  Row, Col
} from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import './style.css'
import moment from "moment";
import { setConfirmReportDefaultModal, setPreviewModalOpen } from "../../../store/debtors/debtors.actions"
import { confirReportDefaultModel, ReportDefPreviewModal } from "store/debtors/debtors.selecter"
import ConfirmReportModal from './ConfirmReportDefaulterModal'
import { selectReportDefPreviwData } from "store/ReportDefulterPreview/ReportDefulterPreview.selecter";
import { fetchReportDefulterPreviewStart } from "store/ReportDefulterPreview/ReportDefulterPreview.action";


const ReportDefPreviewModals = props => {
  const { isOpen, toggle, selected, filteredCustomerDetail, feedbackdataPaylod, allInvoiceList, ratingValue ,dataForPreview} = props
  const allInvoiceListForPreview = allInvoiceList[0] != undefined ? allInvoiceList[0].allInvoiceListForPreview : []
  const Integrity = ratingValue.Integrity
  const responsivestarRating = ratingValue.responsivestarRating
  const timelystarRating = ratingValue.timelystarRating
  console.log("feedbackdataPaylod", allInvoiceList)
  const dispatch = useDispatch()
  console.log("filteredCustomerDetail", filteredCustomerDetail)
  const isConfirmModalOpen = useSelector(confirReportDefaultModel)
  const ReportDefulterPreviewData = useSelector(selectReportDefPreviwData)
  const toggleViewModal = () => dispatch(setConfirmReportDefaultModal(!confirReportDefaultModel));
  console.log("reportDefulterPreviw", ReportDefulterPreviewData);



  useEffect(() => {
    dispatch(fetchReportDefulterPreviewStart())
    console.log("allInvoiceList Preview", dataForPreview)
  }, [])

  const handleFeedbackModal = () => {


    dispatch(setConfirmReportDefaultModal(!isConfirmModalOpen))
  }
  const PDF = "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"
  console.log("PREVIEW PROPS ", props)
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
        <ConfirmReportModal isOpen={isConfirmModalOpen} toggle={toggleViewModal} filteredCustomerDetail={filteredCustomerDetail} feedbackdataPaylod={feedbackdataPaylod} allInvoiceLists={allInvoiceList} ratingValue={ratingValue} />
        {console.log('filteredCustomerDetail', filteredCustomerDetail)}
        <ModalBody className="bg-light">
          <Row className="p-3">
            <Row className="">
              <div className="mb-2"><b className="">Company Detail -</b></div>

              <Label className="text-capitalize">
                Name - {filteredCustomerDetail.companyName}
              </Label>
              <Label /* className="text-capitalize" */>
                Email - {filteredCustomerDetail.customerEmail}
              </Label>
              <Label className="text-capitalize">
                Mobile - {filteredCustomerDetail.customerMobile}
              </Label>
              <Label className="text-capitalize">
                GST Number - {filteredCustomerDetail.gstin}
              </Label>
              <Label className="text-capitalize">
                {console.log("filteredCustomerDetail.address1", filteredCustomerDetail.address1)}
                Address - {filteredCustomerDetail.address1 != '' ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.zipcode}
              </Label>
              <Label className="text-uppercase">
                PAN Number - {filteredCustomerDetail.companyPan}
              </Label>
            </Row>
            <div className="mb-3 mt-3"><b className="">Invoice Detail</b></div>

            {dataForPreview != undefined ? dataForPreview.map((item) => {
              return <Row className="bg-white p-3" key={item}>
                <Row>
                  <Col md={3}><strong>Invoice Number - {item.itemDetail}</strong></Col>
                  <Col md={3}><strong>Due Date - {moment(item.date).format("DD-MM-YYYY")}</strong></Col>
                  <Col md={3}><strong>Due Amount - {item.amount}</strong></Col>
                  <Col md={3}>

                  </Col>

                </Row>
                <Row className="mt-2">
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Invoice Document</strong>
                      </Col>
                      <Col md={4}>
                        <a href={item.invoiceDocument.fileUrl} rel='noreferrer' target='_blank'>
                          <i className='bx bxs-file-jpg mt-2 fileSizing'></i>

                        </a>
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Dispatch Document</strong>
                      </Col>
                      <Col md={4}>
                        <a href={item.DispatchDocument.fileUrl} rel='noreferrer' target='_blank'>
                          <i className='bx bxs-file mt-2 fileSizing'></i>

                        </a>              </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Transportation Document</strong>
                      </Col>
                      <Col md={4}>
                        <a href={item.DeliveryDocument.fileUrl} rel='noreferrer' target='_blank'>
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
                        <a href={item.purchaseOrderDocument.fileUrl} rel='noreferrer' target='_blank'>
                          <i className='bx bxs-file mt-2 fileSizing'></i>

                        </a>              </Col>
                    </Row>

                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>General Document</strong>
                      </Col>
                      <Col md={4}>
                        <a href={item.generalDocuments.fileUrl} rel='noreferrer' target='_blank'>
                          <i className='bx bxs-file-jpg mt-2 fileSizing'></i>

                        </a>
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>GST Document</strong>
                      </Col>
                      <Col md={4}>
                        <a href={item.GSTDocument.fileUrl} rel='noreferrer' target='_blank'>
                          <i className='bx bxs-file mt-2 fileSizing'></i>

                        </a>              </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                   

                  </Col>
                  <Col md={3}>
                   

                  </Col>
                </Row>

              </Row>

            })
              : ''


            }



            <div className="mt-3 mb-3">
              <Row>
                <Col md={9}>  <b>Customer Feedback</b>
                </Col>
                <Col md={3}>
                  <b className=" ">Answers</b>
                </Col>
              </Row>
            </div>
            {feedbackdataPaylod != undefined ?
              feedbackdataPaylod.map((item, index) => {
                return <Row key={item}>

                  <div className="mb-1">

                    {item.questionType != "RATING" ? <Row>
                      <Col md={9}>


                        <span className="mb-2">

                          {index + 1}.  {item.questionDesc}   </span>
                      </Col>
                      <Col md={3}>


                        <strong>{item.values}</strong>





                      </Col>
                    </Row>
                      : ""}

                  </div>

                  {/* 
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
    </div> */}







                </Row>
              })
              : ""
            }





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
                      onClick={() => {
                      }}
                      // onClick={(selected) => {
                      //   handlefinancialdifficult({
                      //     "questionDesc": "Integrity",
                      //     "questionType": "RATING",
                      //     "values": 1
                      //   })
                      //   setIntegrity(1)
                      // }
                      //  }
                      style={{ color: Integrity != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        // handlefinancialdifficult({
                        //   "questionDesc": "Integrity",
                        //   "questionType": "RATING",
                        //   "values": 2
                        // })
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        // handlefinancialdifficult({
                        //   "questionDesc": "Integrity",
                        //   "questionType": "RATING",
                        //   "values": 3
                        // })
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        // handlefinancialdifficult({
                        //   "questionDesc": "Integrity",
                        //   "questionType": "RATING",
                        //   "values": 4
                        // })
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        // handlefinancialdifficult({
                        //   "questionDesc": "Integrity",
                        //   "questionType": "RATING",
                        //   "values": 5
                        // })
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
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
                      onClick={(selected) => {
                        //   handlefinancialdifficult({
                        //   "questionDesc": "Responsiveness",

                        //   "questionType": "RATING",
                        //   "values": 1
                        // })
                      }}
                      style={{ color: responsivestarRating != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //    handlefinancialdifficult({
                      //   "questionDesc": "Responsiveness",
                      //   "questionType": "RATING",
                      //   "values": 2
                      // })

                    }}
                      style={{ color: responsivestarRating != 0 && responsivestarRating > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //    handlefinancialdifficult({
                      //   "questionDesc": "Responsiveness",
                      //   "questionType": "RATING",
                      //   "values": 3
                      // })

                    }}
                      style={{ color: responsivestarRating != 0 && responsivestarRating > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //   handlefinancialdifficult({
                      //   "questionDesc": "Responsiveness",
                      //   "questionType": "RATING",
                      //   "values": 4
                      // })

                    }}
                      style={{ color: responsivestarRating != 0 && responsivestarRating > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //    handlefinancialdifficult({
                      //   "questionDesc": "Responsiveness",
                      //   "questionType": "RATING",
                      //   "values": 5
                      // })

                    }}
                      style={{ color: responsivestarRating != 0 && responsivestarRating > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
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
                    <i className='bx bxs-star' onClick={(selected) => {
                      //   handlefinancialdifficult({
                      //   "questionDesc": "TimelyPayment",
                      //   "questionType": "RATING",
                      //   "values": 1
                      // })
                    }}
                      style={{ color: timelystarRating != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //   handlefinancialdifficult({
                      //   "questionDesc": "TimelyPayment",
                      //   "questionType": "RATING",
                      //   "values": 2
                      // })

                    }}
                      style={{ color: timelystarRating != 0 && timelystarRating > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {

                      //   handlefinancialdifficult({
                      //   "questionDesc": "TimelyPayment",
                      //   "questionType": "RATING",
                      //   "values": 3
                      // })

                    }}
                      style={{ color: timelystarRating != 0 && timelystarRating > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //    handlefinancialdifficult({
                      //   "questionDesc": "TimelyPayment",
                      //   "questionType": "RATING",
                      //   "values": 4
                      // })

                    }}
                      style={{ color: timelystarRating != 0 && timelystarRating > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star' onClick={(selected) => {
                      //   handlefinancialdifficult({
                      //   "questionDesc": "TimelyPayment",
                      //   "questionType": "RATING",
                      //   "values": 5
                      // })

                    }}
                      style={{ color: timelystarRating != 0 && timelystarRating > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
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
          <Button type="button" color="primary" onClick={() => handleFeedbackModal()}>
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
