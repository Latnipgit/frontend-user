import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";

import {Button,Card,CardBody, CardHeader, Label,} from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";
import Select from "react-select"
import { selectDebtorsList } from "store/debtors/debtors.selecter";
import { getAllInvoice, setIsReportDefOpen, setIsCustomerFeedbackModalOpen, addInvoiceReportDebtor, addInvoiceArray } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, selectFeedbackModalOpen, addInvoiceReportDebtorSelector, addInvoiceIdtoArray } from "store/debtors/debtors.selecter"
import { addInvoiceBill, addInvoiceBillSuccess } from '../../../store/actions'
import { useSelector, useDispatch } from "react-redux"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Disputeddata } from "../../../common/data/disputedData";
import {
    
    Col,
    InputGroup,
 
    Row,
  
    Input,
    
  } from "reactstrap";


import TableContainer from "../../../components/Common/TableContainer";
import DisputedViewModal from "./NewPaymentModel";

const DiputedBillings = props => {
  const [selectedOption, setSelectedOption] = useState("")

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }
  const customStyles = {

    control: (provided, state) => ({
      ...provided,
      background: "#FAFAFA",
      width: "300px",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? " #4da6ff" : " #80d4ff",
      // Removes weird border around container  
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? " #4da6ff" : " #80d4ff"
      }
    }),
    option: (provided, state) => ({

      // Your custom option styles here
      backgroundColor: state.isFocused ? '#80bfff' : '#FAFAFA',
      ':hover': {
        backgroundColor: '#80bfff', // Change background color on hover
      },


      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 2
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 2,
        margin: 2
      })
    }),
    // Add more styles as needed for other parts of the Select component
  };
  const handleSelectCustomer = (item) => {

    setSelectedOption(item)

  
  }
  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  function getDebtrosLists(responsData) {
    return (responsData && (
      responsData.map((item) => {
        return (
          {
            "value": item.id, "label": item.firstname + " " + item.lastname + ", " + item.companyName,
          }

        )
      })
    )
    )
  }
  const checkboxStyle = {
    border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
    borderRadius: '4px', // Optional: Add rounded corners for a nicer look
    padding: '5px', // Optional: Add padding to the checkbox
    marginRight: '5px', // Optional: Add some spacing between the checkbox and label
  };
  const [salutations, setsalutations] = useState([
    { label: "Cash", value: "Cash" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Chaque", value: "Chaque" },
    { label: "Bank Transfer", value: "Bank Transfer" },

  ])
  const GetAllDebtors = useSelector(selectDebtorsList)

  const getDebtrosList = getDebtrosLists(GetAllDebtors)
  

  return (
    <React.Fragment>
      <DisputedViewModal isOpen={modal1} toggle={toggleViewModal} />
      <Card  className="mt-5">
      
        <CardBody className="mt-5">
     <Row>
     <Col md={10} className="">
            <div className="mb-2"><h5>
          Recieved Payment
              </h5></div>

          </Col>
     </Row>

        <Row className="mt-3">
   
        </Row>
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
