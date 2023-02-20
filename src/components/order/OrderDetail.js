import React from 'react';
import './OrderDetail.css'
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import ModalImage from "react-modal-image";
import defaultImage from "../../images/default.jpg";

const OrderDetail = ({order}) => {
    const {orderId, products, amount, orderDate} = order


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
                                console.log(product)

                                return <div className="col-lg-6">
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
                <div className="card">
                    
                </div>

            </div>
        </div>
    )
        ;
};

export default OrderDetail;