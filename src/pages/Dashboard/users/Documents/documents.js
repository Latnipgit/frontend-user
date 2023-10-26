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
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import TableContainer from "./TableContainer";
import UploadDocumentModel from './uploadDocumentsmodel'


const Document = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);
  const handleAcceptedFiles = (acceptedFiles) => {
     
    console.log("handle accepeted", selectedFiles)
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    console.log("index9898", index)
    const newFiles = [...selectedFiles];
    newFiles.splice(index);
    // console.log("INDEX", index, newFiles)
    console.log("index9898 09", newFiles)


    setSelectedFiles(newFiles);
  };

  const handleUpload = () => {
    setTimeout(() => {
      setSelectedFiles([]); // Clear selected files
      setUploadSuccess(true); // Show upload success message
      // Remove the success message after 5 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
    }, 2000);
  };

  const renderAlert = () => {
    if (uploadSuccess) {
      return (
        <div className="alert alert-success mt-3">
          Files uploaded successfully!
        </div>
      );
    }
    return null;
  };

  const columns = useMemo(
    () => [


      {
        Header: "File Name",
        accessor: "name",
        filterable: false,
        disableFilters: true,

        Cell: cellProps => {
          return <span>{cellProps.row.original.name}</span>;
        },
      },
      {
        Header: "File type",
        accessor: "type",
        filterable: false,
        disableFilters: true,

        Cell: cellProps => {
          return <span>{cellProps.row.original.type}</span>;
        },
      },



      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          const project = cellProps.row.index;
          return (
            <div className="d-flex">


              <div className="d-flex  align-items-center" onClick={() => removeFile(project)} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" />
                <span>
              Delete
             </span>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
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
               + Upload documents
              </Button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>

                  <div className="gallery mt-3 mr-5">
                    <div className="row">



                      {selectedFiles.length != 0 ? <TableContainer
                        columns={columns}
                        data={selectedFiles}
                        isGlobalFilter={true}
                        isAddOptions={false}
                        customPageSize={20}
                      />
                        :

                        <Row>
                          <Col md={4}></Col>
                          <Col md={4}>
                          
                                <h5 className="mt-5 mb-5 ">
                                  No Document Found

                                </h5>
                            
                          </Col>
                          <Col md={4}></Col>
                        </Row>
                      }
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
