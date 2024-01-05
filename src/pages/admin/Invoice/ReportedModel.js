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

  Table,
  Row, Col
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import Select from "react-select"
import { useFormik } from "formik"
import ConfirmReportModal from './ConfirmReportDefaulterModal'
import { setConfirmReportDefaultModal, setPreviewModalOpen, addRatingToDebtor } from "../../../store/debtors/debtors.actions"
import { confirReportDefaultModel, ReportDefPreviewModal, addRatingofDebtor } from "store/debtors/debtors.selecter"
import ReportDefPreviewModals from './ReportDefaulterapreviewModal'
import { options } from "toastr"

const ReportedDebtorsModel = props => {
  const [timelystarRating, settimelyStarRating] = useState(0)
  const [responsivestarRating, setresponsivestarRating] = useState(0)
  const [Integrity, setIntegrity] = useState(0)
  const { isOpen, toggle, filteredCustomerDetail,allInvoiceList } = props

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

  const handleFeedbackModal = () => {


    dispatch(setConfirmReportDefaultModal(!isConfirmModalOpen))
  }

  const handlePreviewShow = () => {

    dispatch(addRatingToDebtor(feedbackdataPaylod))
    dispatch(setPreviewModalOpen(!isPreviewModalShow))
    setratingValue(
      {
        "timelystarRating":timelystarRating,
        "responsivestarRating": responsivestarRating,
        "Integrity":Integrity
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

  console.log('feedbackdataPaylod', feedbackdataPaylod);

  const handlefinancialdifficult = (selected) => {
    
    console.log("selected", selected)
    const userFeedbackcheck = feedbackdataPaylod.findIndex(x => x.questionDesc == selected.questionDesc)
    if (userFeedbackcheck !== -1) {
      feedbackdataPaylod[userFeedbackcheck].values = selected.values
    } else {
      setfeedbackdataPaylod(lists => [...lists, selected])
    }
  }
  const [ratingValue,setratingValue]=useState([])


  console.log("allInvoiceList",allInvoiceList)
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
        <ModalHeader toggle={toggle}>Customer Feedback </ModalHeader>
        <ConfirmReportModal isOpen={isConfirmModalOpen} toggle={toggleViewModal} filteredCustomerDetail={filteredCustomerDetail} />
        <ReportDefPreviewModals isOpen={isPreviewModalShow} toggle={togglePreviwModal} filteredCustomerDetail={filteredCustomerDetail} feedbackdataPaylod={feedbackdataPaylod} allInvoiceList={allInvoiceList} ratingValue={ratingValue}/>
        <ModalBody>
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
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={options}
                  styles={colourStyles}
                  placeholder="Yes/No"
                  onChange={(selected) => handlefinancialdifficult({
                    "questionDesc": "Is the customer facing financial difficulty",
                    "questionType": "DROP-DOWN",
                    "values": selected.value
                  })}
                />
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
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={options}
                  styles={colourStyles}
                  placeholder="Yes/No"
                  onChange={(selected) => handlefinancialdifficult({
                    "questionDesc": "Does the customer have intention to pay",
                    "questionType": "DROP-DOWN",
                    "values": selected.value
                  })}
                />
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
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={options}
                  styles={colourStyles}
                  placeholder="Yes/No"
                  onChange={(selected) => handlefinancialdifficult({
                    "questionDesc": "Does the customer currently buy the same product from your competitors?",
                    "questionType": "DROP-DOWN",
                    "values": selected.value
                  })}
                />
              </Col>
            </Row>
          </div>
          <div className="mb-1">
            <Row>
              <Col md={9}>
                <span className="mb-2">
                  4. Does the customer operate from Own premises or rented premises?   </span>
              </Col>
              <Col md={3}>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={optionsRentedOwn}
                  styles={colourStyles}
                  placeholder="Owned/Rented"
                  onChange={(selected) => handlefinancialdifficult({
                    "questionDesc": "Does the customer operate from OWn premises or rented premises?",
                    "questionType": "DROP-DOWN",
                    "values": selected.value
                  })}
                />
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
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={options}
                  styles={colourStyles}
                  placeholder="Yes/No"
                  onChange={(selected) => handlefinancialdifficult({
                    "questionDesc": "Has the customer changed his place of business since buying the goods from you? ",
                    "questionType": "DROP-DOWN",
                    "values": selected.value
                  })}
                />
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
                <span>
                  <Input

                    className={`form-control custom-content`}
                    placeholder="Input in years"
                    onChange={(e) => handlefinancialdifficult({
                      "questionDesc": " How old your business relationship with this customer?",
                      "questionType": "TEXT",
                      "values": e.target.value
                    })}
                  />
                </span>
              </Col>
            </Row>
          </div>
          <div className="mt-3 mb-3">
            <Row>
              <Col md={9}>
                <b>Rate your customer</b>
              </Col>
              <Col md={3}>
                <b>0-5 stars </b>
              </Col>
            </Row>
          </div>
          <div className="mb-1">
            <Row>
              <Col md={9}>
                <span className="mb-2">
                  1. Integrity</span>
              </Col>
              <Col md={3}>
                <span>
                  <i className='bx bxs-star'
                      onClick={()=>{
                        setIntegrity(1)
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
                    setIntegrity(2)
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
                    setIntegrity(3)
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
                    setIntegrity(4)
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
                  setIntegrity(5)
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
                  setresponsivestarRating(1)
                }}
                    style={{ color: responsivestarRating != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
                <span>
                  <i className='bx bxs-star' onClick={(selected) =>{
                  //    handlefinancialdifficult({
                  //   "questionDesc": "Responsiveness",
                  //   "questionType": "RATING",
                  //   "values": 2
                  // })
                  setresponsivestarRating(2)

                }}
                    style={{ color: responsivestarRating != 0 && responsivestarRating > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
                <span>
                  <i className='bx bxs-star' onClick={(selected) =>{
                  //    handlefinancialdifficult({
                  //   "questionDesc": "Responsiveness",
                  //   "questionType": "RATING",
                  //   "values": 3
                  // })
                  setresponsivestarRating(3)

                }}
                    style={{ color: responsivestarRating != 0 && responsivestarRating > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
                <span>
                  <i className='bx bxs-star' onClick={(selected) =>{ 
                  //   handlefinancialdifficult({
                  //   "questionDesc": "Responsiveness",
                  //   "questionType": "RATING",
                  //   "values": 4
                  // })
                  setresponsivestarRating(4)

                }}
                    style={{ color: responsivestarRating != 0 && responsivestarRating > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
                <span>
                  <i className='bx bxs-star' onClick={(selected) =>{
                  //    handlefinancialdifficult({
                  //   "questionDesc": "Responsiveness",
                  //   "questionType": "RATING",
                  //   "values": 5
                  // })
                  setresponsivestarRating(5)

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
                  settimelyStarRating(1)
                }}
                    style={{ color: timelystarRating != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
                <span>
                  <i className='bx bxs-star' onClick={(selected) =>{ 
                  //   handlefinancialdifficult({
                  //   "questionDesc": "TimelyPayment",
                  //   "questionType": "RATING",
                  //   "values": 2
                  // })
                  settimelyStarRating(2)

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
                  settimelyStarRating(3)

                }}
                    style={{ color: timelystarRating != 0 && timelystarRating > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
                <span>
                  <i className='bx bxs-star' onClick={(selected) =>{
                  //    handlefinancialdifficult({
                  //   "questionDesc": "TimelyPayment",
                  //   "questionType": "RATING",
                  //   "values": 4
                  // })
                  settimelyStarRating(4)

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
                  settimelyStarRating(5)

                }}
                    style={{ color: timelystarRating != 0 && timelystarRating > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                  ></i></span>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Back
          </Button>
          <Button type="button" color="primary" onClick={() => handlePreviewShow()}>
            Process
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

ReportedDebtorsModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDebtorsModel
