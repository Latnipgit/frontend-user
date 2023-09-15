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

const Document = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleAcceptedFiles = (acceptedFiles) => {
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
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
                      {selectedFiles.map((file, index) => (
                        <div className="col-xl-4" key={index}>
                          <div className="gallery-item">
                            {file.type.startsWith("image/") ? (
                              <img
                                className="gallery-image"
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{ width: "400px", height: "300px" }}
                              />
                            ) : (
                              <embed
                                className="gallery-pdf"
                                src={URL.createObjectURL(file)}
                                type="application/pdf"
                                title={file.name}
                                width="100%"
                                height="300px"
                              />
                            )}
                            <p className="gallery-title">{file.name}</p>
                            <button
                              className="btn btn-danger btn-sm mb-3"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
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
