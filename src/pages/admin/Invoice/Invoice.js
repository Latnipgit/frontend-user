import React, { useEffect, useState, useMemo } from "react";
import {
    Button,
    Card,
    CardBody,
    Placeholder,
  } from "reactstrap";
  import {
    Badge,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
  } from "reactstrap";
  import withRouter from "components/Common/withRouter";
import { discountData } from "common/data";

  const Invoice = props =>{
    const [name, setName]=useState()
    const [invoiceNo, setinvoiceNo]=useState()
    const [invoiceDate, setinvoiceDate]=useState()
    const [invoicedueDate, setinvoicedueDate]=useState()
    const [itemName, setItemName]=useState()
    const [Quantity, setQuantity]=useState('1')
    const [Price, setPrice]=useState('0')
    const [TotalAmount, setTotalAmount]=useState('00')
    const [customerNote, setcustomerNote]=useState()
const Array =[]
   const handleSubmit=()=>{

   }
 return(
    <React.Fragment>
    <div className="mb-4 h4 card-title mt-lg-4">..</div>
 

   <Card>
     <CardBody>   
     <h4 className="mb-0 mt-sm-0 mb-sm-2 font-size-18 mt-2">Invoice</h4>
     <div className="d-flex justify-content-center align-items-center mb-3">

</div>
<div>
<Card style={{ width:'100%', }} className="p-3">
 <form onSubmit={()=>handleSubmit()}>
<label>
<span style={{ marginRight:"64px"}}>
Customer Name :
</span>
    
     <input className="p-1" type="text"   style={{ width: '450px',  border:'1px solid #b2b4b8', borderRadius:'5px'}}
     onChange={(event)=>{
setName(event.target.value)
     }}
     placeholder="Enter customer name"
     />
     &nbsp; <span className="text-danger" style={{ fontSize:'15px'}}>* </span>

   </label>
   <br/>
   <br/>

   <label>
<span style={{ marginRight:"110px"}}>
Invoice # :
</span>
    
     <input className="p-1" type="text"   style={{ width: '350px',  border:'1px solid #b2b4b8', borderRadius:'5px'}}
     onChange={(event)=>{
setinvoiceNo(event.target.value)
     }}
     placeholder="Invoice Number"
     />
          &nbsp; <span className="text-danger" style={{ fontSize:'15px'}}>* </span>

   </label>

   <br/>
   <br/>

   <label>
<span style={{ marginRight:"60px"}}>
Orignal Invoice # :
</span>
    
     <input className="p-1" type="text"   style={{ width: '350px',  border:'1px solid #b2b4b8', borderRadius:'5px'}}
     onChange={(event)=>{
setinvoiceNo(event.target.value)
     }}
     placeholder="BAF-0023"
     disabled
     />
          &nbsp; <span className="text-danger" style={{ fontSize:'15px'}}>* </span>

   </label>

   <br/>
   <br/>
   <label>
<span style={{ marginRight:"90px"}}>
Invoice Date :
</span>
    
     <input className="p-1" type="date"   style={{ width: '200px',  border:'1px solid #b2b4b8', borderRadius:'5px'}}
     onChange={(event)=>{
setinvoiceDate(event.target.value)
     }}
     />

     
               &nbsp; <span className="text-danger" style={{ fontSize:'15px'}}>* </span>

   </label>
   <label>
<span style={{ marginLeft:"50px", marginRight:'30px'}}>
Due Date :
</span>
    
     <input className="p-1" type="date"   style={{ width: '200px',  border:'1px solid #b2b4b8', borderRadius:'5px'}}
     onChange={(event)=>{
setinvoicedueDate(event.target.value)
     }}
     />

     
               &nbsp; <span className="text-danger" style={{ fontSize:'15px'}}>* </span>

   </label>

   <br/>
   <br/>
   
 </form>
 </Card>
</div>

<div>
<Table responsive>
      <thead>
        <tr>
            <th>Item Details</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total Amount</th>
        </tr>
        </thead>
        <tbody>
      
        <tr>
            <th><input type="text"
            onChange={(event)=>{
setItemName(event.target.value)
            }}
            placeholder="Enter Item Name"
            />
            </th>
            <th><input type="text"
                onChange={(event)=>{
                setQuantity(event.target.value)
                                }}
                                placeholder="Quantity"

            />
            </th>
            <th><input type="text"
                     onChange={(event)=>{
                        setPrice(event.target.value)
                                        }}
                                        placeholder="Price"
            />
            </th>
            <th><input type="text"
                     onChange={(event)=>{
                        setTotalAmount(event.target.value)
                                        }}
                                        placeholder="Total"
            />
            </th>
          
        </tr>
    
        </tbody>
    </Table>
    <Row style={{ paddingLeft:'15px'}}>
    <button style={{ border:'none', background:'#629FE8', color:'white', width:'100px'}}>+ Add Line</button>

    </Row>

</div>
<div style={{ background:'#FAFAFA'}} className="mt-4 p-3">
    <Row>
        <Col md={6} className="" style={{ paddingTop:'100px'}}>
        <label >Customer Notes:</label>
<br/>
<textarea id="w3review" name="w3review" rows="4" cols="50" className="p-2" style={{ borderRadius:'5px'}}>
    Thanks for your business.
</textarea>
<p style={{ fontSize:'13px'}}>Will be displayed on the invoice</p>
        </Col>
        <Col md={6}><Card>
    <CardBody>
    <Row className="">
    <Col md={4}>
    <p>Sub Total</p>
    </Col>
    <Col md={4} className="">
 
 
    </Col>
    <Col md={4} className="d-flex text-right">
    <p className="ml-5" style={{ marginLeft:'50px'}}>
        00
    </p>
    </Col>
   
   
    </Row>
    <Row className="">
    <Col md={4}>
    <p>Discount</p>
    </Col>
    <Col md={4} className="">
  <input type="text"
  placeholder="%"
  />
 
    </Col>
    <Col md={4} className="d-flex text-right">
    <p className="ml-5" style={{ marginLeft:'50px'}}>
        00
    </p>
    </Col>
   
   
    </Row>
<Row className="mt-3">
    <Col md={8}>
    
    <label>
<span style={{ marginRight:"10px"}}>
CGST - 9%
</span>
    
     <input className="p-1" type="radio"  
   
     />
   

   </label>
   <label>
   <span style={{marginLeft:'50px', marginRight:"10px"}}>
SGST - 9%
</span>
    
     <input className="p-1" type="radio"  
   
     />
   

   </label>
 
    </Col>
    <Col md={4}>
    <p className="ml-5" style={{ marginLeft:'50px'}}>
        00
    </p>
    </Col>
</Row>

    <Row className="">
    <Col md={4}>
    <p>Discount</p>
    </Col>
    <Col md={4} className="">
  <input type="text"
  placeholder="%"
  />
 
    </Col>
    <Col md={4} className="d-flex text-right">
    <p className="ml-5" style={{ marginLeft:'50px'}}>
        00
    </p>
    </Col>
   
   
    </Row>
    <Row className="">
    <Col md={4}>
    <p style={{ fontWeight:'600'}}>TOTAL</p>
    </Col>
    <Col md={4} className="">
 
 
    </Col>
    <Col md={4} className="d-flex text-right">
    <p className="ml-5" style={{ marginLeft:'50px'}}>
        00
    </p>
    </Col>
   
   
    </Row>
    </CardBody>
    
    </Card>


        </Col>
    </Row>
    
<Row>

</Row>
</div>
   

<div style={{ background:'#FAFAFA'}} className="mt-4 p-3">
    <Row style={{ display:'flex', justifyContent:'center',}}>
        <Col md={4}></Col>
        <Col md={4}>
        <label >Attach File to Invoice :</label>
<br/>
<input type="file" placeholder="Upload File"/>
<p style={{ fontSize:'12px'}}>You can add max 5 files</p>

        </Col>
        <Col md={4}></Col>
    </Row>
</div>


<div className="mt-3">
<Row style={{ display:'flex', justifyContent:'center',}}>
        <Col md={5}></Col>
        <Col md={2}>
        <button style={{ border:'none', background:'#629FE8',height:'35px', color:'white', width:'auto', padding:'5px 10px',borderRadius:'5px'}}> Save and Send</button>


        </Col>
        <Col md={5}></Col>
    </Row>
</div>
<br/>
<br/>
     </CardBody>
   </Card>
 </React.Fragment>
 )
  }
  export default withRouter(Invoice);
