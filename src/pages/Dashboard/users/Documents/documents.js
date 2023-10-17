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
const Document = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleAcceptedFiles = (acceptedFiles) => {
    debugger
    console.log("handle accepeted", selectedFiles)
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    console.log("INDEX", index)
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
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
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          const project = cellProps.row.original;
          return (
            <div className="d-flex">
       

            <div className="d-flex flex-column align-items-center" onClick={() => removeFile(project)} style={{ cursor: 'pointer' }}>
            <i className="mdi mdi-trash-can font-size-16 text-danger me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" />
            </div>
            </div>
          );
        },
      },
    ],
    []
  );
console.log("selectedFiles", selectedFiles)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <h6 className="card-title">File Gallery</h6>
                  <Form>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles(acceptedFiles);
                      }}
                      
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >

                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>DROP FILES HERE OR CLICK TO UPLOAD</h4>
                            
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </Form>
                  {renderAlert()}
                  <div className="gallery mt-3 mr-5">
                    <div className="row">
                  


        {selectedFiles.length !=0  ?      <TableContainer
            columns={columns}
            data={selectedFiles}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
          />
          :''}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <Button
                      type="button"
                      color="primary"
                      onClick={handleUpload}
                      disabled={selectedFiles.length === 0}
                    >
                      Upload Files
                    </Button>
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
