import React from 'react';
import './showShipmentInfo.css'

const ShowPaymentInfo = ({order, showStatus = true}) => {
    console.log(order)

    return (

        <>
            {/*<div className='d-flex justify-content-between flex-wrap'>*/}
            {/*    <span className='px-1'><b>Order id</b>:{order.orderId}</span>*/}
            {/*    <span*/}
            {/*        className='px-1'> <b>Amount </b>:{(order.amount).toLocaleString('en-US', {*/}
            {/*        style: 'currency', currency: `${order.currencyCode}`*/}
            {/*    })}*/}
            {/*    </span>*/}
            {/*    <span className='px-1'> <b>Currency:</b>{order.currencyCode}</span>*/}
            {/*    <span className='px-1'> <b>Method:</b>{order.paymentMethod.toUpperCase()}</span>*/}
            {/*    <span className='px-1'><b> Payment Status:</b>{order.paymentStatus.toUpperCase()}</span>*/}
            {/*    <span*/}
            {/*        className='px-1'> <b>Ordered on:</b>{order.orderDate}</span>*/}
            {/*    <br/>*/}
            {/*    {showStatus &&*/}
            {/*    <span className='p-2 badge bg-primary text-white '><b>STATUS</b>: {order.orderStatus}</span>}*/}

            {/*</div>*/}

            <div className="container withRibbon mt-3 mt-md-5">
                <div className="card" data-label="In Progress">
                    <div className="card__container">
                        <div className="card-header">
                            <h3 className='card-title p-0 m-0'>Order {order.orderId}</h3>
                        </div>
                        <div className="card-body">
                            <div className="py-3">
                                <div className="d-flex align-items-center justify-content-between">

                                    <div>
                                        <h6><strong>Currency</strong></h6>
                                        <p className="text-body mb-0">Aug 5th, 2017</p>
                                    </div>
                                    <div>
                                        <h6 className="text-muted mb-0">Date</h6>
                                        <p className="text-body mb-0">Aug 5th, 2017</p>
                                    </div>
                                    <div>
                                        <h6 className="text-muted mb-0">Date</h6>
                                        <p className="text-body mb-0">Aug 5th, 2017</p>
                                    </div>
                                    <div>
                                        <h6 className="text-muted mb-0">Date</h6>
                                        <p className="text-body mb-0">Aug 5th, 2017</p>
                                    </div>
                                    <div>
                                        <h6><strong>Amount </strong></h6>
                                        <span> {(order.amount).toLocaleString('en-US', {
                                            style: 'currency', currency: `${order.currencyCode}`
                                        })}
                                       </span>
                                    </div>
                                    <div>
                                        <h6>Shipped To</h6>
                                        <p className="text-body mb-0">Late M. Night</p>
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