import React from 'react';
import './showShipmentInfo.css'
import dayjs from "dayjs";

const ShowPaymentInfo = ({order, showStatus = true}) => {
    console.log(order)

    return (
        <>


            <div className="container withRibbon mt-3 mt-md-5">
                <div className="card" data-label={order.orderStatus}>
                    <div className="card__container">
                        <div className="card-header">
                            <h1 className='card-title p-0 m-0'>Order {order.orderId}</h1>
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