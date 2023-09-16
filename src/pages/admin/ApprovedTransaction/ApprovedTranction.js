import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';
import SidebarContent from '../../../components/VerticalLayout/SidebarContent';
import { useMenu } from '../../../components/VerticalLayout/MenuContext';
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
  const { toggleMenuItems } = useMenu();
  const [filteredData, setFilteredData] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(true);
  console.log('showMenuItems:', showMenuItems);
  const toggleViewModal = () => setModal1(!modal1);
  const handleEyeIconClick = () => {
    // toggleMenuItems();
    const newPageUrl = '/company-dashboard';
    window.location.href = newPageUrl;
  };
  const columns = useMemo(
    () => [
      // {
      //   Header: "Sr No",
      //   accessor: "SrNo",
      //   filterable: false,
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <SrNo {...cellProps} />;
      //   },
      // },
      {
        Header: "Company Name",
        accessor: "CompanyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div
              className="company-name-cell"
              onClick={() => handleEyeIconClick(cellProps.row.original)}
              style={{ cursor: 'pointer' }}
            >
              {cellProps.value}
            </div>
          );
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
      // {
      //   Header: "Aadhaar Number",
      //   accessor: "AADHAR",
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: cellProps => {
      //     return <AADHAR {...cellProps} />;
      //   },
      // },
      {
        Header: "GST Number",
        accessor: "GST",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GST {...cellProps} />;
        },
      },
      // {
      //   Header: "Action",
      //   disableFilters: true,
      //   accessor: "view",
      //   Cell: cellProps => {
      //     return (
      //       <div className="d-flex">
      //             <div className="d-flex flex-column align-items-center me-3" style={{ cursor: 'pointer' }}>
      //               <i className="mdi mdi-eye font-size-16 text-primary me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"  onClick={handleEyeIconClick}/>
      //             </div>
      //             <div className="d-flex flex-column align-items-center me-3"  style={{ cursor: 'pointer' }}>
      //               <i className="mdi mdi-pencil font-size-16 text-success me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" />
      //             </div>
              
      //                 <div className="d-flex flex-column align-items-center" style={{ cursor: 'pointer' }}>
      //                     <i className="mdi mdi-trash-can font-size-16 text-danger me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="delete" />
      //                 </div>
      //           </div>
      //     );
      //   },
      // },
    ],
    []
  );
  const handleFilter = (filters) => {
     
    const filteredResults = ApprovedTranctionData.filter(item => {
      const aadharMatch =  item.AADHAR === filters.aadhar.trim();
      const panMatch =  item.PANCARD === filters.pan.trim();
      const gstMatch =  item.GST === filters.gst.trim();
      return aadharMatch || panMatch || gstMatch;
    });
  
    setFilteredData(filteredResults);
  };
  const additionalValue = "Hello from additional prop!";
  return (
    <React.Fragment>
      
      <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue}/>
   
      <InlineFilterForm onFilter={handleFilter} />
      <Card >
        <CardBody>
       
         {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
            {/* <div className="mb-4 h4 card-title mt-5">Company List</div>
            <Link to="/add-company">
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
            >
              Add Company
            </Button>
            </Link>
          </div> */}
          <TableContainer
            columns={columns}
            data={filteredData.length > 0 ? filteredData : ApprovedTranctionData}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
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
