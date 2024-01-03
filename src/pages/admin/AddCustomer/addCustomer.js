import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import 'react-table-6/react-table.css'
import { AddcustomerFomr } from "./addCustomerForm"
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

import { useDispatch, useSelector } from "react-redux";
import { getAllDebtors } from "../../../store/debtors/debtors.actions"
import { selectDebtorsList } from "store/debtors/debtors.selecter"
import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter"
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import moment from 'moment'

const AddCustomer = props => {
  const [getDaysArray, setgetDaysArray] = useState([]);
  const dispatch = useDispatch();

  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));

  const GetAllDebtors = useSelector(selectDebtorsList)
  console.log(GetAllDebtors);

  useEffect(() => {
    dispatch(getAllDebtors());
    getDays()

  }, [])

  const getDays = () => {
    if (GetAllDebtors != undefined) {
      for (let x = 0; x < GetAllDebtors.length; x++) {
        const a = moment(GetAllDebtors[x]);
        const b = moment()
        const c = moment(b).diff(a)
        const d = moment.duration(c)
        getDaysArray.push(d.days())
      }
    }

    /*     GetAllDebtors != undefined ? GetAllDebtors.map((item , i)=>{
       const a = moment(item.dueDate);
        const b =moment()
        const c = moment(b).diff(a)
        const d = moment.duration(c)
        if(getDaysArray.length != GetAllDebtors.length ){
          getDaysArray.push(d.days())
    
        }
      }):[] */
  }
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />
          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Add Customer</h5>
            </Col>
            <Col md={2}>
              <Button className="btn btn-md btn-info" onClick={() => toggleAddCustomer()}>Add new customer</Button>
            </Col>
          </Row>

          <Row className="p-4  ml-5">
            {/* <br/> */}

            {/* <ReactTable
              data={GetAllDebtors != undefined ? GetAllDebtors : []}
              columns={columns}
              showPagination={true}
              defaultPageSize={5}
            /> */}

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Customer Name</th>
                  {/* <th scope="col">Refrence Number</th> */}
                  <th scope="col">companyName</th>
                  <th scope="col">Address</th>
                  <th scope="col">GST Number</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Email</th>
                  {/*       <th scope="col">Due From</th>
      <th scope="col">Action</th> */}
                  {/* <th scope="col">Upload Document</th> */}
                </tr>
              </thead>
              <tbody>
                {GetAllDebtors != undefined ? GetAllDebtors.map((item, index) => {
                  return <tr key={item}>
                    {console.log("NEW TABLE ", item)}

                    <th scope="row" className="pt-4">{index + 1}</th>
                    {/* <td className="pt-4">{item.debtor.firstname} {item.debtor.lastname}</td> */}
                    <td className="pt-4 text-capitalize">{item.firstname + '' + item.lastname}</td>
                    {/* <td className="pt-4">{item.referenceNumber}</td> */}
                    <td className="pt-4 text-capitalize">{item.companyName}</td>
                    <td className="pt-4 text-capitalize">{item.address1},{item.address2},{item.city}</td>
                    <td className="pt-4 text-capitalize">{item.gstin}</td>
                    <td className="pt-4 text-start">{item.customerMobile}</td>
                    {/* <td className="pt-4">{item.status}</td> */}
                    <td className="pt-4 text-start">
                      {/* <CurrencyFormat value={item.remainingAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}
                      {item.customerEmail}
                    </td>

                    {/*  <td >
   
    <div className="" style={{ padding:"2px 15px"}}>
      
  <div className=" text-center bg-success rounded text-light">
    <div className="text-capitalize">
      
       {getDaysArray[index]}  &nbsp;


       <span className="ml-1">Days</span> </div>
    <div className="text-capitalize" >{moment(item.dueDate).format("MM-DD-YY")}</div>
  </div>
</div>
           
    </td>
    <td>
    <div className="pt-2">
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModel(item)
               
              }
            >
           Record Payment
            </Button>
            &nbsp;

            <Button className="btn btn-info btn-sm"
              // onClick={() => viewModels()
               
              // }
            >
           Request Edit
            </Button>
  
          </div>
    </td> */}
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
      {isAddCustomerOpen && <AddcustomerFomr />}
    </React.Fragment>
  );
}

export default withRouter(AddCustomer)
