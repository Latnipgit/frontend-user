import FileGallery  from "./Gallarry";

  import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Table,
} from "reactstrap";


const Document = props => {
  

  return (
    <React.Fragment>
     <FileGallery></FileGallery>   
     </React.Fragment>
  );
};

Document.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(Document);
