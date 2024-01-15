import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Container,
  Button,
  CardHeader,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import TableContainer from "./TableContainer";
import UploadDocumentModel from './uploadDocumentsmodel'
import { useDispatch, useSelector } from "react-redux";
import { getGeneralDoucments } from "../../../../store/Documents/documents.actions"
import { getGeneralDocumentsSelector } from "../../../../store/Documents/documents.selector"
import pdfImg from '../../../../assets/images/newImg/pdf.png'
// import { selectReportDefOpen } from "store/debtors/debtors.selecter"
import './Gallary.css'

const Document = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [genralDocs, setgenralDocs] = useState([]);
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);

  const handleAcceptedFiles = (acceptedFiles) => {
  
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const dispatch = useDispatch();
    const GetDocument = useSelector(getGeneralDocumentsSelector);

    console.log("handle GetDocument", GetDocument)
  const removeFile = (index) => {
    console.log("index9898", index)
    const newFiles = [...selectedFiles];
    newFiles.splice(index);
    // console.log("INDEX", index, newFiles)
    console.log("index9898 09", newFiles)


    setSelectedFiles(newFiles);
  };
useEffect(()=>{
  dispatch(getGeneralDoucments())
  setgenralDocs(GetDocument)
 
},[])


 

 
  const reciveDocument=(item)=>{
    console.log("IJIJIJI", item, selectedFiles)
    setSelectedFiles([...selectedFiles, ...item]);


  }
  return (
    <React.Fragment>
      <UploadDocumentModel isOpen={modal1} toggle={toggleViewModal}  Document={reciveDocument}/>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col md="10"></Col>
            <Col md="2">
              <Button onClick={() => setModal1(true)} className="btn btn-info" style={{ fontSize:'12px', display:'flex', padding:'10px'}}>
               + Upload Documents
              </Button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader>
               <h5>General Documents</h5>
                </CardHeader>
                <CardBody>

                  <div className="gallery mt-3 mr-5">
                    <div className="row">


                        

                        <Row>
                         {GetDocument != undefined ?
                          GetDocument.map((item)=>{
                            return<Col md={3} key={item}>
                                 
                     


                    <Row>
                      <Col md={4} className="text-end p-3">
             
  {/* <a >
                      <i className='bx bxs-file mt-2 fileSizing'></i></a> */}
<a href={item.url} rel='noreferrer' target='_blank'>



                      <button type="button" className="btn btn-white" data-toggle="tooltip" data-placement="top" title="View Document"  rel='noreferrer' target='_blank'>
                      {/* <i className='bx bxs-file mt-2 fileSizing '></i> */}
                      <img src={pdfImg} className="imgsizing"/>
</button>
</a>
                      
                      </Col>
                      <Col md={8} className="pt-3">
                      <b>{item.name}</b>

                      </Col>
                    </Row>
                            </Col>
                          }):""
                         } 
                        
                        </Row>
                   
                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Document.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(Document);
