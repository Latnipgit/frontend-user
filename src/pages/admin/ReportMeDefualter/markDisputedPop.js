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
    Row, Col
} from "reactstrap"
import 'react-datepicker/dist/react-datepicker.css';
import { MarkOtherReasonModel } from "./markOtherReason";
// import axios from "axios";


export const MarkDisputedPopModule = props => {
    const { isOpen, toggle, selected, markedDisputed, currentindex } = props

    const [otherReason, setOtherReason] = useState(false)

    const OtherReasonOpen = () => {
        setOtherReason(!otherReason)
    }
    return (
        <>
            <MarkOtherReasonModel isOpen={otherReason} toggle={OtherReasonOpen} />
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
                    <ModalHeader toggle={toggle}>Mark As A Disputed Transaction</ModalHeader>
                    <ModalBody>
                        <Col className="d-flex justify-content-around">
                            <Button type="button" color="primary" onClick={() => markedDisputed(currentindex)}>
                                Record Payment
                            </Button>
                            <Button type="button" color="primary" onClick={() => OtherReasonOpen()}>
                                Other reasons
                            </Button>
                        </Col>

                    </ModalBody>
                </div>
            </Modal>
        </>
    )
}

