import React, { useState } from "react"
import { FcCheckmark, FcClock, FcCancel } from "react-icons/fc";
import PropTypes from "prop-types"
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    Card,
    CardBody,
    ModalBody,
    ModalFooter,
    ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Table,
    Row, Col
} from "reactstrap"
import { Link } from 'react-router-dom';
import moment from 'moment'

const CompnayViewDetails = props => {
    const { isOpen, toggle, selected, currenViewList, selectCompanySearchListMap } = props
console.log("selected",selected)

    const [attachments, setAttachments] = useState([
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'image.jpg', type: 'image/jpeg' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'document.pdf', type: 'application/pdf' },
        // Add more attachments as needed
    ]);
    const [sellerattachments, setSellerattachments] = useState([
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'image.jpg', type: 'image/jpeg' },
        { name: 'document.pdf', type: 'application/pdf' },

        // Add more attachments as needed
    ]);
    const renderStarRating = (rating) => {
        const starCount = 5; // Number of stars
        const fullStarCount = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];

        for (let i = 0; i < fullStarCount; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        const remainingStars = starCount - fullStarCount - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }

        return stars;
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleModal = () => setModalOpen(!modalOpen);

    const handleLevelSelection = (level) => {
        setSelectedLevel(level);
        toggleModal();
    };
    const isReferDisabled = selectedLevel === '';
    const existingReviews = [
        { rating: 3.5, comment: "I have been using this product for a while now, and I am incredibly impressed with its features and performance. From the moment I started using it, I could tell that the team behind this product is dedicated to delivering top-notch quality.!" },
        // { rating: 3, comment: "Average quality." },
        // ... other review objects
    ];

    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="invoiceModal modal-xl"
            tabIndex="-1"
            toggle={toggle}
            size="xl"
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>
                    <div className="modal-header-title me-auto ">Company Details</div>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        {/*                         <Col md="12">
                            <Card className="mb-1">
                                <CardBody className="buyer-card-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h5>
                                                    Date: <span className="text-primary">{selected != "" ? moment(selected.DueSince).format("DD-MM-YYYY") : ''}</span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col> */}
                        <Col md="6" className="mt-4">

                            <Card className="mb-3">
                                <CardBody className="buyer-card-body">
                                    <h4>Buyer Information</h4>
                                    {/*                                 <p className="mb-2">
                                        Billing Name: <span className="text-primary">{selected != "" ? selected.CompanyName : ''}</span>
                                    </p> */}
                                    <p className="mb-2">
                                        Company Name : <span className="text-primary">{selected != "" ? selected.CompanyName : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        GST Number : <span className="text-primary">{selected != "" ? selected.GST : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        PAN Number : <span className="text-primary">{selected != "" ? selected.PANCARD : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        Mobile Number : <span className="text-primary">{selected != "" ? selected.customerMobile : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        Email : <span className="text-primary">{selected != "" ? selected.email : ''}</span>
                                    </p>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6" className="mt-4">
                            <Card className="mb-3 shadow-lg" >
                                <CardBody className="seller-card-body" style={{}}>
                                    <b className="mb-2"style={{ fontSize: '13px' }}>Key Points</b>
                                    <Row className="mb-2"><Col md={12}>
                                        <span style={{ fontSize: '13px' }}> <b className="" style={{ color: '#00b300' }}>1. Approved : </b>
                                            From the information gathered thus far, it appears that the buyer may be in default.</span>
                                    </Col></Row>
                                    <Row className="mb-2"><Col md={12}>
                                        <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' #ff794d' }}>2. In Process : </b>
                                            The evaluation of the buyer's defaulter status is pending until their response is received or one week has passed from the complainant's date, whichever occurs first.</span>
                                    </Col></Row>
                                    <Row className="mb-2"><Col md={12}>
                                        <span style={{ fontSize: '13px', }}> <b className="" style={{ color: '#e63900 ' }}>3. Disputed : </b>
                                            The presented evidence is insufficient to definitively establish that the buyer is in default.</span>
                                    </Col></Row>
                                    <Row className="mb-2"><Col md={12}>
                                        <span style={{ fontSize: '13px', }}> <b className="" style={{ color: '#ffc61a ' }}>4. Rating : </b>
                                            The buyer's creditworthiness is depicted on a scale of 0 to 5, where zero signifies the lowest creditworthiness and five indicates the highest.</span>
                                    </Col></Row>
                                    {/* <Row className="mb-2"><Col md={3}><h5>2. InProcess :</h5></Col> <Col md={9}>The evaluation of the buyer's defaulter status is pending until their response is received or one week has passed from the complainant's date, whichever occurs first.
                                    </Col></Row> */}
                                    {/* <Row className="mb-2"><Col md={3}><h5>3. Disputed :</h5></Col> <Col md={9}>The presented evidence is insufficient to definitively establish that the buyer is in default</Col></Row> */}
                                    {/* <Row className="mb-2"><Col md={3}><h5>4. Reating :</h5></Col> <Col md={9}>The buyer's creditworthiness is depicted on a scale of 0 to 5, where zero signifies the lowest creditworthiness and five indicates the highest.</Col></Row> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Card className="mb-3 mt-4">
                        <CardBody className="invoice-items-card-body">
                            <h4>Seller Information</h4>
                            <div className="table-responsive">
                                <Table className="table align-middle table-nowrap">
                                    <thead>
                                        <tr>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">Due Amount</th>
                                            <th scope="col">Due fROM</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currenViewList != undefined ? currenViewList.map((item, i) => {
                                            const ratingArray = selectCompanySearchListMap.filter((value, index) => {
                                                if (value.ratings != undefined && value.ratings.length > 0) {
                                                    if (value.ratings.ratingCompany = item.id) {
                                                        return value.ratings.response
                                                    }
                                                }
                                            })
                                            const totalAmount = item.status == "APPROVED" ? item.totalAmount : "*******"
                                            return <tr key={i}>
                                                <td>{item.companyName}</td>
                                                <td>{item.totalAmount != undefined ? totalAmount : ""}</td>
                                                <td>{item.dueFrom != undefined ? item.dueFrom : ""}</td>
                                                <td>{ratingArray}</td>
                                                {item.status != undefined ? <td style={item.status == "APPROVED" ? { color: "green" } : item.status == "PENDING" ? { color: "#ff794d" } : item.status == "DISPUTED" ? { color: "red", filter: "2px" } : ""}>{item.status == "APPROVED" ? <b><FcCheckmark />Approved</b> : item.status == "PENDING" ? <b><FcClock /> InProcess</b> : item.status == "DISPUTED" ? <b><FcCancel /> Disputed</b> : ""} </td> : <td></td>}

                                            </tr>
                                        }) : ''}

                                        {/*                                         <tr>
                                            <td>TATA</td>
                                            <td>₹1000,00,00</td>
                                            <td>12-12-2023</td>
                                            <td>4.2</td>
                                            <td style={{ color: "green" }}><FcCheckmark /> Approved </td>
                                        </tr>
                                        <tr>
                                            <td>Latnip</td>
                                            <td >******</td>
                                            <td >12-12-2023</td>
                                            <td>3.2</td>
                                            <td style={{ color: "red" }}><FcClock /> InProcess </td>
                                        </tr>
                                        <tr>
                                            <td>Bafama</td>
                                            <td>******</td>
                                            <td>12-12-2023</td>
                                            <td>4.5</td>
                                            <td style={{ color: "red", filter: "2px" }} ><FcCancel /> Disputed </td>
                                        </tr> */}
                                        {/*                                     {selected!= ""? selected.Invoice.items.length != 0 ? selected.Invoice.items.map((item)=>{
                                            return <tr key={item}>
                                                 <td>1</td>
                                                 <td>Wireless Headphone (Black)</td>
                                                 <td>2</td>
                                                 <td>$225</td>
                                                 <td>$450</td>
                                             </tr>
                                    }):
                                   <>
                                    <tr>
                                                 <td>1</td>
                                                 <td>Wireless Headphone (Black)</td>
                                                 <td>2</td>
                                                 <td>$225</td>
                                                 <td>$450</td>
                                             </tr>
                                              <tr>
                                              <td>2</td>
                                              <td>Wireless Headphone (Black)</td>
                                              <td>2</td>
                                              <td>$225</td>
                                              <td>$450</td>
                                          </tr>
                                   </>
                                             :''
                                    }   */}

                                    </tbody>
                                    {/*                                     <tfoot>
                                        <tr>
                                            <td colSpan="4">
                                                <h6 className="m-0 text-right">Sub Total:</h6>
                                            </td>
                                            <td>$595</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">
                                                <h6 className="m-0 text-right">Tax (10%):</h6>
                                            </td>
                                            <td>$59.5</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">
                                                <h6 className="m-0 text-right">Total:</h6>
                                            </td>
                                            <td>$654.5</td>
                                        </tr>
                                    </tfoot> */}
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                    {/*                    <h4 className="mt-4">Company Attachments</h4>
                    <Row className="mt-4">
                        {attachments.map((file, index) => (
                            <Col md="4" key={index}>
                                <Card className="mb-3">
                                    <CardBody className="attachment-card-body" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
                                        <div className="attachment-icon">
                                            {file.type === 'application/pdf' ? (
                                                <i className="far fa-file-pdf fa-2x text-danger"></i>
                                            ) : (
                                                <i className="far fa-file-image fa-2x text-primary"></i>
                                            )}
                                        </div>
                                        <div className="attachment-info">
                                            <span>{file.name}</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>

                    </Row> */}
                    {/*                     <h4 className="mt-4">Seller Rating</h4>
                    <div className="existing-reviews d-flex flex-wrap justify-content-between align-items-center mt-4">
                        {existingReviews.map((review, index) => (
                            <div className="review" key={index}>
                                <div className="review-rating d-flex align-items-center " style={{ color: 'goldenrod', fontSize: '18px' }}>
                                    {renderStarRating(review.rating)}
                                    <h5
                                        className="ml-2 mb-1 mt-2 mx-2"
                                        style={{ color: 'goldenrod', fontSize: '18px' }} // Inline CSS
                                    >
                                        {review.rating}
                                    </h5>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-justify">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}







                    {/*                     <div className="d-flex justify-content-between mt-4">
                        <h4 className="mt-2">Buyer Payment History</h4>
                        <div className="mr-auto mt-2">
                            <Link to="/company-history" className="btn btn-primary">View Buyer history</Link>
                        </div>
                    </div> */}
                    {/*                     <Card className="mb-3 mt-4">

                        <CardBody>
                            <div className="table-responsive">
                                <Table className="table align-middle table-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Payment Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2023-08-01</td>
                                            <td>Bank Deposit</td>
                                            <td>$500</td>
                                            <td>Bank Transfer</td>
                                        </tr>
                                        <tr>
                                            <td>2023-08-05</td>
                                            <td>IGST Payment</td>
                                            <td>$100</td>
                                            <td>Credit Card</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card> */}
                    {/*                     <h4 className="mt-4">Buyer Attachments</h4>
                    <Row className="mt-4">
                        {sellerattachments.map((file, index) => (
                            <Col md="4" key={index}>
                                <Card className="mb-3">
                                    <CardBody className="attachment-card-body" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
                                        <div className="attachment-icon">
                                            {file.type === 'application/pdf' ? (
                                                <i className="far fa-file-pdf fa-2x text-danger"></i>
                                            ) : (
                                                <i className="far fa-file-image fa-2x text-primary"></i>
                                            )}
                                        </div>
                                        <div className="attachment-info">
                                            <span>{file.name}</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row> */}
                    {/*                     <Row className="mt-4">
                        <Col md="4" className="mt-3" ><h3>Action</h3></Col>
                        <Col md="4" className="mt-3" >
                            <div className="col-sm-auto">
                                <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
                                <select defaultValue="0" className="form-select">
                                    <option value="0">Select from here...</option>
                                    <option value="1">Approved</option>
                                    <option value="2">Rejected</option>
                                    <option value="3">L1-Support</option>
                                    <option value="4">L2-Support</option>
                                    <option value="3">L3-Support</option>
                                </select>
                            </div>
                        </Col>
                        <Col md="2">
                        </Col>
                        <Col md="2" className="mt-3" ><Link type="button" className="btn btn-primary">Submit</Link>
                        </Col>

                    </Row> */}


                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </div>
        </Modal >
    )
}

CompnayViewDetails.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default CompnayViewDetails
