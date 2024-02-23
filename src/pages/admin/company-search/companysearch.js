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
  DueAmount,
  Reating
} from "./companyssearchColl";

import { getCompanyList as ongetCompanyList } from "../../../../src/store/actions";
import TableContainer from "../../../components/Common/TableContainer";
import InlineFilterForm from '../ApprovedTransaction/InlineFilterForm';
import { get } from "helpers/api_helper";
import { fetchCompanySearchStart, getAllCompanyListAction } from "store/CompanySearch/CompanySearch.action";
import { selectCompanySearchList, selectdashboardAdminDataMap, getAllCompanyListSelector, selectCompanySearchLoder } from "store/CompanySearch/CompanySearch.selecter";
import { fetchCompanySearchViewDatatlStart } from "store/CompanySearchView/CompanySearchView.action";
import { selectCompanySearchVeiwDatilsList } from "store/CompanySearchView/CompanySearchView.selecter";
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";
import companyList from "store/company/Company.reducer";

import { Spinner } from "../spinner/spinner";

const CompanySearch = props => {
  const dispatch = useDispatch();

  const { toggleMenuItems } = useMenu();
  const [filteredData, setFilteredData] = useState([]);
  const [currenViewList, setCurrenViewList] = useState([])
  const [modal1, setModal1] = useState(false);
  const [selected, setSelected] = useState('')
  const [showMenuItems, setShowMenuItems] = useState(true);
  const toggleViewModal = () => setModal1(!modal1);
  const handleEyeIconClick = () => {
    const newPageUrl = '/company-dashboard';
    // window.location.href = newPageUrl;
  };

  const CompanySearchLoder = useSelector(selectCompanySearchLoder)

  const selectCompanySearchLists = useSelector(selectCompanySearchList)
  // const getAllCompanyList = useSelector(getAllCompanyListSelector)
  const selectCompanySearchListMap = useSelector(selectdashboardAdminDataMap)
  const currentUserViewDetails = useSelector(selectCompanySearchVeiwDatilsList)

  const { CompanyList } = useSelector((state) => ({
    CompanyList: state.CompanySearchReducer.companySearchList != undefined ? state.CompanySearchReducer.companySearchList : [],

  }));

  const viewModel = (value) => {

    const valueDate = value.cell.row.original
    dispatch(fetchCompanySearchViewDatatlStart({ "debtorId": `${valueDate.id}` }))
    openViewModule(valueDate)
  }

  function openViewModule(value) {
    setModal1(true)
    setSelected(value)

  }


  useEffect(() => {
    dispatch(fetchCompanySearchStart({
      "companyName": "",
      "companyPan": "",
      "gstin": ""
    }))
    // dispatch(getAllCompanyListAction())
    //  setCurrenViewList(currentUserViewDetails)
  }, [])




  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <div
            className="company-name-cell"
            style={{ cursor: 'pointer' }}
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;
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
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSince {...cellProps} />;
        },
      },
      {
        Header: "Due Amount",
        accessor: "totalAmount",
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
          return <Reating {...cellProps} />;
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
    const filtereCompany = selectCompanySearchListMap.filter(item => item.CompanyName.toLocaleLowerCase().includes(filters.company.toLocaleLowerCase()));

    const filteredgstMatch = filtereCompany.filter(item => item.GST.toLocaleLowerCase().includes(filters.gst.toLocaleLowerCase()));

    const filterePANCARD = filteredgstMatch.filter(item => item.PANCARD.toLocaleLowerCase().includes(filters.pan.toLocaleLowerCase()));

    setFilteredData(filterePANCARD);
  };

  debugger
  return (
    <React.Fragment>
      {CompanySearchLoder == false ? <Spinner /> : (<>
        <CompnayViewDetails isOpen={modal1} toggle={toggleViewModal} selected={selected} currenViewList={currentUserViewDetails} selectCompanySearchListMap={selectCompanySearchLists} />
        <InlineFilterForm onFilter={handleFilter} handleFilter={handleFilter} />
        <Card >
          <CardBody>
            <TableContainer
              columns={columns}
              data={filteredData.length > 0 ? filteredData : selectCompanySearchListMap}
              isGlobalFilter={false}
              isAddOptions={false}
              customPageSize={10}
            />
          </CardBody>
        </Card></>
      )}


    </React.Fragment>
  );
};

CompanySearch.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(CompanySearch);
