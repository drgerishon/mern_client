import React from 'react';
import './OrderDetail.css'
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import ModalImage from "react-modal-image";
import defaultImage from "../../images/default.jpg";

const OrderDetail = ({order}) => {
    const {orderId, products, amount, paymentMethod, orderDate} = order


    return (
        <div className="card mb-3 OrderDetail">
            <div className="card-header">
                <h5 className="card-title  pb-0 fs-5 ">Order Details </h5>
            </div>
            <div className="card-body py-3">
                <p><strong>Order number {orderId}</strong><br/>
                    {products.length} Items <br/>
                    Placed on: {dayjs(orderDate).format('MMMM D, YYYY')}<br/>
                    Total: {(amount).toLocaleString('en-US', {
                        style: 'currency', currency: `${order.currencyCode}`
                    })}
                </p>
                <hr/>
                <strong> ITEMS IN YOUR ORDER</strong>
                <hr/>
                <div className="card">
                    <div className="card-header">
                        {/*<div className="d-flex justify-content-between align-items-center">*/}
                        {/*    <div className='alert alert-success p-1 small'>*/}
                        {/*        Delivered on 12/12/2020*/}
                        {/*    </div>*/}
                        {/*    <Link to={`/user/track/`}>*/}
                        {/*        <button className='btn btn-outline-secondary'>*/}
                        {/*            See status history*/}
                        {/*        </button>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}

                        <div style={{width: '80px', height: 'auto'}}>

                        </div>
                        <div className="row">

                            {products.map(product => {
                                return <div className="col-lg-6" key={product.product._id}>
                                    <div className="member d-flex align-items-start" data-aos="zoom-in"
                                         data-aos-delay="100">
                                        <div className="pic">
                                            {product.product.images && product.product.images.length ?
                                                <img
                                                    src={product.product.images[0].url}
                                                    className='img-fluid'
                                                    alt={product.product.title}
                                                /> : <img
                                                    src={defaultImage}
                                                    className='img-fluid'
                                                    alt={product.product.title}
                                                />}
                                        </div>

                                        <div className="member-info">
                                            <h4>{product.product.title}</h4>
                                            <span>Quantity:{product.count}</span>
                                            <span>Price:Ksh {product.product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
                <div className="row gy-0">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className='text-black'>PAYMENT INFORMATION</h5>
                            </div>
                            <div className="card-body">
                                <p className='fs-6 py-2'>
                                    <strong>Payment Method</strong> <br/>
                                    {paymentMethod.toUpperCase()}
                                </p>
                                <br/>

                                <p className=''>
                                    <strong>Payment Details</strong> <br/>
                                    Items total: {(amount).toLocaleString('en-US', {
                                    style: 'currency', currency: `${order.currencyCode}`
                                })} <br/>
                                    Delivery Fees: <br/>
                                    Total: {(amount).toLocaleString('en-US', {
                                    style: 'currency', currency: `${order.currencyCode}`
                                })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className='text-black'>DELIVERY INFORMATION</h5>
                            </div>
                            <div className="card-body">
                                <p className='py-2'>
                                    <strong>Delivery Method</strong> <br/>
                                    Pick-up Station
                                    <br/>


                                    <strong>Opening Hours</strong>: <br/>
                                    Mon-Fri 9am to 6pm; Sat 0800hrs - 1300hrs <br/>


                                    <strong>Shipping Details</strong> <br/>
                                    Pickup Station.Fulfilled by name <br/>
                                    Delivery scheduled on 01 December
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
};

export default OrderDetail;