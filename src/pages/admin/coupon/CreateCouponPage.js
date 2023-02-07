import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";
import {createCoupon, getCoupons, removeCoupon} from "../../../functions/coupon";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';

const CreateCouponPage = () => {
    const [name, setName] = useState('')
    const [discount, setDiscount] = useState('')
    const [expiry, setExpiry] = useState('')
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false)
    const {auth} = useSelector(state => ({...state}))


    useEffect(() => {
        loadCoupons()
    }, [])


    const loadCoupons = () => {
        getCoupons(auth.user.token)
            .then(r => {
                setCoupons(r.data)
            }).catch((e) => {
            console.log(e)
        })
    };

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        createCoupon({expiry, discount, name}, auth.user.token)
            .then(r => {
                setLoading(false)
                setDiscount('')
                setExpiry('')
                setName('')
                toast.success(`${r.data.name} is created`)
                loadCoupons()


            }).catch((e) => {
            setLoading(false)
            console.log(e)
        })

    };

    function handleRemove(id) {
        if (window.confirm('Delete this coupon?')) {
            setLoading(true)
            removeCoupon(id, auth.user.token).then(r => {
                setLoading(false)
                loadCoupons()
                toast.success(`${r.data.name} deleted`)
            }).catch(e => {
                console.log(e)
                setLoading(false)
            })

        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>

                <div className="col-md-6">
                    <h4>Coupon</h4>
                    <form onSubmit={handleSubmit}>

                        <div className=" mb-3">
                            <label className="form-label text-muted" htmlFor="form1Example1">Name</label>
                            <input
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                                type="text"
                                className="form-control"
                                autoFocus
                                required/>

                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="form1Example1">Discount %</label>
                            <input
                                type="text"

                                value={discount}
                                onChange={(event) => {
                                    setDiscount(event.target.value)
                                }}
                                className="form-control"
                            />

                        </div>
                        {/*<div className="mb-3">*/}
                        {/*    <label className="form-label" htmlFor="form1Example1">Expiry</label>*/}
                        {/*    <DatePicker*/}
                        {/*        className='form-control'*/}
                        {/*        selected={new Date()}*/}
                        {/*        value={expiry}*/}
                        {/*        required*/}
                        {/*        onChange={(date) => {*/}
                        {/*            setExpiry(date)*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="mb-3">
                            <label className="form-label" htmlFor="form1Example1">Discount</label>
                            <input
                                value={expiry}
                                type="datetime-local"

                                onChange={(event) => {
                                    setExpiry(event.target.value)
                                }}
                                className="form-control"
                            />

                        </div>
                        <div className="mb-3">
                            <button type='submit' className='btn btn-outline-primary'>
                                {loading ? 'Saving...' : "Save"}
                            </button>
                        </div>
                    </form>
                    {coupons.length > 0 && <table className="table table-bordered">
                        <thead className='table-light'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Expiry</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {coupons && coupons.map(c => {
                            return <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{new Date(c.expiry).toLocaleString()}</td>
                                <td>{c.discount}%</td>
                                <td><Icon
                                    icon="material-symbols:auto-delete-outline"
                                    className='text-danger pointer' fontSize={18}
                                    onClick={() => handleRemove(c._id)}/>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;