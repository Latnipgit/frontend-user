import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"


const MembersViewModal = props => {
  const { isOpen, toggle } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>User Details</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            User id: <span className="text-primary">#SK2540</span>
          </p>
          <p className="mb-4">
            User Name: <span className="text-primary">Neal Matthews</span>
          </p>
          <p className="mb-4">
            Email Address: <span className="text-primary">NealMatthews@gmail.com</span>
          </p>
          <p className="mb-4">
            Status: <span className={"font-size-11 badge-soft-" + 
          ("Active" === "Active" ? "success" : "danger")}>Active</span>
          </p>
          <p className="mb-4">
            Contact No: <span className="text-primary">(+291)-2652652651</span>
          </p>
          {/* <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div>
                      <img src={img7} alt="" className="avatar-sm"/>
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                      <p className="text-muted mb-0">$ 225 x 1</p>
                    </div>
                  </td>
                  <td>$ 255</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div>
                      <img src={img4} alt="" className="avatar-sm"/>
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">Hoodie (Blue)</h5>
                      <p className="text-muted mb-0">$ 145 x 1</p>
                    </div>
                  </td>
                  <td>$ 145</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">Sub Total:</h6>
                  </td>
                  <td>
                    $ 400
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">Shipping:</h6>
                  </td>
                  <td>
                    Free
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">Total:</h6>
                  </td>
                  <td>
                    $ 400
                  </td>
                </tr>
              </tbody>
            </Table>
          </div> */}
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

MembersViewModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default MembersViewModal
