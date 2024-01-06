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
import CompnayViewDetails from "./companyViewDetailsPop";

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
  DueSince,
  DueAmount
} from "./companyssearchColl";

import { getCompanyList as ongetCompanyList } from "../../../../src/store/actions";
import TableContainer from "../../../components/Common/TableContainer";
import InlineFilterForm from '../ApprovedTransaction/InlineFilterForm';
import { get } from "helpers/api_helper";
import { fetchCompanySearchStart } from "store/CompanySearch/CompanySearch.action";
import { selectCompanySearchList, selectdashboardAdminDataMap } from "store/CompanySearch/CompanySearch.selecter";


const CompanySearch = props => {
  const dispatch = useDispatch();

  const { toggleMenuItems } = useMenu();
  const [filteredData, setFilteredData] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [selected, setSelected] = useState('')
  const [showMenuItems, setShowMenuItems] = useState(true);
  console.log('showMenuItems:', showMenuItems);
  const toggleViewModal = () => setModal1(!modal1);
  const handleEyeIconClick = () => {
    const newPageUrl = '/company-dashboard';
    window.location.href = newPageUrl;
  };

  const viewModel = (value) => {
    console.log("VALUE", value)
    setModal1(true)
    setSelected(value.cell.row.original)
  }

  const selectCompanySearchLists = useSelector(selectCompanySearchList)
  const selectCompanySearchListMap = useSelector(selectdashboardAdminDataMap)
  const selectCopanySearchlistRevers = selectCompanySearchListMap.reverse()
  console.log(selectCopanySearchlistRevers);

  useEffect(() => {
    dispatch(fetchCompanySearchStart())
  }, [])


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
        Header: "Due Form",
        accessor: "DueSince",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSince {...cellProps} />;
        },
      },
      {
        Header: "Due Amount",
        accessor: "amoutnDue",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "Rating",
        accessor: "rating",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">
              <div className="d-flex flex-column align-items-center me-3" style={{ cursor: 'pointer' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => viewModel(cellProps)}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  const handleFilter = (filters) => {

    const filteredResults = selectCopanySearchlistRevers.filter(item => {
      const CompanyNameMatch = item.CompanyName === filters.company.trim();
      const panMatch = item.PANCARD === filters.pan.trim();
      const gstMatch = item.GST === filters.gst.trim();
      return CompanyNameMatch || panMatch || gstMatch;
    });
    console.log("filteredResults", filteredResults)

    setFilteredData(filteredResults);
  };
  const { getCompanyList } = useSelector(state => ({
    getCompanyList: state.getCompanyList,
  }));
  useEffect(() => {
    dispatch(ongetCompanyList());
    console.log("HDHDHDHD", getCompanyList)
  }, [getCompanyList])
  const additionalValue = "Hello from additional prop!";
  return (
    <React.Fragment>
      <CompnayViewDetails isOpen={modal1} toggle={toggleViewModal} selected={selected} />
      {/* <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue}/> */}

      <InlineFilterForm onFilter={handleFilter} />
      <Card >
        <CardBody>

          {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

          {/* <div>
          <Row>
            <Col md="10">
            
            </Col>
            <Col md="2" className="text-right pl-2" style={{ paddingLeft:'15px'}}>
            <Link to="/add-company">
            <Button
              type="button"
              color="primary"
              className="btn-sm "
            >
              Add Company
            </Button>
            </Link>
            </Col>
          </Row>
        </div> */}

          <TableContainer
            columns={columns}
            data={filteredData.length > 0 ? filteredData : selectCopanySearchlistRevers}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={20}
          />
        </CardBody>
      </Card>

    </React.Fragment>
  );
};

CompanySearch.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(CompanySearch);
