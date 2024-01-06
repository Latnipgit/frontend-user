import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";

import { Button, Card, CardBody, CardHeader, Label, } from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";
import Select from "react-select"
import { selectDebtorsList } from "store/debtors/debtors.selecter";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector } from "store/debtors/debtors.selecter"
import { addInvoiceBill, addInvoiceBillSuccess } from '../../../store/actions'
import UploadPendingFiles from "../Invoice/uploadFilesModal";
import ReportedDebtorsModel from "../Invoice/ReportedModel";
import ReportedDefaulterModel from "../Invoice/ReportDefaulterModel";
import UploadCACertificateModel from "../Invoice/uploadCACertificateModel";
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';
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
  const [selected, setSelected] = useState('');
  const [modal2, setModal2] = useState(false);
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [getDaysArray, setgetDaysArray] = useState([]);

  const dispatch = useDispatch();
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const isReportDefOpen = useSelector(selectReportDefOpen);
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const selectCACertificate = useSelector(selectCACertificateOpen);

  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
  const toggleViewModal3 = () => dispatch(setIsReportDefOpen(!isReportDefOpen));
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));

  const GetAllInvoice = useSelector(selectInvoiceList)
  useEffect(() => {
    dispatch(getAllInvoice());

    getDays()

  }, [])

  const handleUploadFiles = () => {
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const additionalValue = "Hello from additional prop!";
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

  const getDays = () => {
    GetAllInvoice != undefined ? GetAllInvoice.map((item) => {
      const a = moment(item.dueDate);
      const b = moment()
      const c = moment(b).diff(a)
      const d = moment.duration(c)
      if (getDaysArray.length != GetAllInvoice.length) {
        getDaysArray.push(d.days())

      }
    }) : []
    console.log("ABABABABABAB", getDaysArray)
  }
  console.log("ABABABABABAB 2", getDaysArray)

  const requestEdit = (item) => {

    console.log("ITEMMMMM", item.invoices[0].invoiceNumber)
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }

    dispatch(requestInvoiceDefEdit(payload))
  }

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
      <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue} selected={selected} />
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} customerName={invoiceIdsForCAcertificate} />
      <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} />
      <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} />

      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />


          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Recieved Payment</h5>
            </Col>
          </Row>

          <Row className="p-4  ml-5">
            {/* <br/> */}

            {/* <ReactTable
              data={GetAllInvoice != undefined ? GetAllInvoice : []}
              columns={columns}
              showPagination={true}
              defaultPageSize={5}
            /> */}

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company Name</th>
                  {/* <th scope="col">Refrence Number</th> */}
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Due Amount</th>
                  <th scope="col">Due From</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">Upload Document</th> */}
                </tr>
              </thead>
              <tbody>
                {console.log("GetAllInvoiceGetAllInvoice", GetAllInvoice)}
                {GetAllInvoice != undefined ? GetAllInvoice.map((item, index) => {
                  {/* {dummyData != undefined ? dummyData.map((item, index) => { */ }


                  return <tr key={item}>
                    {console.log("NEW TABLE ", item.remainingAmount)}

                    <th scope="row" className="pt-4">{index + 1}</th>
                    <td className="pt-4 text-capitalize">{item.debtor.companyName}</td>
                    <td className="pt-4">{item.invoices.map((item) => {
                      return <span key={item}>{item.invoiceNumber}, &nbsp;</span>
                    })}</td>

                    <td className="pt-4 d-flex text-capitalize">{item.debtor.companyName}
                      <br />
                      {item.debtor.address1} {item.debtor.address2}, {item.debtor.city}</td>

                    <td className="pt-4 text-end">
                      <CurrencyFormat value={item.invoices[0].remainingAmount.toFixed(1)} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

                    </td>

                    <td >

                      <div className="" style={{ padding: "2px 15px" }}>

                        <div className=" text-center bg-success rounded text-light">
                          <div className="text-capitalize">

                            {getDaysArray[index]}  &nbsp;


                            <span className="ml-1">Days</span> </div>
                          <div className="text-capitalize" >{moment(item.dueDate).format("DD-MM-YYYY")}</div>
                        </div>
                      </div>

                    </td>

                    <td>
                      <div className="pt-2">
                        <Button className="btn btn-info btn-sm "
                          onClick={() => viewModel(item)

                          }

                        >
                          <i className='bx bx-wallet-alt textsizing' ></i>
                        </Button>

                        <a>
                        </a>
                        &nbsp;

                        <Button className="btn btn-info btn-sm"
                          onClick={() => requestEdit(item)

                          }
                        >
                          <i className='bx bx-edit textsizing' ></i>
                        </Button>

                        &nbsp;

                        <Button className="btn btn-info btn-sm"
                          onClick={() => handleUploadFiles()

                          }
                        >
                          <i className='bx bx-cloud-upload textsizing' ></i>


                        </Button>

                        &nbsp;
                        <Button className="btn btn-info btn-sm"
                          onClick={() => {
                            toggleViewModal2()
                            setinvoiceIdsForCAcertificate(item.invoices[0].invoiceNumber)
                          }

                          }
                        >
                          <i className='bx bx-file textsizing' ></i>
                        </Button>


                      </div>
                    </td>
                    {/* <td>
    <div className="pt-2">
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModels()
               
              }
            >
           Upload Document
            </Button>
  
          </div>
    </td> */}
                  </tr>
                }) : ''}


              </tbody>
            </table>

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
