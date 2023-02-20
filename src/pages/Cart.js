import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import {userCart} from "../redux/services/user.service";
import {Icon} from '@iconify/react';

const Cart = () => {
    const {cart, auth, coupon} = useSelector((state) => ({...state}))
    const {user} = auth
    const navigate = useNavigate()

    const dispatch = useDispatch()


    let token
    if (auth.isLoggedIn) {
        token = auth.user.token
    }


    function showCartItems() {
        return <table className="table table-sm   table-borderless">
            <thead>
            <tr>
                <th scope="col" className='card-text'>Image</th>
                <th scope="col" className='card-text'>Title</th>
                <th scope="col" className='card-text'>Price</th>
                <th scope="col" className='card-text'>Count</th>
                <th scope="col" className='card-text'>Shipping</th>
                <th scope="col" className='card-text'>Remove</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((p, i) => {
                return <ProductCardInCheckout product={p} key={i}/>
            })}

            </tbody>
        </table>
    }

    function getTotal() {
        return cart.reduce((prev, next) => prev + (next.count * next.price), 0)
    }

    const saveOrderToDb = () => {
        userCart(cart, token)
            .then(r => {
                if (r.data.ok) {
                    navigate('/checkout', {
                        state: {
                            from: 'cart'
                        }
                    })
                }
            })
            .catch(e => {
                console.log(e)
            })


    };


    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-8">
                    <div className="card" style={{overflow: 'auto'}}>
                        <div className="card-header">
                            <div className="d-flex flex-row align-items-center">
                                <Icon icon="fa:long-arrow-left"/>
                                <span className="mx-2">
                                <Link to='/market'>
                                      Continue Shopping
                                </Link>
                            </span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h4 className='card-title'>Shopping cart</h4>
                            <div className="d-flex justify-content-between pb-4">
                                {cart.length === 1 ? <span>You have {cart.length} item in your cart</span> :
                                    <span>You have {cart.length} items in your cart</span>}
                                <div className="d-flex flex-row align-items-center">
                                    <span className="text-black-50">Sort by:</span>
                                    <div className="price mx-2">
                                        <span className="mx-1">price</span>
                                        <Icon icon="fa:angle-down"/>
                                    </div>
                                </div>
                            </div>


                            {!cart.length ?
                                <p className='card-text py-3'> No products in the cart <Link to='/market'>Continue
                                    shopping</Link></p> :
                                showCartItems()
                            }
                            <div className="card-footer">
                                <div className="d-flex justify-content-between pb-4">
                                    {cart.length === 1 ? <span>You have {cart.length} item in your cart</span> :
                                        <span>You have {cart.length} items in your cart</span>}

                                    <div className="d-flex flex-row align-items-center">
                                        <span className="text-black-50">Total</span>
                                        <div className="price mx-2">
                                            <span className="mx-1">Ksh : {getTotal()}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h4 className='card-title'>Order summery</h4>
                        </div>
                        <div className="card-body">

                            {cart.map((c, i) => {
                                return <div key={i}>
                                    <div className='card-text my-3'>
                                        <span>{c.title} </span>
                                        <span> x </span>
                                        <span>{c.count} </span>
                                        <span>= </span>
                                        <span>Ksh <strong> {c.price * c.count}</strong></span>
                                    </div>
                                </div>
                            })}


                        </div>
                        <div className="card-footer">

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='card-title'><strong>Total KES {getTotal()}</strong></div>
                                {user ? <div>
                                        {
                                            coupon ? <button
                                                className='btn btn-sm btn-primary mt-2'
                                                onClick={() => navigate('/checkout', {
                                                    state: {
                                                        from: 'cart'
                                                    }
                                                })}
                                                disabled={!cart.length}>
                                                Proceed to checkout
                                            </button> : <button
                                                className='btn btn-sm btn-primary mt-2'
                                                onClick={saveOrderToDb}
                                                disabled={!cart.length}>
                                                Proceed to checkout
                                            </button>
                                        }
                                        <br/>
                                        {/*<button*/}
                                        {/*    className='btn btn-sm btn-warning mt-5'*/}
                                        {/*    onClick={saveCODOrderToDb}*/}
                                        {/*    disabled={!cart.length}>*/}
                                        {/*    Pay Cash on Delivery*/}
                                        {/*</button>*/}

                                    </div> :
                                    < button className='btn btn-sm btn-primary '>
                                        <Link to="/auth/login"
                                              state={{from: '/cart'}}><span
                                            className='text-white'>Login to checkout</span></Link>
                                    </button>

                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default Cart;