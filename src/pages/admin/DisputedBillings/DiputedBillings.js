import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";

import {Button,Card,CardBody,} from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";
import { Disputeddata } from "../../../common/data/disputedData";
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
} from "./disputedCol";

import TableContainer from "../../../components/Common/TableContainer";
import DisputedViewModal from "./NewPaymentModel";

const DiputedBillings = props => {


  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  const columns = useMemo(
    () => [
    
    
      {
        Header: "Date",
        disableFilters: true,
        filterable: false,
      
      },
      {
        Header: "Payment #",
        disableFilters: true,
        filterable: false,
      
      },
      {
        Header: "Refrence Number",
        // accessor: "DueAmount",
        disableFilters: true,
        filterable: false,
       
      },
      {
        Header: "Customer Name",
        disableFilters: true,
        filterable: false,
      
      },
      {
        Header: "Invoice #",
        disableFilters: true,

        
      },
      {
        Header: "Mode",
        disableFilters: true,

        
      },
      {
        Header: "Amount",
        disableFilters: true,

        
      },
      {
        Header: "Unused Amount",
        disableFilters: true,

        
      },
    ],
    []
  );


  return (
    <React.Fragment>
      <DisputedViewModal isOpen={modal1} toggle={toggleViewModal} />
      <Card>
        <CardBody>
        <Button type="button" color="primary" className="btn-sm btn-rounded float-left-button" onClick={toggleViewModal}>
          <i className="mdi mdi-eye font-size-16 text-primary me-1" />
          View Details
          </Button>
          <div className="mb-4 h4 card-title"></div>
          <div className="mb-4 h4 card-title">Disputed List</div>
          <div>
            <Button onClick={()=>setModal1(true)}>+ New</Button>
          </div>
          <TableContainer
            columns={columns}
            data={Disputeddata}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

DiputedBillings.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(DiputedBillings);
