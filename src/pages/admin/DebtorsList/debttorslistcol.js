import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';


const SrNo = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};
const CustomerName = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};
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

const PhoneNumber = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};


const JoinedOn = (cell) => {
    return cell.value ? cell.value : '';
};

const EmailID = (cell) => {
    return cell.value ? cell.value : '';
};
const CompanyName = (cell) => {
    return cell.value ? cell.value : '';
};
const daysSinceReference = (cellValue, referenceDate) => {
    if (cellValue) {
        const currentDate = new Date(cellValue);
        const timeDifference = referenceDate-currentDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }
    return '';
};

const DueSince = (cell) => {
          
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date
    
    const daysSince = daysSinceReference(cell.value, today);
    console.log(daysSince);
    
    let badgeClassName = "font-size-11 badge ";
    if (daysSince > 1 && daysSince < 800) {
        badgeClassName += "bg-success text-white";
    } else if (daysSince > 800) {
        badgeClassName += "bg-warning text-dark";
    } else {
        badgeClassName += "bg-danger text-white";
    }
    const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const divStyle = {
        padding: '3px' // Adjust the padding value as needed
    };

    return (
        <span className={badgeClassName}>
            <div style={divStyle}>({daysSince} days)</div>
            <div style={divStyle}>{formattedDate}</div>
        </span>
    );
};
const DueAmount= (cell) => {
    return cell.value ? cell.value : '';
};
const Status = (cell) => {
    return (
        <Badge
          className={"font-size-11 badge-soft-" + 
          (cell.value === "Active" ? "success" : "danger")}          
        >
          {cell.value}
        </Badge>
    )
};
const PaymentMethod = (cell) => {
    return (
        <span>
        <i
        className={
          (cell.value === "Paypal" ? "fab fa-cc-paypal me-1" : "" || 
          cell.value === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
          cell.value === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
          cell.value === "Visa" ? "fab fa-cc-visa me-1" : ""
          )}
          />{" "}
            {cell.value}
        </span>
    )
};
export {
    CheckBox,
    SrNo,
    EmailID,
    Status,
    CustomerName,
    CompanyName,
    JoinedOn,
    PhoneNumber,
    PaymentMethod,
    DueAmount,
    DueSince
};