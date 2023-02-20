import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Icon} from '@iconify/react';
import ShowPaymentInfo from "../../../components/cards/ShowPaymentInfo";
import {PDFDownloadLink} from "@react-pdf/renderer";
import Invoice from "../../../components/order/Invoice";
import {Navigate} from "react-router-dom";
import {getUserOrders} from "../../../redux/services/user.service";

const History = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([])
    const loadUserOrders = useCallback(() => {
        getUserOrders(currentUser.token).then(res => {
            setOrders(res.data)
        }).catch(e => {
            console.log(e)
        })
    }, [currentUser.token])


    useEffect(() => {
        loadUserOrders()
    }, [loadUserOrders])


    const showOrderInTable = order => {

        return <table className="table">
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
                    <td>{p.product.shipping === 'No' ? <Icon icon="ant-design:close-circle-outlined"/> :
                        <Icon icon="ant-design:check-circle-outlined"/>}</td>
                </tr>
            })}


            </tbody>
        </table>
    }


    function showDownloadLink(order) {
        return <PDFDownloadLink document={
            <Invoice order={order}/>} className='btn btn-sm btn-block btn-outline-primary' fileName='invoice.pdf'>
            Download your invoice
        </PDFDownloadLink>

    }

    const showEachOrder = () => {
        return orders.reverse().map((order, i) => {
            return (
                <div key={i}>
                    <ShowPaymentInfo order={order}/>
                    {/*{showOrderInTable(order)}*/}
                    {/*<div className="row">*/}
                    {/*    <div className="col">*/}
                    {/*        {showDownloadLink(order)}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            );
        })

    };

    if (!currentUser) {
        return <Navigate to="/auth/login"/>;
    }
    return (
        <>
            {showEachOrder()}
        </>
    );
};

export default History;