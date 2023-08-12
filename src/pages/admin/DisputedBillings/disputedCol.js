import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';



const dateFormat = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const SrNo = (cell) => {
    return cell.value ? cell.value : '';
};

const Creditor = (cell) => {
    return cell.value ? cell.value : '';
};
const Debtor = (cell) => {
    return cell.value ? cell.value : '';
};
const InvoiceNo = (cell) => {

    const invoiceNumber = cell.value || '';

    // Function to handle the click event on the icon
    const handleIconClick = () => {
        // Add your functionality here when the icon is clicked
        console.log('Icon clicked!');
        // For example, you could open a modal, trigger an action, etc.
    };

    return (
        <div>
            <span>{invoiceNumber}</span>{" "}
            <i className="mdi mdi-eye font-size-16 text-primary me-1" onClick={handleIconClick} />{" "}
        </div>
    );
};
const DueAmount = (cell) => {
    return cell.value ? cell.value : '';
};

export {
    CheckBox,
    SrNo,
    Debtor,
    Creditor,
    DueAmount,
    InvoiceNo,
};