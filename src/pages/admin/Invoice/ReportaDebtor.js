import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "./ReportedModel"
import ReportedDefaulterModel from './ReportDefaulterModel'
import UploadCACertificateModel from './uploadCACertificateModel'
import ReportIncoiceModel from './ReportInvoiceModel'
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
import CurrencyFormat from 'react-currency-format';
// import ReactTooltip from "react-tooltip";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
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
  ModalFooter,
  CardHeader,
  Table,
  InputGroup,
  Form,
  CardTitle,
  FormGroup,
  Label,
} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import { getInvoices as ongetInvoices } from '../../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import { success } from "toastr"
//import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import { getAllInvoice, setIsReportDefOpen ,setUploadFilesOpen} from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList ,uploadFilesModalOpen} from "store/debtors/debtors.selecter"
import UploadPendingFiles from "./uploadFilesModal"
import moment from 'moment'

import './style.css'



const ReportDebtor = props => {
  const [modal1, setModal1] = useState(false);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [selected, setSelected] = useState('');
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const toggleViewModal2 = () => setModal3(!modal3);
  //const [modal4, setModal4] = useState(false);
 /*  const toggleViewModal3 = () => setModal4(!modal4); */
  const dispatch = useDispatch();

  const isReportDefOpen = useSelector(selectReportDefOpen);
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);

  const toggleViewModal3 = () =>  dispatch(setIsReportDefOpen(!isReportDefOpen));
  const toggleUploiadFiles = () =>  dispatch(setUploadFilesOpen(!uploadFilesModalShow));

  const GetAllInvoice = useSelector(selectInvoiceList)

  useEffect(() => {
    dispatch(getAllInvoice());

    getDays()

  }, [])

  const viewModel =(value)=>{
    setSelected(value)
    setModal2(true)
  }

  const viewModels =(value)=>{
    setModal3(true)
  }
 const dummyData =[{
  "companyName":"Latnip",
  "InvoiceNUmber":"BAF-65650",
  "Address":"Jodhpur",
  "amount":"90000",
  "DueFrom":"12-05-2003",
 "debtor":
  {
    "firstname":"Harshit",
    "lastname":"sharma"
  }
 

 },
 {
  "companyName":"TATA",
  "InvoiceNUmber":"BAF-69850",
  "Address":"Jaiour",
  "amount":"98000",
  "DueFrom":"13-05-2012",
  "debtor":
  {
    "firstname":"Harshit",
    "lastname":"sharma"
  }
 

 },
 {
  "companyName":"Jio",
  "InvoiceNUmber":"BAF-65980",
  "Address":"Pali",
  "amount":"65000",
  "DueFrom":"24-09-2020",
  "debtor":
  {
    "firstname":"Harshit",
    "lastname":"sharma"
  }
 

 }]

  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600',  },
        style:{padding:"15px"},
          width: 50,

        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },

      {
        Header: "Refrence Number",
        accessor: "referenceNumber",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style:{padding:"15px"},
    

      },
          {
            Header: "Customer Name",
            accessor: "",
            headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
            style:{padding:"15px"},
           
            Cell: cellProps => {
              return ( <div className="text-capitalize" >{cellProps.original.debtor.firstname +" "+ cellProps.original.debtor.lastname}</div>

      )}
          },
          {
            Header: "Invoice Number",
            accessor: "",
            headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600', pointerEvent:"none",  },
            style:{padding:"15px"},
          
            Cell: cellProps => {
              return ( <div className="text-capitalize" >{cellProps.original.invoiceNumber}</div>

      )}
          },
      {
        Header: "Due Amount",
        accessor: "remainingAmount",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style:{padding:"15px"},
     

      },
      {
        Header: 'Due From',
        disableFilters: true,
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },

        filterable: false,
        accessor: "",

        Cell: cellProps => {
          const a = moment(cellProps.original.dueDate);
          const b =moment()
          const c = moment(b).diff(a)
          const d = moment.duration(c)
          console.log("ABABAB",d.days())
          return (

            <div className="" style={{ padding:"5px 35px"}}>
              <div className=" text-center bg-success rounded text-light">
                <div className="text-capitalize">
                  {
                    d.days()

                  } Days </div>
                <div className="text-capitalize" >{moment(cellProps.original.dueDate).format("MM-DD-YY")}</div>
              </div>
            </div>
          )
        }
      },


     
      {
        Header: "Action",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
  style:{padding:"15px"},
        accessor: "",
     
        Cell: (cellProps) => (
          <div>
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModel(cellProps.original)
               
              }
            >
           Report a Defaulter
            </Button>
  
          </div>
        )
      },



    ],
    []
  );

  const additionalValue = "Hello from additional prop!";

