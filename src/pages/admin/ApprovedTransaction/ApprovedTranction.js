import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { Link, redirect } from 'react-router-dom';
import SidebarContent from '../../../components/VerticalLayout/SidebarContent';
import { useMenu } from '../../../components/VerticalLayout/MenuContext';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  label
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
import { searchCompany as onsearchCompany} from "../../../../src/store/actions";

import TableContainer from "../../../components/Common/TableContainer";
import ApprovedTranctionModel from "./ApprovedTranModel";
import InlineFilterForm from './InlineFilterForm';
import { get } from "helpers/api_helper";
import AddCompanyModel from "./addCompanyModel"
import index from "pages/Dashboard-Blog";


const ApprovedTranction = props => {
  const dispatch = useDispatch();
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);
  const { toggleMenuItems } = useMenu();
  const [filteredData, setFilteredData] = useState([]);
  const [showMenuItems, setShowMenuItems] = useState(true);

 
  const handleEyeIconClick = (item) => {
    console.log("ITEMSS", item)
    // toggleMenuItems();
    // dispatch(onsearchCompany(item.id));
    localStorage.setItem("COMPANY-ID",item.id )
    const newPageUrl = '/company-dashboard';
    window.location.href = newPageUrl;
  };
  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        // accessor: "SrNo",
        filterable: false,
        disableFilters: true,
       Cell: (index,i)=>{
return <span>

{index.data.length - index.row.index}
</span>
      }
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <Link to="/company-dashboard"> <div
              className="company-name-cell"
              onClick={() => handleEyeIconClick(cellProps.row.original)}
              style={{ cursor: 'pointer' }}
            >
              {cellProps.value}
            </div>
            </Link>
          );
        },
      },
      {
        Header: "Pan Card",
        accessor: "companyPan",
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
        accessor: "gstin",
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
      
    const filteredResults = getCompanyList.filter(item => {
      const CompanyNameMatch =  item.CompanyName === filters.company.trim();
      const panMatch =  item.PANCARD === filters.pan.trim();
      const gstMatch =  item.GST === filters.gst.trim();
      console.log("FILTER",CompanyNameMatch, panMatch,gstMatch )

      return CompanyNameMatch || panMatch || gstMatch;
    });

  
    setFilteredData(filteredResults);
  };
  const { getCompanyList } = useSelector(state => 
     ({
    getCompanyList: state.companyList.companyList != undefined && state.companyList.companyList.length != 0 ? state.companyList.companyList.data.response:[],
  })
  );

useEffect(()=>{
  dispatch(ongetCompanyList());
  console.log("COMPNYLSIT", getCompanyList)
},[])
  return (
    <React.Fragment>
      
      {/* <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} /> */}
      <AddCompanyModel isOpen={modal1} toggle={toggleViewModal} getCompanyList={getCompanyList}/>

      {/* <InlineFilterForm onFilter={handleFilter} /> */}
      <br/>
      <br/>
      <br/>
      <Card  style={{ marginTop:'5%'}}>
        

    
        <CardBody>
       
         {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

        <div>
          <Row>
          <h5 >My Companies</h5>

          </Row>
          <Row>
            <Col md="10">
            
            </Col>
            <Col md="2" className="text-right pl-2" >
           
            <Button
              type="button"
              color="primary"
              className="btn-md mt-3 "
              onClick={()=>setModal1(true)}
            >
             + Add Company
            </Button>
          
            </Col>
          </Row>
        </div>
       <div style={{ marginTop:'-35px'}}>
       <TableContainer
            columns={columns}
            data={getCompanyList.length > 0 ? getCompanyList : []}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={20}
          />
       </div>
        
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
