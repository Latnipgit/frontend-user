import React, { useState } from "react"
import PropTypes from "prop-types"

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,

  Table,
  Row,Col
} from "reactstrap"


const ReportedDebtorsModel = props => {
    const [timelystarRating, settimelyStarRating] = useState(0)
    const [responsivestarRating, setresponsivestarRating] = useState(0)
    const [Integrity, setIntegrity] = useState(0)
  const { isOpen, toggle ,additionalValue } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle} 
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Report Debtors</ModalHeader>
        <ModalBody>
            <div className="mt-3 mb-3">
              <Row>
                <Col md={9}>  <b>Customer Feedback</b>
                </Col>
                <Col md={3}>
                <b className=" ">Answers</b>
                </Col>
              </Row>
            </div>
            <div className="mb-1">

            <Row>
                <Col md={9}> 
                <span className="mb-2">

1. Is the customer facing financial difficulty?    </span>
                </Col>
                <Col md={3}>
              
                <span>
 <Input
                        type="text"
 className={`form-control custom-content`}
                        placeholder="Yes/No"
                   
                      />
</span>
                </Col>
              </Row>
          

            </div>
     

<div className="mb-1">
<Row>
                <Col md={9}> 
                <span className="mb-2">

2. Does the customer have intention to pay?   </span>
                </Col>
                <Col md={3}>
                <span>
                <Input
                        type="text"
 className={`form-control custom-content`}
                        placeholder="Yes/No"
                   
                      />
</span>
              
                </Col>
              </Row>
</div>

           <div className="mb-1">
           <Row>
                <Col md={9}> 
                <span className="mb-2">

3. Does the customer currently buy the same product from your competitors? </span>
                </Col>
                <Col md={3}>
              
                <span>
                <Input
                        type="text"
 className={`form-control custom-content`}
                        placeholder="Yes/No"
                   
                      />
</span>
        
                </Col>
              </Row>
         
        
    </div>


<div className="mb-1">
<Row>
                <Col md={9}> 
                <span className="mb-2">

4. Does the customer operate from OWn premises or rented premises?   </span>
                </Col>
                <Col md={3}>
                <span>
 <Input
                        type="text"
 className={`form-control custom-content`}
                        placeholder="Owned/Rented/Not Aware"
                   
                      />
</span>
              
                </Col>
              </Row>
</div>

       
          <div className="mb-1">
          <Row>
                <Col md={9}> 
                <span className="mb-2">

5. Has the customer changed his place of business since buying the goods from you?   </span>
                </Col>
                <Col md={3}>
                <span>
 <Input
                        type="text"
 className={`form-control custom-content`}
                        placeholder="Yes/No"
                   
                      />
</span>
              
                </Col>
              </Row>
          </div>
         
            <div>
            <Row>
                <Col md={9}> 
                <span className="mb-2">

6. How old your business relationship with this customer?  </span>
                </Col>
                <Col md={3}>
                <span>
 <Input
                        type="text"
 className={`form-control custom-content`}
                        placeholder="Input in years"
                   
                      />
</span>
              
                </Col>
              </Row> 
            </div>

           <div className="mt-3 mb-3">
           <Row>
                <Col md={9}> 
<b>Rate your customer</b>
                </Col>
                <Col md={3}>
<b>0-5 stars </b>
              
              
                </Col>
              </Row>
           </div>
            

      <div className="mb-1">
      <Row>
                <Col md={9}> 
                <span className="mb-2">

1. Integrity</span>
                </Col>
                <Col md={3}>
                <span>
 <i className='bx bxs-star' onClick={()=>{
    setIntegrity(1)
 }} 
 style={{ color: Integrity != 0 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
 
   <span>
 <i className='bx bxs-star' onClick={()=>{
    setIntegrity(2)
 }} 
 style={{ color: Integrity != 0 && Integrity > 1 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' onClick={()=>{
    setIntegrity(3)
 }} 
 style={{ color: Integrity != 0 && Integrity > 2 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
              
               
   <span>
 <i className='bx bxs-star' onClick={()=>{
    setIntegrity(4)
 }} 
 style={{ color: Integrity != 0 && Integrity > 3 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' onClick={()=>{
    setIntegrity(5)
 }} 
 style={{ color: Integrity != 0 && Integrity > 4 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
                </Col>
              </Row>
      </div>

         <div className="mb-1">
      <Row>
                <Col md={9}> 
                <span className="mb-2">

2. Responsiveness</span>
                </Col>
                <Col md={3}>
                <span>
 <i className='bx bxs-star' onClick={()=>{
    setresponsivestarRating(1)
 }} 
 style={{ color: responsivestarRating != 0 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
 
   <span>
 <i className='bx bxs-star' onClick={()=>{
    setresponsivestarRating(2)
 }} 
 style={{ color: responsivestarRating != 0 && responsivestarRating > 1 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' onClick={()=>{
    setresponsivestarRating(3)
 }} 
 style={{ color: responsivestarRating != 0 && responsivestarRating > 2 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
              
               
   <span>
 <i className='bx bxs-star' onClick={()=>{
    setresponsivestarRating(4)
 }} 
 style={{ color: responsivestarRating != 0 && responsivestarRating > 3 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' onClick={()=>{
    setresponsivestarRating(5)
 }} 
 style={{ color: responsivestarRating != 0 && responsivestarRating > 4 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
                </Col>
              </Row>
      </div>

         <div>
      <Row>
                <Col md={9}> 
                <span className="mb-2">

3. Timely Payment </span>
                </Col>
                <Col md={3}>
                <span>
 <i className='bx bxs-star' onClick={()=>{
    settimelyStarRating(1)
 }} 
 style={{ color: timelystarRating != 0 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
 
   <span>
 <i className='bx bxs-star' onClick={()=>{
    settimelyStarRating(2)
 }} 
 style={{ color: timelystarRating != 0 && timelystarRating > 1 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' onClick={()=>{
    settimelyStarRating(3)
 }} 
 style={{ color: timelystarRating != 0 && timelystarRating > 2 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
              
               
   <span>
 <i className='bx bxs-star' onClick={()=>{
    settimelyStarRating(4)
 }} 
 style={{ color: timelystarRating != 0 && timelystarRating > 3 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>

  
<span>
 <i className='bx bxs-star' onClick={()=>{
    settimelyStarRating(5)
 }} 
 style={{ color: timelystarRating != 0 && timelystarRating > 4 ? '  #ffdb4d':'gray', fontSize:'18px'}}
 ></i></span>
                </Col>
              </Row>
      </div>    
          
        
        </ModalBody>
        <ModalFooter>
            <Button type="button" color="primary" >
Submit
            </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

ReportedDebtorsModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDebtorsModel
