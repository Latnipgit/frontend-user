import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,

  Table,
  Row, Col
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import Select from "react-select"
import { useFormik } from "formik"
import ConfirmReportModal from './ConfirmReportDefaulterModal'
import { setConfirmReportDefaultModal, setPreviewModalOpen, addRatingToDebtor, getFeebBackQuestionList } from "../../../store/debtors/debtors.actions"
import { confirReportDefaultModel, ReportDefPreviewModal, addRatingofDebtor, getFeebBackQuestionListSelector } from "store/debtors/debtors.selecter"
import ReportDefPreviewModals from './ReportDefaulterapreviewModal'
import { options } from "toastr"

const ReportedDebtorsModel = props => {
  const [timelystarRating, settimelyStarRating] = useState(0)
  const [responsivestarRating, setresponsivestarRating] = useState(0)
  const [Integrity, setIntegrity] = useState(0)
  const { isOpen, toggle, filteredCustomerDetail, allInvoiceList, dataForPreview, debtorId } = props
  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }
  const customStyles = {

    control: (provided, state) => ({
      ...provided,
      background: "#FAFAFA",
      width: "300px",
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
        margin: 2
      })
    }),
    // Add more styles as needed for other parts of the Select component
  };

  const isConfirmModalOpen = useSelector(confirReportDefaultModel)
  const isPreviewModalShow = useSelector(ReportDefPreviewModal)

  const toggleViewModal = () => dispatch(setConfirmReportDefaultModal(!confirReportDefaultModel));
  const togglePreviwModal = () => dispatch(setPreviewModalOpen(!isPreviewModalShow));
  const getFeebBackQuestion = useSelector(getFeebBackQuestionListSelector)
  const handleFeedbackModal = () => {


    dispatch(setConfirmReportDefaultModal(!isConfirmModalOpen))
  }

  const handlePreviewShow = () => {
    dispatch(addRatingToDebtor(feedbackdataPaylod))
    dispatch(setPreviewModalOpen(!isPreviewModalShow))
    setratingValue(
      {
        "timelystarRating": timelystarRating,
        "responsivestarRating": responsivestarRating,
        "Integrity": Integrity
      }
    )
  }
  const dispatch = useDispatch()


  const [options, setoptions] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },

  ])

  const [optionsRentedOwn, setoptionsRentedOwn] = useState([
    { label: "Owned", value: "Owned" },
    { label: "Rented", value: "Rented" },
    { label: "Not Aware", value: "Not Aware" },

  ])
  const [selectedOption, setSelectedOption] = useState("")
  const [feedbackdataPaylod, setfeedbackdataPaylod] = useState([])
  const [feedbackdataPaylodTwo, setfeedbackdataPaylodTwo] = useState([])


  const handlefinancialdifficult = (selected) => {

    const userFeedbackcheck = feedbackdataPaylod.findIndex(x => x.questionId == selected.questionId)
    if (userFeedbackcheck !== -1) {
      feedbackdataPaylod[userFeedbackcheck].response = selected.values
    } else {
      setfeedbackdataPaylod(lists => [...lists, selected])

    }
  }

  const handlefinancialdifficultTwo = (selected) => {

    const userFeedbackcheck = feedbackdataPaylodTwo.findIndex(x => x.questionDesc == selected.questionDesc)
    if (userFeedbackcheck !== -1) {
      feedbackdataPaylodTwo[userFeedbackcheck].values = selected.values
    } else {
      setfeedbackdataPaylodTwo(lists => [...lists, selected])

    }
  }

  const [ratingValue, setratingValue] = useState([])

  useEffect(() => {
    dispatch(getFeebBackQuestionList())

  }, [])

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
        <ModalHeader toggle={toggle}>Feedback On Defaulting Customer </ModalHeader>
        {/* <ConfirmReportModal isOpen={isConfirmModalOpen} toggle={toggleViewModal} filteredCustomerDetail={filteredCustomerDetail} /> */}
        <ReportDefPreviewModals isOpen={isPreviewModalShow} toggle={togglePreviwModal} filteredCustomerDetail={filteredCustomerDetail} feedbackdataPaylod={feedbackdataPaylodTwo} allInvoiceList={allInvoiceList} ratingValue={ratingValue} dataForPreview={dataForPreview} />
        <ModalBody>
          <div className="mb-3">
            <Row>
              <Col md={9}>  <b></b>
              </Col>
              <Col md={3}>
                <b className=" ">Answers</b>
              </Col>
            </Row>
          </div>
          {getFeebBackQuestion.length > 0 ? getFeebBackQuestion.map((item, index) => {

            const opations = item.values != null && item.values.length > 0 ? item.values.map((x) => {
              return { label: x, value: x }
            }) : ''
            return (item.questionType === "DROP-DOWN" ? (
              <div className="mb-1" key={index}>
                <Row>
                  <Col md={9}>
                    <span className="mb-2">
                      {`${index + 1}. ${item.questionDesc} `} </span>
                  </Col>
                  <Col md={3}>
                    <Select
                      id="primaryContact"
                      className="custom-content"
                      options={opations}
                      styles={colourStyles}
                      placeholder={item.values.join("/")}
                      onChange={(selected) => (handlefinancialdifficult({
                        "debtorId": debtorId,
                        "questionId": item.id,
                        "response": selected.value
                      }), handlefinancialdifficultTwo({
                        "questionDesc": item.questionDesc,
                        "questionType": item.questionType,
                        "values": selected.value
                      }))}
                    />
                  </Col>
                </Row>
              </div>
            ) : item.questionType === "TEXT" ? (<div className="mb-1">
              <Row>
                <Col md={9}>
                  <span className="mb-2">
                    {`${index + 1}. ${item.questionDesc} `}</span>
                </Col>
                <Col md={3}>
                  <span>
                    <Input
                      className={`form-control custom-content`}
                      placeholder="Input in years"
                      onChange={(e) => (handlefinancialdifficult({
                        "debtorId": debtorId,
                        "questionId": item.id,
                        "response": e.target.value
                      }), handlefinancialdifficultTwo({
                        "questionDesc": item.questionDesc,
                        "questionType": item.questionType,
                        "values": e.target.value
                      }))}
                    />
                  </span>
                </Col>
              </Row>
            </div>) : item.questionType === "textarea" ? (<div className="mb-1">
              <Row>
                <Row md={9}>
                  <span className="mb-2">
                    {`${index + 1}. ${item.questionDesc} `} </span>
                </Row>
                <Row md={12}>
                  <span>
                    <textarea
                      rows={5}
                      className={`form-control custom-content`}
                      placeholder="Write you Review"
                      onChange={(e) => (handlefinancialdifficult({
                        "debtorId": debtorId,
                        "questionId": item.id,
                        "response": e.target.value
                      }), handlefinancialdifficultTwo({
                        "questionDesc": item.questionDesc,
                        "questionType": item.questionType,
                        "values": e.target.value
                      }))}
                    />
                  </span>
                </Row>
              </Row>
            </div>) : ''
            )
          }) : ""}

          {/*           <div className="mt-3 mb-3">
            <Row>
              <Col md={9}>
                <b>Rate your customer</b>
              </Col>
              <Col md={3}>
                <b>0-5 stars </b>
              </Col>
            </Row>
          </div> */}

          {getFeebBackQuestion.length > 0 ? getFeebBackQuestion.map((item, indx) => {
            return (item.questionType === "RATING" ? (<div className="mb-1">
              <Row key={indx} className="mt-2">
                <Col md={9} >
                  <span className="mb-2">
                    {`${indx + 1}. ${item.questionDesc} `}</span>
                </Col>
                <Col md={3}>
                  <span>
                    <i className='bx bxs-star'
                      //   onClick={()=>{
                      //     setIntegrity(1)
                      //  }} 
                      onClick={(selected) => {
                        (handlefinancialdifficult({
                          "debtorId": debtorId,
                          "questionId": item.id,
                          "response": 1
                        }), handlefinancialdifficultTwo({
                          "questionDesc": item.questionDesc,
                          "questionType": item.questionType,
                          "values": 1
                        }))
                        setIntegrity(1)
                      }
                      }
                      style={{ color: Integrity != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        (handlefinancialdifficult({
                          "debtorId": debtorId,
                          "questionId": item.id,
                          "response": 2
                        }), handlefinancialdifficultTwo({
                          "questionDesc": item.questionDesc,
                          "questionType": item.questionType,
                          "values": 2
                        }))
                        setIntegrity(2)
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        (handlefinancialdifficult({
                          "debtorId": debtorId,
                          "questionId": item.id,
                          "response": 3
                        }), handlefinancialdifficultTwo({
                          "questionDesc": item.questionDesc,
                          "questionType": item.questionType,
                          "values": 3
                        }))
                        setIntegrity(3)
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        (handlefinancialdifficult({
                          "debtorId": debtorId,
                          "questionId": item.id,
                          "response": 4
                        }), handlefinancialdifficultTwo({
                          "questionDesc": item.questionDesc,
                          "questionType": item.questionType,
                          "values": 4
                        }))
                        setIntegrity(4)
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                  <span>
                    <i className='bx bxs-star'
                      onClick={(selected) => {
                        (handlefinancialdifficult({
                          "debtorId": debtorId,
                          "questionId": item.id,
                          "response": 5
                        }), handlefinancialdifficultTwo({
                          "questionDesc": item.questionDesc,
                          "questionType": item.questionType,
                          "values": 5
                        }))
                        setIntegrity(5)
                      }
                      }
                      style={{ color: Integrity != 0 && Integrity > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                    ></i></span>
                </Col>
              </Row>
            </div>) : "")
          }) : ''}

        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Back
          </Button>
          <Button type="button" color="primary" onClick={() => handlePreviewShow()}>
            Next
          </Button>
        </ModalFooter>
      </div >
    </Modal >
  )
}

ReportedDebtorsModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDebtorsModel
