import React, {useRef, useEffect, useState, useCallback} from 'react';
import {Icon} from '@iconify/react';
import './DeliveryAddress.css'
import {MDBInput} from "mdb-react-ui-kit";

const DeliveryAddress = ({
                             address,
                             setShow,
                             searchInput,
                             findMyLocation,
                             show,
                             loading,
                             couponUsed,
                             setDiscountError,
                             setCoupon,
                             coupon,
                             applyDiscountCoupon
                         }) => {


    const showAddress = () => {
        return <>
            <div className="show-address mb-4">
                {Object.keys(address).length > 0 && <>
                    <p className='card-text'>
                        Delivering to <span>{address.name}</span>
                    </p>
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => {
                            setShow(prevState => !prevState);
                        }}
                    >
                        Change delivery information
                    </button>
                </>}
            </div>
            {Object.keys(address).length <= 0 && <>
                <div className='text-white  mb-1 bg-info'>
                    <strong>
                        <p className='px-1 py-2 small'>
                            Click
                            <Icon icon="mdi:crosshairs-gps"/> to automatically detect
                            your
                            current location or search in the input below. Remember to give permission when prompted
                        </p>
                    </strong>
                </div>
                <div className="search">
                    <MDBInput
                        ref={searchInput}
                        type="text"
                        placeholder=''
                        label='Search your delivery address'
                        className='form-control myInput '/>
                    <button
                        onClick={findMyLocation} type='button'><Icon icon="mdi:crosshairs-gps"/>
                    </button>
                </div>

            </>}

            {show && <>
                <div className='text-white  mb-1 bg-info'>
                    <strong>
                        <p className='px-1 py-2 small'>
                            Click
                            <Icon icon="mdi:crosshairs-gps"/> to automatically detect
                            your
                            current location or search in the input below. Remember to give permission when prompted
                        </p>
                    </strong>
                </div>
                <div className="search">
                    <MDBInput
                        ref={searchInput}
                        type="text"
                        placeholder=''
                        label='Search your delivery address'
                        className='form-control myInput '/>
                    <button
                        onClick={findMyLocation} type='button'><Icon icon="mdi:crosshairs-gps"/>
                    </button>
                </div>
            </>}


            {Object.keys(address).length > 0 && <div className="mb-3">
                <p className='card-text'>Do you have Discount code ?</p>
                <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                        setDiscountError('')
                        setCoupon(event.target.value)
                    }}
                    disabled={couponUsed}
                    value={coupon}/>
                <br/>

                {couponUsed ? <button disabled={couponUsed} className='btn btn-success ' type='button' onClick={applyDiscountCoupon}>
                        Applied
                    </button> :
                    <button className='btn btn-primary' type='button' onClick={applyDiscountCoupon}>
                        Apply
                    </button>}
            </div>}


            {loading && <div className="spinner-grow mt-3 small" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}

        </>


    }

    return (
        <div className="address-form mt-3">
            {showAddress()}
        </div>


    );
};

export default DeliveryAddress;