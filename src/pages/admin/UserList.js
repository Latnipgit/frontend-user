import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"

import { Button, Card, CardBody } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
import { latestTransaction } from "../../common/data/dashboard"
import { UserData } from "../../common/data/registration"
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

const UserList = props => {
  const [modal1, setModal1] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />
        },
      },
      {
        Header: "User ID",
        accessor: "UserId",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <UserId {...cellProps} />
        },
      },
      {
        Header: "User Name",
        accessor: "UserName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <UserName {...cellProps} />
        },
      },
      {
        Header: "Created Date",
        accessor: "Createddate",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Date {...cellProps} />
        },
      },
      {
        Header: "Email Address",
        accessor: "EmailAddress",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <EmailAddress {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "Status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Status {...cellProps} />
        },
      },
      //   {
      //     Header: "Payment Method",
      //     accessor: "paymentMethod",
      //     disableFilters: true,
      //     Cell: cellProps => {
      //       return <PaymentMethod {...cellProps} />;
      //     },
      //   },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle href="#" className="card-drop" tag="a">
                <i className="mdi mdi-dots-horizontal font-size-18" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="#" onClick={toggleViewModal}>
                  <i className="mdi mdi-eye font-size-16 text-primary me-1" />{" "}
                  View
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={() => handleProjectClick(project)}
                >
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                  Edit
                </DropdownItem>
                <DropdownItem href="#" onClick={() => onClickDelete(project)}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )
        },
      },
    ],
    []
  )

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
            data={UserData}
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
