import React, { useState, useMemo } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import TableContainer from "../Documents/TableContainer";
import { useSelector, useDispatch } from "react-redux";
// import { getEmployeeLIst } from "../../../../store/actions";
import { getEmployeeLIst as onggetEmployeeLIst} from "../../../../store/actions";

const EmployeeList = () => {
  const [employeeList, setEmployeelist] = useState([])
const emplist =[{
    "name":'rohan',
    "email": 'rohan@gmail.com',
    'username':'rohan007',
    
},
{
    "name":'akshay',
    "email": 'akshay@gmail.com',
    'username':'aksha008',
    
},
{
    "name":'harshit',
    "email": 'harshit@gmail.com',
    'username':'harshit009',
    
},
{
    "name":'harshitsharma',
    "email": 'harshitsharma@gmail.com',
    'username':'harshitsharma0098',
    
},
]
const columns = useMemo(
    () => [
  
      
      {
        Header: "Name",
        accessor: "name",
        filterable: false,
        disableFilters: true,
      
        Cell: cellProps => {
          return <span >{cellProps.row.original.name}</span>;
        },
      },
 
      {
        Header: "Email",
        accessor: "emailId",
        
        filterable: false,
        disableFilters: true,
      
        // Cell: cellProps => {
        //   return <span>{cellProps.row.original.name}</span>;
        // },
      },
      {
        Header: "Username",
        accessor: "userName",
        filterable: false,
        disableFilters: true,
      
        // Cell: cellProps => {
        //   return <span>{cellProps.row.original.username}</span>;
        // },
      },
      {
        Header: "Permissions",
        accessor: "permissions",
        filterable: false,
        disableFilters: true,
      
        Cell: cellProps => {
          return <span>
         {cellProps.row.original.permissions.length != 0? cellProps.row.original.permissions.map(item=>{
         return <span style={{ textTransform: "lowercase"}} key={item} className="">
                   {item}, &nbsp;
         </span>
         })
        : <span>
          No permissions
          </span>
        }
          </span>;
        },
      },
      // {
      //   Header: "Action",
      //   disableFilters: true,
      //   accessor: "view",
      //   Cell: cellProps => {
      //     const project = cellProps.row.original;
      //     return (
      //       <div className="d-flex ">
       

      //       <div className="d-flex flex-column align-items-center" onClick={() => removeFile(project)} style={{ cursor: 'pointer' }}>
      //       <i className="mdi mdi-trash-can font-size-16 text-danger me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" />
      //       </div>
      //       <div onClick={() => removeFile(project)} style={{ cursor: 'pointer' }} >
      //           <span className="mt-1">Delete</span>
      //       </div>
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );
  const removeFile = (index) => {
    console.log("INDEX", index)
    const newFiles = [...emplist];
    newFiles.splice(index, 1);
    setEmployeelist(newFiles);
  };
  const dispatch = useDispatch();
//   const  getEmployeelists  = useSelector(state => console.log("getEmployeeLIst", state.employeeList.empList.data.response  )
//  );

  React.useEffect(() => {
    dispatch(onggetEmployeeLIst());

    setEmployeelist(emplist)
  }, []);

  const { getEmployeelists } = useSelector(state => 
    ({
      getEmployeelists: state.employeeList.empList.data != undefined && state.employeeList.empList.data.response.length != 0 ? state.employeeList.empList.data.response:[],
 })
 );
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
        <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Employee List</h4>
              
                  <TableContainer
            columns={columns}
            data={getEmployeelists}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
          />
                </CardBody>
              </Card>
            </Col>    
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EmployeeList
