import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from 'react-redux'
import {getRequestEdit} from "../../../store/debtors/debtors.actions"
import {getRequestEditSelector } from "store/debtors/debtors.selecter"
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Row, Col
} from "reactstrap"
import { ToastContainer, toast } from "react-toastify"


const RequestEditMessageModal = props => {
    const { isOpen, toggle, requestedData } = props

    // const getRequestEditaa = useSelector(getRequestEditSelector)
    console.log("getRequestEdit",requestedData)

    const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(getRequestEdit)

    },[])


    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            size="xs"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Request Edit</ModalHeader>

                <ModalBody>
                    {requestedData.status != "DRAFT"?<div>
                    <p>
                        You will be notified when you are given access to edit the documents by email.
                        For any queries please reach out to us on <a className="text-info">support@anandrishi.com</a>.
                        <br />
                        Please note the access will be available to you only for a period of 7 days
                        during which your post status will be under process.
                    </p>
                    </div>:""}
                </ModalBody>
            </div>
            <ToastContainer />
        </Modal>
    )
}

RequestEditMessageModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default RequestEditMessageModal
