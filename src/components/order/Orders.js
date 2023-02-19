import React from 'react';
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({orders, handleStatusChange}) => {

    const showOrderInTable = order => {

        return <table className="table table-bordered m-0">
            <thead className='table-light'>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
            </tr>
            </thead>
            <tbody>
            {order.products.map((p, i) => {

                return <tr key={i}>
                    <td><strong>{p.product.title}</strong></td>
                    <td>{p.product.price}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>{p.product.shipping === 'No' ? <CloseCircleOutlined className='text-danger'/> :
                        <CheckCircleOutlined className='text-success'/>}</td>
                </tr>
            })}


            </tbody>
        </table>
    }
    return (
        orders.map(order => (
            <div className='row'>
                <hr/>
                <div className="btn btn-block bg-secondary ">
                    <ShowPaymentInfo order={order} showStatus={false}/>
                    <div className="row">
                        <div className="col-md-4">
                            Delivery status
                        </div>
                        <div className="col-md-8">
                            <select name="status" id="status" className='form-select-sm'
                                    defaultValue={order.orderStatus}
                                    onChange={(event) => handleStatusChange(order._id, event.target.value)}>
                                <option value='Not processed'>Not processed</option>
                                <option value='Processing'>Processing</option>
                                <option value='Approved'>Approved</option>
                                <option value='Dispatched'>Dispatched</option>
                                <option value='Cancelled'>Cancelled</option>
                                <option value='Completed'>Completed</option>
                                <option value='Cash On Delivery'>Cash On Delivery</option>

                            </select>

                        </div>
                    </div>
                </div>
                <div>
                    {showOrderInTable(order)}
                </div>
                <hr/>
                <br/>
            </div>
        ))
    );
}

export default Orders;