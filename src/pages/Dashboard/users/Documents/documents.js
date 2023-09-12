import FileGallery  from "./Gallarry";

  import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";


//import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardSubtitle,
  Container,
} from "reactstrap";
import Dropzone from "react-dropzone";

// Breadcrumb
//import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Link } from "react-router-dom";


const Document = props => {
  
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleAcceptedFiles = (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    };
  
    const removeFile = (index) => {
      const newFiles = [...selectedFiles];
      newFiles.splice(index, 1);
      setSelectedFiles(newFiles);
    };
    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
  

  return (
   
         <React.Fragment>
         <div className="page-content">
           {/* <Container fluid={true}>

   
             <Row>
               <Col className="col-12">
                 <Card>
                   <CardBody>
                     <h6 className="card-title">File Upload</h6>
                     <CardSubtitle className="mb-3">
                       {" "}
                     </CardSubtitle>
                     <Form>
                       <Dropzone
                         onDrop={acceptedFiles => {
                           handleAcceptedFiles(acceptedFiles)
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
                               <h4>Drop files here or click to upload.</h4>
                             </div>
                           </div>
                         )}
                       </Dropzone>
                       <div className="dropzone-previews mt-3" id="file-previews">
                         {selectedFiles.map((f, i) => {
                           return (
                             <Card
                               className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                               key={i + "-file"}
                             >
                               <div className="p-2">
                                 <Row className="align-items-center">
                                   <Col className="col-auto">
                                     <img
                                       data-dz-thumbnail=""
                                       height="80"
                                       className="avatar-sm rounded bg-light"
                                       alt={f.name}
                                       src={f.preview}
                                     />
                                   </Col>
                                   <Col>
                                     <Link
                                       to="#"
                                       className="text-muted font-weight-bold"
                                     >
                                       {f.name}
                                     </Link>
                                     <p className="mb-0">
                                       <strong>{f.formattedSize}</strong>
                                     </p>
                                   </Col>
                                 </Row>
                               </div>
                             </Card>
                           )
                         })}
                       </div>
                     </Form>
   
                     <div className="text-center mt-4">
                       <button
                         type="button"
                         className="btn btn-primary "
                       >
                         Send Files
                       </button>
                     </div>
                   </CardBody>
                 </Card>
               </Col>
             </Row>
           </Container>  */}
           
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
                        <h4>Drop files here or click to upload.</h4>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </Form>
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



            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>

         </div>
       </React.Fragment>
  );
}

Document.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(Document);
