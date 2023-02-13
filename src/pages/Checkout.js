import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {applyCoupon, emptyUserCart, getUserCart, saveUserAddress} from "../redux/services/user.service";

import {toast} from "react-toastify";
import {couponApplied} from "../redux/slices/coupon";
import {Link, Navigate, useNavigate} from "react-router-dom";
import DeliveryAddress from "../components/wizard/checkout/DeliveryAddress";
import {extractAddress, loadAsyncScript} from "../components/wizard/checkout/loadAsync";
import {updateUserAddress} from "../redux/slices/auth";
import {addToCart} from "../redux/slices/cart";
import {setTotalAfterDiscount} from "../redux/slices/totalAfterDiscount";
import {selectPaymentMethod} from "../redux/slices/paymentMethods";
import {getAddress} from "../functions";
import {clearMessage} from "../redux/slices/message";


const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

const Checkout = () => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [coupon, setCoupon] = useState('PRACTICAL')
    // const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')
    const searchInput = useRef(null);
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()


    const {auth, cart, coupon: couponUsed, message, totalAfterDiscount} = useSelector((state) => ({...state}));
    const [address, setAddress] = useState(auth.user.address.length > 0 ? auth.user.address[0] : {});
    const token = auth.isLoggedIn && auth.user.token && auth.user.token
    const navigate = useNavigate()

    const paymentMethods = useSelector((state) => state.paymentMethods.paymentMethods);
    const selectedPaymentMethod = useSelector((state) => state.paymentMethods.selectedPaymentMethod);


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch])
    useEffect(() => {
        getUserCart(token).then(response => {
            // console.log(JSON.stringify(response.data, null, 4))
            setTotal(response.data.cartTotal)
            setProducts(response.data.products)


        }).catch(e => {
            if (e.response.data.msg) {
                if (cart.length <= 0) {
                    navigate('/market')
                }
                if (cart.length > 0) {
                    navigate('/cart')
                }

            } else {
                console.log(e)
            }
        })
    }, [cart.length, navigate, token])

    //Delivery address logic

    const initMapScript = useCallback(() => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places&callback=Function.prototype`;
        return loadAsyncScript(src);
    }, [])


    // do something on address change
    const onChangeAddress = useCallback((autocomplete) => {
        setLoading(true)
        const place = autocomplete.getPlace();
        const _address = extractAddress(place);
        setAddress(_address);
        const info = {address: _address, token,place}
        info.address.name = searchInput.current && searchInput.current.value && searchInput.current.value

        dispatch(updateUserAddress(info))
            .unwrap()
            .then((res) => {
                setLoading(false)
                setShow(false);
            })
            .catch(() => {
                setLoading(false)
                setShow(false);
            });

    }, [dispatch, token])


    // init autocomplete
    const initAutocomplete = useCallback(() => {
        if (!searchInput.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(
            searchInput.current,
            {
                componentRestrictions: {'country': ['ke']},
                types: ["establishment"]
            });
        autocomplete.setFields(["address_component", 'formatted_address', 'place_id','name', "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));


    }, [onChangeAddress])

    // load map script after mounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, [initAutocomplete, initMapScript, show]);


    const reverseGeocode = ({latitude: lat, longitude: lng}) => {
        setLoading(true)

        const url = `${geocodeJson}?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                const _address = extractAddress(place);
                setAddress(_address);
                searchInput.current.value = _address.plain();
                const info = {address: _address, token,place}
                info.address.name = searchInput.current.value
                dispatch(updateUserAddress(info))
                    .unwrap()
                    .then((res) => {
                        setLoading(false)
                        setShow(false);

                    })
                    .catch(() => {
                        setLoading(false)
                        setShow(false);
                    });

            })
    }


    const findMyLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                reverseGeocode(position.coords)
            })
        }
    }

    //End od delivery Address logic

    //coupon

    function applyDiscountCoupon() {
        setLoading(true)
        applyCoupon(auth.user.token, {coupon, couponUsed}).then(res => {
            if (res.data.ok) {
                // setTotalAfterDiscount(res.data.totalAfterDiscount)
                dispatch(setTotalAfterDiscount(res.data.totalAfterDiscount))
                dispatch(couponApplied(true))
                setLoading(false)
                toast.success('Coupon applied', {
                    position: toast.POSITION.BOTTOM_CENTER

                })
            }
            if (res.data.err) {
                setDiscountError(res.data.err)
                dispatch(couponApplied(false))
                setLoading(false)
                toast.error(res.data.err, {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }

        }).catch(e => {
            console.log(e)
            setLoading(false)
        })

    }

    //coupon


    const emptyCart = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("cart")
        }
        dispatch(addToCart([]))
        emptyUserCart(auth.user.token).then(r => {
            setProducts([])
            setTotal(0)
            setTotalAfterDiscount(0)
            setCoupon('')
            toast.success('Cart emptied. Continue  shopping')
        })

    }

    //


    const handleRadioChange = (e) => {
        dispatch(selectPaymentMethod(e.target.value));
    };


    if (token) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className='card-header'>
                                <h3 className="card-title">
                                    Shipping information
                                </h3>

                            </div>
                            <div className="card-body">
                                <form>
                                    <DeliveryAddress
                                        address={address}
                                        loading={loading}
                                        show={show}
                                        setShow={setShow}
                                        findMyLocation={findMyLocation}
                                        searchInput={searchInput}
                                        coupon={coupon}
                                        couponUsed={couponUsed}
                                        setCoupon={setCoupon}
                                        applyDiscountCoupon={applyDiscountCoupon}
                                        setDiscountError={setDiscountError}/>
                                </form>
                            </div>
                            <div className='card-footer'>
                                {message.message && <div className='text-danger'>
                                    {message.message}
                                </div>}
                                <div className="d-flex justify-content-between">
                                    <p className=''>{couponUsed ? 'Total after discount' : 'Cart total'} </p>
                                    <p> KES {couponUsed ? totalAfterDiscount.value : total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h4 className='card-title'>Order Summery</h4>
                                <p className='card-text'>Number of products {products.length}</p>
                            </div>

                            <div className="card-body">
                                <div className='mt-3'>
                                    {products.map((p, i) => {
                                        return <p className='card-text' key={i}>{p.product.title} {' '}
                                            x {p.count} = {' '} {p.product.price * p.count}
                                        </p>

                                    })}
                                    <p className='card-text'>Cart Total : KES {total}</p>
                                    <p className='card-text'>Saved {totalAfterDiscount.value}</p>
                                    {totalAfterDiscount.value > 0 && (
                                        <div className='bg-success'><p className='text-white px-4 py-3'>Discount
                                            applied: Total
                                            payable: KES {totalAfterDiscount.value}</p></div>
                                    )}
                                </div>
                                <div className='mt-3'>
                                    <h2 className="card-title">Payment Method</h2>

                                    <div>
                                        {paymentMethods.map((method) => (
                                            <div key={method} style={{display: "inline-block", marginRight: "10px"}}>
                                                <input
                                                    type="radio"
                                                    value={method}
                                                    checked={selectedPaymentMethod === method}
                                                    onChange={handleRadioChange}
                                                    style={{marginRight: "5px"}}
                                                />
                                                <label style={{fontWeight: "bold"}}>{method}</label>
                                            </div>
                                        ))}
                                    </div>

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => (navigate('/payment', {state: {address}}))}
                                        disabled={!auth.addressSaved || !products.length || !selectedPaymentMethod}>
                                        Next step
                                    </button>
                                    <button className="btn btn-danger" onClick={emptyCart}
                                            disabled={!products.length}>
                                        Empty cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    } else {
        return <div className='container'>
            <p>Login to proceed</p>
            < button className='btn   mt-2 btn-primary '>
                <Link to="/auth/login"
                      state={{from: '/checkout'}}>
                <span className='text-white'>
                Click to Login
                </span>
                </Link>
            </button>
        </div>
    }
};

export default Checkout;