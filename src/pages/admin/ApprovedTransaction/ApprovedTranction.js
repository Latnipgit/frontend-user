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
import { useSelector, useDispatch } from "react-redux";

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

import { getCompanyList as ongetCompanyList} from "../../../../src/store/actions";

import TableContainer from "../../../components/Common/TableContainer";
import ApprovedTranctionModel from "./ApprovedTranModel";
import InlineFilterForm from './InlineFilterForm';
import { get } from "helpers/api_helper";
import AddCompanyModel from "./addCompanyModel"


const ApprovedTranction = props => {
  const dispatch = useDispatch();
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);
  const { toggleMenuItems } = useMenu();
  const [filteredData, setFilteredData] = useState([]);
  const [showMenuItems, setShowMenuItems] = useState(true);

 
  const handleEyeIconClick = () => {
    // toggleMenuItems();
    const newPageUrl = '/company-dashboard';
    window.location.href = newPageUrl;
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
     debugger
    const filteredResults = ApprovedTranctionData.filter(item => {
      const CompanyNameMatch =  item.CompanyName === filters.company.trim();
      const panMatch =  item.PANCARD === filters.pan.trim();
      const gstMatch =  item.GST === filters.gst.trim();
      return CompanyNameMatch || panMatch || gstMatch;
    });

  
    setFilteredData(filteredResults);
  };
  const { getCompanyList } = useSelector(state => ({
    getCompanyList: state.getCompanyList,
  }));

useEffect(()=>{
  dispatch(ongetCompanyList());
},[getCompanyList])
  const additionalValue = "Hello from additional prop!";
  return (
    <React.Fragment>
      
      {/* <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} /> */}
      <AddCompanyModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue}/>

      <InlineFilterForm onFilter={handleFilter} />
      <Card >
        <CardBody>
       
         {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

        <div>
          <Row>
            <Col md="10">
            {/* <div className="mb-1 h4 card-title mt-1">Company List</div> */}
            </Col>
            <Col md="2" className="text-right pl-2" style={{ paddingLeft:'15px'}}>
           
            <Button
              type="button"
              color="primary"
              className="btn-sm "
              onClick={()=>setModal1(true)}
            >
              Add Company
            </Button>
          
            </Col>
          </Row>
        </div>
       
          <TableContainer
            columns={columns}
            data={filteredData.length > 0 ? filteredData : ApprovedTranctionData}
            isGlobalFilter={false}
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