const handleReportDefaulter = ()=>{
  // window.location.href = "/ReportDefaulter"
  //setModal4(true)
  dispatch(setIsReportDefOpen(!isReportDefOpen))
}
const handleUploadFiles =()=>{
  dispatch(setUploadFilesOpen(!uploadFilesModalShow))
}
const getDays = ()=>{
    GetAllInvoice != undefined ? GetAllInvoice.map((item)=>{
   const a = moment(item.dueDate);
    const b =moment()
    const c = moment(b).diff(a)
    const d = moment.duration(c)
    if(getDaysArray.length != GetAllInvoice.length ){
      getDaysArray.push(d.days())

    }
  }):[]
  console.log("ABABABABABAB", getDaysArray)
}
console.log("ABABABABABAB 2", getDaysArray)

  return (
    <React.Fragment>
      <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue} selected={selected} />
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} />
      <UploadCACertificateModel isOpen={modal3} toggle={toggleViewModal2} />
      <ReportIncoiceModel isOpen ={isReportDefOpen} toggle={toggleViewModal3}  GetAllInvoice={GetAllInvoice} />
      <UploadPendingFiles isOpen ={uploadFilesModalShow} toggle ={toggleUploiadFiles}/>

      <Card>
        <CardBody>
 <div className="mb-4 h4 card-title"></div>
          <br/>
          <br/>
          <br/>
          
        
        <Row>
          <Col md={10} className="pl-3">
            <h5 className="m-1">Report a Defaulter</h5>
          </Col>
          <Col md={2}>
            <Button className="btn btn-md btn-info" onClick={()=>handleReportDefaulter()}>Report a Defaulter</Button>
            {/* <div data-tip="msg to show" data-for='toolTip1' data-place='top'>Tooltip</div>
<ReactTooltip id="toolTip1" /> */}
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
      {/* <th scope="col">Status</th> */}
      <th scope="col">Address</th>
      <th scope="col">Due Amount</th>
      <th scope="col">Due From</th>
      <th scope="col">Action</th>
      {/* <th scope="col">Upload Document</th> */}
    </tr>
  </thead>
  <tbody>
   {/* {GetAllInvoice != undefined ? GetAllInvoice.map((item, index)=>{ */}
   {dummyData!= undefined ?dummyData.map((item,index)=>{

   
    return  <tr key={item}>
      {console.log("NEW TABLE ", item)}
      
    <th scope="row" className="pt-4">{index + 1}</th>
    {/* <td className="pt-4 text-capitalize">{item.debtor.companyName}</td> */}
    <td className="pt-4 text-capitalize">{item.companyName}</td>
    {/* <td className="pt-4">{item.referenceNumber}</td> */}
    <td className="pt-4">{item.InvoiceNUmber}</td>
    {/* <td className="pt-4 d-flex text-capitalize">{item.debtor.companyName}
    <br/>
    {item.debtor.address1} {item.debtor.address2}, {item.debtor.city}</td> */}
    <td>
      {item.Address}
    </td>
    <td className="pt-4">{item.amount}</td>
    {/* <td className="pt-4 text-end">
      <CurrencyFormat value={item.remainingAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

    </td> */}

    {/* <td >
   
    <div className="" style={{ padding:"2px 15px"}}>
      
  <div className=" text-center bg-success rounded text-light">
    <div className="text-capitalize">
      
       {getDaysArray[index]}  &nbsp;


       <span className="ml-1">Days</span> </div>
    <div className="text-capitalize" >{moment(item.dueDate).format("MM-DD-YY")}</div>
  </div>
</div>
           
    </td> */}
    <td>
      {item.DueFrom}
    </td>
    <td>
    <div className="pt-2">
           

         
       
         
            <Tooltip title="Record Payment">
                <IconButton>
                <Button className="btn btn-info btn-sm "
              onClick={() => viewModel(item)
               
              }
              
            >
    <i className='bx bx-wallet-alt textsizing' ></i>
            </Button>
                </IconButton>
            </Tooltip>

           

         
            <Tooltip title="Request Edit">
                <IconButton>
                <Button className="btn btn-info btn-sm"
              // onClick={() => viewModels()
               
              // }
            >
            <i className='bx bx-edit textsizing' ></i>
            </Button>
                </IconButton>
            </Tooltip>
           
              
            <Tooltip title="Upload Pending Files">
                <IconButton>
                <Button className="btn btn-info btn-sm"
              onClick={() => handleUploadFiles()
               
              }
            >
           <i className='bx bx-cloud-upload textsizing' ></i>
      
           
                </Button>
                </IconButton>
            </Tooltip>

          
          

                  
            <Tooltip title="Upload CA certificate">
                <IconButton>
                <Button className="btn btn-info btn-sm"
              onClick={() => viewModels()
               
              }
            >
           <i className='bx bx-file textsizing' ></i>
            </Button>
                </IconButton>
            </Tooltip>
  
  
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
   }):''}
   
  
  </tbody>
       </table>

          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(ReportDebtor)
