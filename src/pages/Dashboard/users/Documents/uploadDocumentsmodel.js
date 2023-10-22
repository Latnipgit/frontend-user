import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import {
    Row,
    Col,
    Card,
    Form,
    CardBody,
    Container,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Button,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import TableContainer from "./TableContainer";
import UploadDocumentModel from './uploadDocumentsmodel'



const ApprovedTranctionModel = props => {
    const { isOpen, toggle, additionalValue } = props
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [error, setError] = useState('');
    const toggleViewModal = () => setModal1(!modal1);
    // const handleAcceptedFiles = (acceptedFiles) => {

    //     console.log("handle accepeted", selectedFiles)
    //     setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    // };

    // const removeFile = (index) => {
    //     console.log("INDEX", index)
    //     const newFiles = [...selectedFiles];
    //     newFiles.splice(index, 1);
    //     setSelectedFiles(newFiles);
    // };

    const handleUpload = () => {
    //     setTimeout(() => {
    //         setSelectedFiles([]); // Clear selected files
    //         setUploadSuccess(true); // Show upload success message
    //         // Remove the success message after 5 seconds
    //         setTimeout(() => {
    //             setUploadSuccess(false);
    //         }, 5000);
    //     }, 2000);
    };

    // const renderAlert = () => {
    //     if (uploadSuccess) {
    //         return (
    //             <div className="alert alert-success mt-3">
    //                 Files uploaded successfully!
    //             </div>
    //         );
    //     }
    //     return null;
    // };
  
        const onDrop = useCallback(acceptedFiles => {
            console.log("DROP", acceptedFiles)
          // Do something with the files

          if ( acceptedFiles[0].size > 29240){
            setError('File size should be 200KB - 2MB ')
          }
          else{
            setSelectedFiles(acceptedFiles)
            setError('')
            toggle
          }
        }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Company Details</ModalHeader>
                <ModalBody>
                    <h6 className="card-title">Upload Document</h6>
                    
                   <p className='text-danger'>
                    
                   {error}
                   </p>
                  
                    
                    {/* <Form>
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
                    {renderAlert()} */}

<div {...getRootProps()}  className='text-center'>
      <input {...getInputProps()} 
      type='file'
     accept="image/png, image/gif, image/jpeg"
      min={"200002"}
      max={2303020}
      />
   <i className="display-4 text-muted bx bxs-cloud-upload" />

      {
        isDragActive ?
        
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center">
                        <Button
                            type="button"
                            color="primary"
                            onClick={handleUpload}
                            disabled={selectedFiles.length == 0}
                        >
                        submit
                        </Button>
                    </div>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

ApprovedTranctionModel.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default ApprovedTranctionModel
