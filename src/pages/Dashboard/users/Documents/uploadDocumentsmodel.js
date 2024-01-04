import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import axios from "axios";

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



const uploadDocumentsModel = props => {
    const { isOpen, toggle, additionalValue } = props
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [error, setError] = useState('');
    const [uploadedResponse, setUploadedResponse] = useState('');
    const toggleViewModal = () => setModal1(!modal1);
    

    const handleUpload = (item) => {
        console.log("ITEM",  selectedFiles)
        props.Document(selectedFiles)

        const formData = new FormData();

    formData.append('file', selectedFiles[0]);  
    formData.append('fieldName', '');

   


    uploadFile(formData)


    };


        const onDrop = useCallback(acceptedFiles => {
            console.log("DROP",acceptedFiles[0].type )

           
            if ( acceptedFiles[0].size > 2000000){
                setError('File size should be 200KB - 2MB ')
              }
              else{
                setSelectedFiles(acceptedFiles)

              }
        }, [])
        console.log("selectedFiles", selectedFiles)
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    function uploadFile(formData) {
        console.log("UPLOAD FILE", formData)
        const token = JSON.parse(localStorage.getItem("authUser")).token
        const headers = {
          'x-access-token': token != null ? token : '',
        };
    
    
        axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
          headers: headers
        })
          .then((response) => {
            // toast.success("file upload successfully")
            console.log("SUCCESS RESPO",response)
     setUploadedResponse(response)
          })
          .catch((error) => {
            console.log("Response ERROR", error)
    
          })
      }
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
                <ModalBody>toggle
                    <h6 className="card-title">Upload Document</h6>
                    
                   
                  
           

<div {...getRootProps()}  className='text-center'>
      <input {...getInputProps()} 
      type='file'
    //  accept="image/png, image/gif, image/jpeg"
    accept=
"application/msword, application/vnd.ms-excel,text/plain, application/pdf, image/*"
      min={"200002"}
      max={2303020}
      />
   <i className="display-4 text-muted bx bxs-cloud-upload" />

      {
        isDragActive ?
        
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files
<br/>
<span>
    {selectedFiles.length != 0 ? selectedFiles[0].name:''}

</span>
<br/>
<span className='text-danger'>
    {error}
</span>

          </p>
      }
    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center">
                        <Button
                            type="button"
                            color="primary"
                            onClick={()=>{
                                handleUpload()
                                toggle()
                            }
                               
                            
                            }
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

uploadDocumentsModel.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default uploadDocumentsModel
