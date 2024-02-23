import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import 'react-table-6/react-table.css'
import { AddcustomerFomr } from "./addCustomerForm"
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,

} from "reactstrap"

import TableContainer from "components/Common/TableContainer"

import { useDispatch, useSelector } from "react-redux";
import { getAllDebtors } from "../../../store/debtors/debtors.actions"
import { selectDebtorsList, selectDebtorsListMap } from "store/debtors/debtors.selecter"
import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter"
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import { SelectAddCustomerList } from "store/actions"



const AddCustomer = props => {

  const [getDaysArray, setgetDaysArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));

  const GetAllDebtors = useSelector(selectDebtorsList)
  const GetAllDebtorsMap = useSelector(selectDebtorsListMap)
  /*   const selectNewCustomerList = useSelector(SelectAddCustomerList) */

  /*   let GetAllDebtors
    if (selectNewCustomerList.length > 0) {
      GetAllDebtors = [...selectGetAllDebtors, ...selectNewCustomerList]
    } else {
      GetAllDebtors = selectGetAllDebtors
    } */


  useEffect(() => {
    dispatch(getAllDebtors());
    setFilteredData(GetAllDebtorsMap)
  }, [])



  const handleFilterdata = (filters) => {
    if (GetAllDebtorsMap.length > 0) {
      const filteredResults = GetAllDebtorsMap.filter(item => {
        const fullname = item.customerName.toLocaleLowerCase()
        return fullname.toLocaleLowerCase().includes(filters);
      });
      setFilteredData(filteredResults);
    }

  };

  const CompanyName = (cell) => {
    console.log("CompanyNameCompanyName", cell.value)
    return cell.value ? cell.value : '';
  };

  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "CUSTOMER NAME",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "COMPANY NAME",
        accessor: "companyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "ADDRESS",
        accessor: "address",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "GST NUMBER",
        accessor: "gstin",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "MOBILE NUMBER",
        accessor: "customerMobile",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "EMAIL",
        accessor: "customerEmail",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
    ],
    []
  );


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />
          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Customer List</h5>
            </Col>
            <Col md={2}>
              <Button className="btn btn-md btn-info" onClick={() => toggleAddCustomer()}>Add New Customer</Button>
            </Col>
          </Row>
          {GetAllDebtorsMap != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Customer"} /> : ""}
          <Row className="p-4  ml-5">
            <TableContainer
              columns={columns}
              data={filteredData.length > 0 ? filteredData : GetAllDebtorsMap}
              isGlobalFilter={false}
              isAddOptions={false}
              customPageSize={20}
            />
          </Row>
        </CardBody>
      </Card>
      {isAddCustomerOpen && <AddcustomerFomr />}
    </React.Fragment>
  );
}


export default withRouter(AddCustomer)
