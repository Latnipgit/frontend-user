import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,
  Table,
} from "reactstrap";
// import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { getOrders as onGetOrders } from "store/actions";

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import InvoiceModal from "./InvoicePopupModal";
// import ConfirmModal from "./ConfirmRefertoSeio";
import { latestTransaction } from "../../common/data/dashboard";

import {
  OrderId,
  BillingName,
  DueSince,
  Total,
  PaymentStatus,
  PaymentMethod,
  Status
} from "./LatestTranactionCol";

import TableContainer from "../../components/Common/TableContainer";

const LatestTranaction = props => {
  const [showReferModal, setShowReferModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showInProcessModal, setShowInProcessModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const handleReferClick = () => {setShowReferModal(true)};
  const handleConfirmRefer = () => {
    if (selectedLevel) {
      // Handle refer logic here
      console.log("Referring to senior with level:", selectedLevel);
      setSelectedLevel(''); // Reset the selected level
      setShowReferModal(false);
    }
  };
  const handleCancelRefer = () => {
    setSelectedLevel(''); // Reset the selected level
    setShowReferModal(false);
  };
  
  const toggleViewModal = () => setModal1(!modal1);
  const handleApproveClick = () => {setShowApproveModal(true)};
  const handleInProcessClick = () => {setShowInProcessModal(true)};
  const handleConfirmApprove = () => {setShowApproveModal(false)};
  const handleConfirmInProcess = () => {setShowInProcessModal(false)};
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const isReferDisabled = selectedLevel === '';
  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        Header: "Reference No.",
        accessor: "orderId",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />;
        },
      },
      {
        Header: "Buyer Name",
        accessor: "billingName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <BillingName {...cellProps} />;
        },
      },
      {
        Header: "Seller Name",
        accessor: "paymentMethod",
        disableFilters: true,
        Cell: cellProps => {
          return <PaymentMethod {...cellProps} />;
        },
      },
      {
        Header: "Amount",
        accessor: "total",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Total {...cellProps} />;
        },
      },
      {
        Header: "Due Since",
        accessor: "orderdate",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSince {...cellProps} />;
        },
      },
      
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "Status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Status {...cellProps} />;
        },
      },
    
      {
        Header: "View Details",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>
          );
        },
      },
     
      // {
      //   Header: "Action",
      //   disableFilters: true,
      //   accessor: "project",
      //   Cell: cellProps => {
      //     return (
      //       <div className="d-flex">
      //       <div className="d-flex flex-column align-items-center me-3" onClick={handleApproveClick} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-check-circle font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve" />
      //       </div>
      //       <div className="d-flex flex-column align-items-center me-3" onClick={handleInProcessClick} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-progress-clock font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="In Process" />
      //       </div>
        
      //           <div className="d-flex flex-column align-items-center" style={{ cursor: 'pointer' }}>
      //               <i className="mdi mdi-account-supervisor font-size-18 text-warning mb-1" onClick={handleReferClick} />
      //           </div>
      //     </div>
          
      //     );
      //   },
      // },
    ],
    []
  );


  return (
    <React.Fragment>
      <InvoiceModal isOpen={modal1} toggle={toggleViewModal} />
      {/* <ConfirmModal isOpen={isModalOpen} toggle={toggleModal} /> */}
      <Modal isOpen={showReferModal} toggle={() => setShowReferModal(false)}>
        <ModalHeader toggle={() => setShowReferModal(false)}>Confirm Asclation</ModalHeader>
        <ModalBody>
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
            {selectedLevel ? selectedLevel : 'Select Level'} <span className="caret"></span>

            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setSelectedLevel('L1')}>L1</DropdownItem>
              <DropdownItem onClick={() => setSelectedLevel('L2')}>L2</DropdownItem>
              <DropdownItem onClick={() => setSelectedLevel('L3')}>L3</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <p>Asclation: Please select the level you want to refer this transaction to.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCancelRefer}>Cancel</Button>
          <Button color="danger" onClick={handleConfirmRefer} disabled={isReferDisabled}>Refer</Button>
        </ModalFooter>
      </Modal>

      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Latest Transaction</div>
          <TableContainer
            columns={columns}
            data={latestTransaction}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
          />
        </CardBody>
      </Card>
<Modal isOpen={showApproveModal} toggle={() => setShowApproveModal(false)}>
<ModalHeader toggle={() => setShowApproveModal(false)}>Confirm Approval</ModalHeader>
<ModalBody>
    Are you sure you want to approve this bill?
</ModalBody>
<ModalFooter>
    <Button color="secondary" onClick={() => setShowApproveModal(false)}>Cancel</Button>
    <Button color="success" onClick={handleConfirmApprove}>Approve</Button>
</ModalFooter>
</Modal>
<Modal isOpen={showInProcessModal} toggle={() => setShowInProcessModal(false)}>
<ModalHeader toggle={() => setShowInProcessModal(false)}>Confirm In Process</ModalHeader>
<ModalBody>
Are you sure you want to mark this as in process?
</ModalBody>
<ModalFooter>
<Button color="secondary" onClick={() => setShowInProcessModal(false)}>Cancel</Button>
<Button color="info" onClick={handleConfirmInProcess}>In Process</Button>
</ModalFooter>
</Modal>
  </React.Fragment>
  );
};

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(LatestTranaction);
