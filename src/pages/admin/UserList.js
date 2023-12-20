import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"

import { Button, Card, CardBody } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
import { latestTransaction } from "../../common/data/dashboard"
import { UserData } from "../../common/data/registration"
import { getAllDebtors} from '../../store/debtors/debtors.actions'
import { useSelector, useDispatch } from "react-redux"
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';

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
} from "reactstrap"
import {
  UserId,
  UserName,
  Date,
  EmailAddress,
  Status,
  PaymentMethod,
} from "./registrationCol"

import TableContainer from "../../components/Common/TableContainer"
import UserViewModal from "./UserViewModal"
import { selectDebtorsList } from "../../store/debtors/debtors.selecter";

const UserList = props => {
  const [modal1, setModal1] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)

  const columns = useMemo(
    () => [
     
      {
        Header: "Company Name",
        accessor: "companyName",
        filterable: false,
        className:"text-uppercase",
        disableFilters: true,
       
      },
      {
        Header: "Company Email",
        accessor: "customerEmail",
        disableFilters: true,
        filterable: false,
        
      },
      {
        Header: "Gst Number",
        accessor: "gstin",
        disableFilters: true,
        filterable: false,
     
      },
      {
        Header: "User Id",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          var id = cellProps.row.original.creditorCompanyId
          return <div className="text-uppercase">
         {"BAF - "}   
         {id.substring(id.length - 5)}
          </div>
        },
      },
      {
        Header: "Mobile Number",
        accessor: "customerMobile",
        disableFilters: true,
        filterable: false,
        
      },
     
      {
        Header: "Address",
        disableFilters: true,
        accessor: "view",
        // Cell: cellProps => {
        //   return (
        //     <UncontrolledDropdown>
        //       <DropdownToggle href="#" className="card-drop" tag="a">
        //         <i className="mdi mdi-dots-horizontal font-size-18" />
        //       </DropdownToggle>
        //       <DropdownMenu className="dropdown-menu-end">
        //         <DropdownItem href="#" onClick={toggleViewModal}>
        //           <i className="mdi mdi-eye font-size-16 text-primary me-1" />{" "}
        //           View
        //         </DropdownItem>
        //         <DropdownItem
        //           href="#"
        //           onClick={() => handleProjectClick(project)}
        //         >
        //           <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
        //           Edit
        //         </DropdownItem>
        //         <DropdownItem href="#" onClick={() => onClickDelete(project)}>
        //           <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
        //           Delete
        //         </DropdownItem>
        //       </DropdownMenu>
        //     </UncontrolledDropdown>
        //   )
        // },
        Cell: cellProps => {
          
          return <div className="text-capitalize d-flex">
      {cellProps.row.original.address1},<br/> {cellProps.row.original.address2}, {cellProps.row.original.city}
          </div>
        },
      },
    ],
    []
  )


  const GetAllDebtors = useSelector(selectDebtorsList)
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(getAllDebtors());
   }, [])

  return (
    <React.Fragment>
      <UserViewModal isOpen={modal1} toggle={toggleViewModal} />
      <Card>
        <CardBody>
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded float-left-button"
            onClick={toggleViewModal}
          >
            <i className="mdi mdi-eye font-size-16 text-primary me-1" />
            View Details
          </Button>
          <div className="mb-4 h4 card-title"></div>
          <div className="mb-4 h4 card-title"> Bad debtors List</div>
          <TableContainer
            columns={columns}
            data={GetAllDebtors}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />

        </CardBody>
      </Card>
    </React.Fragment>
  )
}

UserList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(UserList)
