import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { ApprovedTranctionData } from "../../../common/data/approvedTransactions";
import {
    Badge,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
  } from "reactstrap";
import {
  CheckBox,
  SrNo,
  Debtor,
  Creditor,
  DueAmount,
  InvoiceNo,
} from "./ApprovedTransactionCol";

import TableContainer from "../../../components/Common/TableContainer";
import ApprovedTranctionModel from "./ApprovedTranModel";

const ApprovedTranction = props => {


  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);
  const InlineFilterForm = ({ onFilter }) => {
    const [filters, setFilters] = useState({
      aadhar: '',
      pan: '',
      gst: '',
    });
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onFilter(filters);
    };
  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <SrNo {...cellProps} />;
        },
      },
      {
        Header: "Debtor",
        accessor: "Debtor",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Debtor {...cellProps} />;
        },
      },
      {
        Header: "Creditor",
        accessor: "Creditor",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Creditor {...cellProps} />;
        },
      },
      {
        Header: "Due Amount",
        accessor: "DueAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "InvoiceNo",
        accessor: "InvoiceNo",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <InvoiceNo {...cellProps} />;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="action-icons">
              <a href="#" onClick={toggleViewModal}>
                <i className="mdi mdi-eye font-size-18 text-primary me-2" />
              </a>
              <a href="#" onClick={() => handleProjectClick(project)}>
                <i className="mdi mdi-pencil font-size-18 text-success me-2" />
              </a>
              <a href="#" onClick={() => onClickDelete(project)}>
                <i className="mdi mdi-trash-can font-size-18 text-danger me-2" />
              </a>
            </div>
          );
        },
      },
      
    ],
    []
  );


  return (
    <React.Fragment>
      <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} />
      <form onSubmit={handleSubmit} className="inline-filter-form">
      <label>
        Aadhar Card Number:
        <input
          type="text"
          name="aadhar"
          value={filters.aadhar}
          onChange={handleInputChange}
        />
      </label>
      <label>
        PAN Card Number:
        <input
          type="text"
          name="pan"
          value={filters.pan}
          onChange={handleInputChange}
        />
      </label>
      <label>
        GST Number:
        <input
          type="text"
          name="gst"
          value={filters.gst}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Filter</button>
      </form>
      <Card>
        <CardBody>
        <Button type="button" color="primary" className="btn-sm btn-rounded float-left-button" onClick={toggleViewModal}>
          <i className="mdi mdi-eye font-size-16 text-primary me-1" />
          View Details
          </Button>
          <div className="mb-4 h4 card-title"></div>
          <div className="mb-4 h4 card-title">Company Search List</div>
          <TableContainer
            columns={columns}
            data={ApprovedTranctionData}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
}

ApprovedTranction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(ApprovedTranction);
