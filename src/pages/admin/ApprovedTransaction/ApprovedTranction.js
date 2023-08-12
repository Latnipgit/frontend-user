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
    PANCARD,
    AADHAR,
    GST,
    CompanyName,
} from "./ApprovedTransactionCol";

import TableContainer from "../../../components/Common/TableContainer";
import ApprovedTranctionModel from "./ApprovedTranModel";
import InlineFilterForm from './InlineFilterForm';

const ApprovedTranction = props => {

  const [filteredData, setFilteredData] = useState([]);
  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

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
        Header: "Company Name",
        accessor: "CompanyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "Pan Card",
        accessor: "PANCARD",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PANCARD {...cellProps} />;
        },
      },
      {
        Header: "Aadhaar Number",
        accessor: "AADHAR",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <AADHAR {...cellProps} />;
        },
      },
      {
        Header: "GST Number",
        accessor: "GST",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GST {...cellProps} />;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="card-drop">
            <i className="mdi mdi-eye font-size-16 text-primary me-1" onClick={toggleViewModal} />
            <i className="mdi mdi-pencil font-size-16 text-success me-1" onClick={() => handleProjectClick(project)} />
            <i className="mdi mdi-trash-can font-size-16 text-danger me-1" onClick={() => onClickDelete(project)} />
            </div>
          );
        },
      },
    ],
    []
  );
  const handleFilter = (filters) => {
    debugger
    const filteredResults = ApprovedTranctionData.filter(item => {
      const aadharMatch =  item.AADHAR === filters.aadhar.trim();
      const panMatch =  item.PANCARD === filters.pan.trim();
      const gstMatch =  item.GST === filters.gst.trim();
      return aadharMatch || panMatch || gstMatch;
    });
  
    setFilteredData(filteredResults);
  };

  return (
    <React.Fragment>
      <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} />
      <Button type="button" color="primary" className="btn-sm btn-rounded float-left-button" onClick={toggleViewModal}>
          <i className="mdi mdi-eye font-size-16 text-primary me-1" />
          View Details
          </Button>
      <InlineFilterForm onFilter={handleFilter} />
      <Card>
        <CardBody>
       
          <div className="mb-4 h4 card-title">Company List</div>
          <TableContainer
            columns={columns}
            data={filteredData.length > 0 ? filteredData : ApprovedTranctionData}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

ApprovedTranction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(ApprovedTranction);
