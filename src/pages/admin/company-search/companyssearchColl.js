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

const DueAmount= (cell) => {
    return cell.value ? cell.value : '';
};

const SrNo = (cell) => {
    return cell.value ? cell.value : '';
};

const CompanyName = (cell) => {
    return cell.value ? cell.value : '';
};
const GST = (cell) => {
    return cell.value ? cell.value : '';
};
const AADHAR = (cell) => {
    return cell.value ? cell.value : '';
};
const PANCARD = (cell) => {
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

export {
    CheckBox,
    SrNo,
    PANCARD,
    AADHAR,
    GST,
    CompanyName,
    DueSince,
    DueAmount,
    
};