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
    FormGroup,
    Table,
    Row, Col
} from "reactstrap"
import 'react-datepicker/dist/react-datepicker.css';
import { MarkOtherReasonModel } from "./markOtherReason";
import { MarkUploadCACertificate } from "./MarkUploadCACertificate";
import { ToastContainer, toast } from 'react-toastify';
// import axios from "axios";


export const MarkDisputedPopModule = props => {
    const { isOpen, toggle, selected, markedDisputed, currentindex, setIsOpenmark } = props

    const [otherReason, setOtherReason] = useState(false)
    const [markCAupload, setMarkCAupload] = useState(false)
    const [radioOption, setRadioOption] = useState("")
    const [nextBtn, setNextBtn] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const OtherReasonOpen = () => {
        setOtherReason(!otherReason)
    }
    const marCAUpload = () => {
        setMarkCAupload(!markCAupload)
    }

    function handleToggleItem(radio) {
        setRadioOption(radio)
    }

    function handleNext() {
        if (radioOption == "radio1") {
            markedDisputed(currentindex)
        }
        if (radioOption == "radio2") {
            marCAUpload()
        }
        if (radioOption == "radio3") {
            OtherReasonOpen()
        }
    }

    const submitCheck = (value) => {
        if (value) toast.success("Request send Successfully")
    }



    return (
        <>
            <MarkOtherReasonModel isOpen={otherReason} toggle={OtherReasonOpen} setIsOpenmark={setIsOpenmark} selected={currentindex} submitCheck={submitCheck} />
            <MarkUploadCACertificate isOpen={markCAupload} toggle={marCAUpload} setMarkCAupload={setMarkCAupload} setIsOpenmark={setIsOpenmark} selected={currentindex} submitCheck={submitCheck} />
            <Modal
                isOpen={isOpen}
                role="dialog"
                size="sm"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
                toggle={toggle}
                fullscreen="sm"
            >
                <div className="modal-content">
                    <ModalHeader toggle={toggle}>You Deny Seller Claim For The Follwing Reasons </ModalHeader>
                    <ModalBody>

                        <form>
                            <Row className="selectionListss">
                                <Col md={8}>
                                    <FormGroup tag="fieldset">
                                        <FormGroup check className="mb-2">
                                            <Input
                                                name="radio1"
                                                type="radio"
                                                onChange={() => handleToggleItem("radio1")}
                                            />
                                            {' '}
                                            <Label check>
                                                Disputed amount is less that Claimed by seller
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check className="mb-2">
                                            <Input
                                                name="radio1"
                                                type="radio"
                                                onChange={() => handleToggleItem("radio2")}
                                            />
                                            {' '}
                                            <Label check>
                                                Seller has not given input credit of invoice raised
                                            </Label>
                                        </FormGroup>
                                        <FormGroup
                                            check
                                            className="mb-2"
                                        >
                                            <Input
                                                name="radio1"
                                                type="radio"
                                                onChange={() => handleToggleItem("radio3")}
                                            />
                                            {' '}
                                            <Label check>
                                                Any Other Reasons
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="primary" onClick={() => handleNext()} disabled={nextBtn == true}>
                            Next
                        </Button>
                    </ModalFooter>
                </div>
            </Modal >
            <ToastContainer />
        </>
    )
}

