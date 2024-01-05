import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setCACertificateOpen } from "../../../store/debtors/debtors.actions"
import { selectCACertificateOpen } from "store/debtors/debtors.selecter"

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


const UploadCACertificateModel = props => {
  const { isOpen, toggle, } = props
  const dispatch = useDispatch();
  const selectCACertificate = useSelector(selectCACertificateOpen);

  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
  const handleFileChange = () => {

  }

  return (
    <Modal
      isOpen={selectCACertificate}
      role="dialog"
      size="md"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
    >
      <div className="modal-content">
        <ModalHeader toggle={() => toggleViewModal2()}>Upload CA Certificate</ModalHeader>

        <ModalBody>
          <Row className="mt-4 mb-4">
            <Col md={3}></Col>
            <Col md={6}>


              <InputGroup className="text-capitalize">
                <input
                  type="file"
                  className="form-control"
                  id="uploadPurchaseOrder"
                  accept=".pdf, .doc, .docx, .txt"
                  aria-describedby="fileUploadHelp"
                  onChange={e =>
                    handleFileChange(e)
                  }
                />
              </InputGroup>

              <div id="fileUploadHelp" className="form-text">
                Choose a file to upload (PDF, DOC, DOCX, TXT).
              </div>

            </Col>
            <Col md={3}></Col>
          </Row>

        </ModalBody>
      </div>
    </Modal>
  )
}

UploadCACertificateModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadCACertificateModel
