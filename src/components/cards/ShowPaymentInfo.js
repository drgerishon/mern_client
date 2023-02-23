import React from 'react';
import './showShipmentInfo.css'
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import defaultImage from "../../images/default.jpg";

const ShowPaymentInfo = ({order, showStatus = true}) => {



    return (
        <div className="container withRibbon mt-3 mt-md-5">
            <div className="card" data-label={order.orderStatus}>

                <div className="card__container">
                    <div className="card-header">
                        <h1 className='card-title p-0 m-0'><strong>Order {order.orderId}</strong></h1>
                    </div>
                    <div className="card-body">
                        <div className="py-3">
                            <div className="items">
                                <div className=''>
                                    <h6><strong>Payment Status</strong></h6>
                                    <p className="text-body mb-0">{order.paymentStatus.toUpperCase()}</p>
                                </div>
                                <div className=''>
                                    <h6><strong>Currency</strong></h6>
                                    <p className="text-body mb-0">{order.currencyCode}</p>
                                </div>
                                <div className='flex-column'>
                                    <h6><strong>Payment</strong></h6>
                                    <p className="text-body mb-0">{order.paymentMethod.toUpperCase()}</p>
                                </div>
                                <div className='flex-column'>
                                    <h6><strong> Date</strong></h6>
                                    <p className="text-body mb-0">{}
                                        {dayjs(order.orderDate).format('MMMM D, YYYY')}
                                    </p>
                                </div>
                                <div className='flex-column'>
                                    <h6><strong>Amount </strong></h6>
                                    <span> {(order.amount).toLocaleString('en-US', {
                                        style: 'currency', currency: `${order.currencyCode}`
                                    })}
                                           </span>
                                </div>
                                <div>
                                    <Link
                                        to={`/user/order/${order._id}`}
                                        state={{order: order, from: '/user/history'}}
                                        className="btn btn-primary w-100">View
                                        Order
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item p-3 bg-white">
                            <div className="row no-gutters">

                                <div className="row">
                                    {order.products.map((p, i) => {
                                        return <div className="col-lg-3 mt-4 mt-lg-0" key={i}>
                                            <div className="member d-flex align-items-start" data-aos="zoom-in"
                                                 data-aos-delay="200">
                                                <div className="pic">
                                                    <img
                                                        src={defaultImage}
                                                        className="img-fluid" alt=""/>
                                                </div>
                                                <div className="member-info">
                                                    <h4>{p.product.title}</h4>
                                                    <span><strong>Count</strong>: {p.count}</span>
                                                    <span><strong>Price</strong>: {p.product.price}</span>

                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {order.shippingStatus === 'shipped' &&
                    <div className="card-footer">
                        <Link to={`/user/order/${order._id}`}
                              className="btn btn-success ">
                            Track Shipment</Link>
                    </div>}
                </div>


            </div>
        </div>

    );
};

export default ShowPaymentInfo;