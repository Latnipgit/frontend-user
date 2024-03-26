import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import {
  Button,
  Card,
  Row,
  Col,
  CardBody,
  Input,
  Label
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import "./subscribe.css"
import { useSelector, useDispatch } from "react-redux";
import * as moment from "moment";

import { subscriptionReducerSelector, addSubscribeSelector } from "store/Subscription/CompanySearch/SubscriptionSelector";
import { getSubscriptionList, addSubscriptionToUser } from "store/Subscription/CompanySearch/subscriptionAction";
const Subscriptions = props => {
  const dispatch = useDispatch();
  const [showMenuItems, setshowMenuItems] = useState(false)
  const [selected, setselected] = useState()


  const SubscriptionList = useSelector(subscriptionReducerSelector)
  const addd = useSelector(addSubscribeSelector)
  console.log("SubscriptionListSubscriptionList", addd)
  useEffect(() => {
    dispatch(getSubscriptionList())
  }, [])

  const handleSubmit = (item) => {
    console.log("itemitem", item)
    const payload =
    {
      "subscriptionPkgId": item.id,
      "tenure": selected,
      "isForce": true
    }
    dispatch(addSubscriptionToUser(payload))
    // toast.success("Subscribed To This Package")
    const timer = setInterval(() => {
      window.location.reload()
      return () => clearInterval(timer)
    }, 1000);

  }

  const handleSelectTenure = (item) => {
    setselected(item)
  }
  return (
    <React.Fragment>
      <br />
      <br />
      <Card style={{ marginTop: "2.5%" }}>
        <CardBody>
          <div><h5><strong>Subscription Plans</strong></h5></div>

          <Row className="mt-4">
            {SubscriptionList != undefined ? SubscriptionList.map((item) => {
              return <Col md={4} key={item}>

                <Card className="text-center shadow-lg rounded" >
                  <div style={{background:"rgb(175, 144, 225)"}} className="p-3 text-light">
                  <h4 > <b>{item.subscriptionPkgName}</b></h4 >

                  </div>
                  <div className="p-3 text-center">

              
                  <Label >  <b>Date : {moment(item.createdAt).format("DD-MMM-YYYY")}</b></Label >
                  </div>
                  <div className="p-1 text-center">
                  <Label >

                    <Input
                      className="ember-view form-check-input"
                      type="radio"
                      id="Monthly"
                      name="customerType"
                      value="Monthly"
                      onChange={() => handleSelectTenure("Monthly")}
                    />{" "} &nbsp;
                    <b>Monthly Amount : {item.monthlyAmt}/-</b>
                    <br />
                    &nbsp;  &nbsp; &nbsp; <b className="text-success">Discount : {item.monthlyDiscount}</b>
                  </Label>
                  </div>
                  <div className="p-1 pb-3 text-center">

                  <Label >

                    <Input
                      className="ember-view form-check-input"
                      type="radio"
                      id="Yearly"
                      name="customerType"
                      value="Yearly"
                      onChange={() => handleSelectTenure("Yearly")}

                    />{" "} &nbsp;
                    <b> Yearly Amount :{item.yearlyAmt}</b>
                    <br />
                    &nbsp;  &nbsp; &nbsp; <b className="text-success">Discount : {item.yearlylyDiscount}/-</b>
                  </Label>
                  </div>

                 


                  <div className="mb-3"> 
                      <Button className="btn btn-info p-2" style={{ width: "130px",background:"rgb(175, 144, 225)", border:"none" }} onClick={() => handleSubmit(item)}
                        disabled={selected == undefined}
                      >
                        Subscribe Now
                      </Button>
                  
                  </div>
                </Card>
              </Col>
            })
              : ''

            }
          </Row>
          


        </CardBody>


      </Card>
      <ToastContainer />
    </React.Fragment>
  )
}

Subscriptions.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  showMenuItems: PropTypes.bool,
}

export default withRouter(withTranslation()(Subscriptions))
