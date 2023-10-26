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



const uploadDocumentsModel = props => {
    const { isOpen, toggle, additionalValue } = props
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [error, setError] = useState('');
    const toggleViewModal = () => setModal1(!modal1);
    

    const handleUpload = (item) => {
        console.log("ITEM", item, selectedFiles)
        props.Document(selectedFiles)

    };


        const onDrop = useCallback(acceptedFiles => {
            console.log("DROP",acceptedFiles[0].type )

           
          // Do something with the files

         if(acceptedFiles[0].type == "image/png" ){
            if ( acceptedFiles[0].size > 2000000){
                setError('File size should be 200KB - 2MB ')
              }
              else{
                setSelectedFiles(acceptedFiles)
    
              }
         }
         else{
            setError("File should be Image type")
         }
        }, [])
        console.log("selectedFiles", selectedFiles)
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
                <ModalBody>toggle
                    <h6 className="card-title">Upload Document</h6>
                    
                   
                  
           

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
