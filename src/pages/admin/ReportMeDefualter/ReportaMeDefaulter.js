import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDefaulterModel from '../Invoice/ReportDefaulterModel'
import UploadCACertificateModel from '../Invoice/uploadCACertificateModel'
import 'react-table-6/react-table.css'
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import { setUploadFilesOpen, setCACertificateOpen } from "../../../store/debtors/debtors.actions"
import { uploadFilesModalOpen, selectCACertificateOpen } from "store/debtors/debtors.selecter"
import { selectReportMeDefData } from "store/ReportMeDefulter/ReportMeDefulter.selecter"
import { fetchReportMeDefulterStart } from "store/ReportMeDefulter/ReportMeDefulter.action"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import moment from 'moment'

const ReportMedefulterComponent = props => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [selected, setSelected] = useState('');
  const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState('')
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const dispatch = useDispatch();
  const selectCACertificate = useSelector(selectCACertificateOpen);
  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));


  const selectReportMeDeflist = useSelector(selectReportMeDefData)
  console.log("reportMeDefulter", selectReportMeDeflist);

  useEffect(() => {
    dispatch(fetchReportMeDefulterStart())
  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const viewModels = (value) => {
    setModal3(true)
  }



  const dummyData = [{
    "companyName": "Latnip",
    "InvoiceNUmber": "BAF-65650",
    "Address": "Jodhpur",
    "amount": "90000",
    "DueFrom": "12-05-2003",
    "debtor":
    {
      "firstname": "Harshit",
      "lastname": "sharma"
    }


  },
  {
    "companyName": "TATA",
    "InvoiceNUmber": "BAF-69850",
    "Address": "Jaiour",
    "amount": "98000",
    "DueFrom": "13-05-2012",
    "debtor":
    {
      "firstname": "Harshit",
      "lastname": "sharma"
    }


  },
  {
    "companyName": "Jio",
    "InvoiceNUmber": "BAF-65980",
    "Address": "Pali",
    "amount": "65000",
    "DueFrom": "24-09-2020",
    "debtor":
    {
      "firstname": "Harshit",
      "lastname": "sharma"
    }


  }]

  const handleUploadFiles = (item) => {
    setuploadFilesModelDataForUpload(item)
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }

  const handleFilterdata = (filters) => {
    if (selectReportMeDeflist) {
      if (filters === "") {
        setFilteredData(selectReportMeDeflist)
      } else {
        const filteredResults = selectReportMeDeflist.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }
  };


  const additionalValue = "Hello from additional prop!";
  return (
    <React.Fragment>
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} additionalValue={additionalValue} selected={selected} />
      <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} />
      {/* <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} /> */}

      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />
          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Report Me As a Defaulter</h5>
            </Col>
            {selectReportMeDeflist != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Company"} /> : ""}
          </Row>
          <Row className="p-4  ml-5">
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
                {filteredData.length >= 0 ? <ReportMeDefulterList selectReportMeDeflistData={filteredData} /> : <ReportMeDefulterList selectReportMeDeflistData={selectReportMeDeflist} />}


              </tbody>
            </table>

          </Row>
        </CardBody>
      </Card>
    </React.Fragment >
  );
}

const ReportMeDefulterList = ({ selectReportMeDeflistData }) => {
  return (
    <>
      {selectReportMeDeflistData != undefined ? selectReportMeDeflistData.map((item, index) => {

        const newDate = moment.utc(item.invoices[0].dueDate).format('DD-MM-YY');
        return <tr key={item}>
          {console.log("NEW TABLE ", item)}
          <th scope="row" className="pt-4">{index + 1}</th>
          <td className="pt-4 text-capitalize">{item.debtor.companyName}</td>
          <td className="pt-4">{item.invoices[0].invoiceNumber}</td>
          <td>
            {item.debtor.address1}<br />{item.debtor.address2}
          </td>
          <td className="pt-4">{item.totalAmount}</td>
          <td>
            {newDate}
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

              {/*                        <Button className="btn btn-info btn-sm"
      // onClick={() => viewModels()

      // }
      >
        <i className='bx bx-edit textsizing' ></i>
      </Button> */}

              &nbsp;

              <Button className="btn btn-info btn-sm"
              /*         onClick={() => handleUploadFiles()
        
                      } */
              >
                <i className='bx bx-message textsizing' ></i>


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
        </tr>
      }) : ''}
    </>
  )
}

export default withRouter(ReportMedefulterComponent)
