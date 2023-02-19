import React from 'react';
import './showShipmentInfo.css'

const ShowPaymentInfo = ({order, showStatus = true}) => {
    console.log(order)

    return (

        <>

            <div className="container withRibbon mt-3 mt-md-5">
                <div className="card" data-label={order.orderStatus}>
                    <div className="card__container">
                        <div className="card-header">
                            <h3 className='card-title p-0 m-0'>Order {order.orderId}</h3>
                        </div>
                        <div className="card-body">
                            <div className="py-3">
                                <div className="d-flex align-items-center justify-content-between">

                                    <div>
                                        <h6><strong>Payment Status</strong></h6>
                                        <p className="text-body mb-0">{order.paymentStatus.toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <h6><strong>Currency</strong></h6>
                                        <p className="text-body mb-0">{order.currencyCode}</p>
                                    </div>
                                    <div>
                                        <h6><strong>Payment</strong></h6>
                                        <p className="text-body mb-0">{order.paymentMethod.toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <h6><strong> Date</strong></h6>
                                        <p className="text-body mb-0">{order.orderDate}</p>
                                    </div>

                                    <div>
                                        <h6><strong>Amount </strong></h6>
                                        <span> {(order.amount).toLocaleString('en-US', {
                                            style: 'currency', currency: `${order.currencyCode}`
                                        })}
                                       </span>
                                    </div>
                                    <div>
                                        <a href="/" className="btn btn-primary w-100">View Order</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        </>


    );
};

export default ShowPaymentInfo;